/*
Copyright 2019 JamJar Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import MessageBus from "../message/message_bus";
import Message from "../message/message";
import IMessage from "../message/imessage";
import Subscriber from "../message/subscriber";
import Entity from "../entity/entity";
import Component from "../component/component";
import SystemEntity from "./system_entity";
import Scene from "../scene/scene";

abstract class System extends Subscriber {

    public static readonly MESSAGE_UPDATE = "system_update"
    public static readonly MESSAGE_REGISTER = "system_register";
    public static readonly MESSAGE_DEREGISTER = "system_deregister";

    protected entities: SystemEntity[];
    protected scene?: Scene;

    private evaluator?: (entity: Entity, components: Component[]) => boolean

    constructor(protected messageBus: MessageBus, args: {
        evaluator?: (entity: Entity, components: Component[]) => boolean;
        scene?: Scene;
    } = {}) {
        super();
        this.entities = [];
        this.evaluator = args.evaluator;
        this.scene = args.scene;
        this.messageBus.Subscribe(this, [
            System.MESSAGE_UPDATE,
            System.MESSAGE_REGISTER,
            System.MESSAGE_DEREGISTER,
            Scene.MESSAGE_DESTROY
        ]);
    }

    protected abstract Update(dt: number): void;

    public OnMessage(message: IMessage): void {
        switch (message.type) {
            case System.MESSAGE_UPDATE: {
                // Will always be non null
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                this.Update((message as Message<number>).payload!);
                break;
            }
            case System.MESSAGE_REGISTER: {
                const registerMessage = message as Message<[Entity, Component[]]>;
                if (!registerMessage.payload) {
                    return;
                }
                this.register(registerMessage.payload[0], registerMessage.payload[1])
                break;
            }
            case System.MESSAGE_DEREGISTER: {
                const deregisterMessage = message as Message<Entity>;
                if (!deregisterMessage.payload) {
                    return;
                }
                this.deregister(deregisterMessage.payload);
                break;
            }
            case Scene.MESSAGE_DESTROY: {
                const sceneDestroyMessage = message as Message<Scene>;
                if (!sceneDestroyMessage.payload) {
                    return;
                }
                if (!this.scene) {
                    return;
                }
                if (sceneDestroyMessage.payload.id == this.scene.id) {
                    this.messageBus.UnsubscribeAll(this);
                }
                break;
            }
        }
    }

    private deregister(entity: Entity): void {
        this.remove(entity)
    }

    private register(entity: Entity, components: Component[]): void {
        if (!this.evaluator) {
            return;
        }

        this.remove(entity)

        // Evaluation check
        if (!this.evaluator(entity, components)) {
            return;
        }

        // Add component to system
        this.entities.push(new SystemEntity(entity, components));
    }

    private remove(entity: Entity): void {
        for (let i = 0; i < this.entities.length; i++) {
            const systemEntity = this.entities[i];
            if (systemEntity.entity.id == entity.id) {
                this.entities.splice(i, 1);
                return;
            }
        }
    }
}

export default System;