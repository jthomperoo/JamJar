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

/**
 * Component is one of the key elements of the Entity-Component-System architecture.
 * A component is there to store data, logic shouldn't exist within
 * a component, apart from helper functions for retrieving
 * component data.
 * Each entity can only have 1 component of each type.
 */
abstract class Component {
    public static readonly MESSAGE_ADD = "component_add";
    public static readonly MESSAGE_REMOVE = "component_remove";
    constructor(public key: string) {}
}

export default Component;