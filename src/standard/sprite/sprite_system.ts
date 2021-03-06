/*
Copyright 2020 JamJar Authors

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

import System from "../../system/system";
import Component from "../../component/component";
import Transform from "../transform/transform";
import Sprite from "./sprite";
import IMessage from "../../message/imessage";
import Message from "../../message/message";
import IMessageBus from "../../message/imessage_bus";
import IEntity from "../../entity/ientity";
import Game from "../../game";
import Renderable from "../../rendering/renderable";
import SystemEntity from "../../system/system_entity";
import IScene from "../../scene/iscene";
import UI from "../ui/ui";
import RenderSystem from "../render/render_system";
import IRenderable from "../../rendering/irenderable";
import Camera from "../camera/camera";
import DrawMode from "../../rendering/draw_mode";
import Polygon from "../../shape/polygon";

/**
 * SpriteSystem handles converting sprites into renderable objects that are fed into
 * a rendering system.
 */
class SpriteSystem extends System {
    /**
     * Ensure is Sprite entity with Transform and Sprite, or Camera entity with
     * Transform and Camera
     */
    private static readonly EVALUATOR = (entity: IEntity, components: Component[]): boolean => {
        return [Transform.KEY, Sprite.KEY].every((type) => components.some(
            component => component.key === type
        )) || [Transform.KEY, Camera.KEY].every((type) => components.some(
            component => component.key === type
        ));
    };

    constructor(messageBus: IMessageBus,
        scene?: IScene,
        entities?: Map<number, SystemEntity>,
        subscriberID?: number) {
        super(messageBus, scene, SpriteSystem.EVALUATOR, entities, subscriberID);
        this.messageBus.Subscribe(this, Game.MESSAGE_PRE_RENDER);
    }

    public OnMessage(message: IMessage): void {
        super.OnMessage(message);
        switch (message.type) {
            case Game.MESSAGE_PRE_RENDER: {
                const renderMessage = message as Message<number>;
                if (renderMessage.payload === undefined) {
                    return;
                }
                this.prepareSprites(renderMessage.payload);
                break;
            }
        }
    }

    private prepareSprites(alpha: number): void {
        const renderables: IRenderable[] = [];
        // Get sprite entities
        const spriteEntities = [...this.entities.values()].filter((entity) => {
            return entity.Get(Sprite.KEY);
        });
        for (const entity of spriteEntities) {
            const sprite = entity.Get(Sprite.KEY) as Sprite;
            const transform = entity.Get(Transform.KEY) as Transform;
            const ui = entity.Get(UI.KEY) as UI | undefined;

            if (ui === undefined) {
                // Not UI
                renderables.push(new Renderable(
                    sprite.zOrder,
                    Polygon.QuadByDimensions(1,1),
                    transform.InterpolatedMatrix4D(alpha),
                    sprite.material,
                    DrawMode.TRIANGLES,
                    undefined,
                ));
            } else {
                // UI
                // Get the camera the UI component is targeting
                const cameraEntity = this.entities.get(ui.camera.id);
                if (cameraEntity === undefined) {
                    // If no camera found, skip this entity
                    continue;
                }

                // Get components of the camera entity
                const camera = cameraEntity.Get(Camera.KEY) as Camera | undefined;
                const cameraTransform = cameraEntity.Get(Transform.KEY) as Transform | undefined;
                if (camera === undefined || cameraTransform === undefined) {
                    // If the components are not found, must not be a valid camera, skip this entity
                    continue;
                }


                const relativeTransform = new Transform(
                    // camera position + UI element position * camera virtual scale
                    cameraTransform.position.Copy()
                        .Add(transform.position.Copy().Multiply(camera.virtualScale.Copy().Scale(0.5))),
                    // element scale * camera virtual scale
                    transform.scale.Copy().Multiply(camera.virtualScale),
                    transform.angle
                );

                // Create the renderable for use by rendering systems
                renderables.push(new Renderable(
                    sprite.zOrder,
                    Polygon.QuadByDimensions(1,1),
                    relativeTransform.InterpolatedMatrix4D(alpha),
                    sprite.material,
                    DrawMode.TRIANGLES,
                    ui.camera,
                ));
            }
        }
        this.messageBus.Publish(new Message<IRenderable[]>(RenderSystem.MESSAGE_LOAD_RENDERABLES, renderables));
    }
}

export default SpriteSystem;
