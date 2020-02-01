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

import Component from "../component/component";
import Message from "../message/message";
import Scene from "../scene/scene";
import IMessageBus from "../message/imessage_bus";

/**
 * Entity is one of the key elements of the Entity-Component-System architecture.
 * Entity is just to tie components together, and to give Systems ways to group
 * and link components.
 * The entity is basically just an ID, alongside some helper functions for
 * adding/removing components and destroying itself.
 */
class Entity {
    private static ID = 0;
    public static readonly MESSAGE_DESTROY = "entity_destroy";
    public static readonly KEY = "entity";

    public id: number;
    public scene?: Scene;

    constructor(private messageBus: IMessageBus, scene?: Scene) {
        this.id = Entity.ID++;
        this.scene = scene;
        if (scene) {
            scene.AddEntity(this);
        }
    }

    /**
     * Add adds a component to the entity.
     * @param {Component} component The component to add
     */
    Add(component: Component): void {
        this.messageBus.Publish(new Message<[Entity, Component]>(Component.MESSAGE_ADD, [this, component]));
    }

    /**
     * Remove removes a component from the entity.
     * @param {string} key The component to remove 
     */
    Remove(key: string): void {
        this.messageBus.Publish(new Message<[Entity, string]>(Component.MESSAGE_REMOVE, [this, key]));
    }

    /**
     * Destroy deletes the entity and all associated components.
     */
    Destroy(): void {
        this.messageBus.Publish(new Message<Entity>(Entity.MESSAGE_DESTROY, this));
    }
}

export default Entity;