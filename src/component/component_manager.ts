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

import Component from "./component";
import IEntity from "../entity/ientity";

/**
 * ComponentManager holds a map/record of components of the same type, mapped
 * to the ID of the entity the component belongs to.
 * Used in conjunction with the EntityManager for managing Entities/Components.
 */
class ComponentManager {
    public key: string;
    private components: Record<number, Component>;

    constructor(key: string, components: Record<number, Component> = {}) {
        this.key = key;
        this.components = components;
    }

    /**
     * Get returns a component associated with an entity if it
     * exists, otherwise returns undefined.
     * @param {IEntity} entity Entity to get the component of
     * @returns {Component|undefined} Component retrieved, if doesn't exist, undefined
     */
    public Get(entity: IEntity): Component | undefined {
        return this.components[entity.id];
    }

    /**
     * Add adds a component to the ComponentManager, mapped to
     * the entity that the component belongs to.
     * @param {IEntity} entity Entity of the component to add
     * @param {Component} component Component to add
     */
    public Add(entity: IEntity, component: Component): void {
        this.components[entity.id] = component;
    }

    /**
     * Remove removes a component from the ComponentManager if it
     * exists.
     * @param {IEntity} entity Entity of the component to remove
     */
    public Remove(entity: IEntity): void {
        delete this.components[entity.id];
    }
}

export default ComponentManager;