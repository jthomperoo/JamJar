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

import IEntity from "../entity/ientity";
import Material from "./material";

class Renderable {
    public zOrder: number;
    public verticies: Float32Array;
    public modelMatrix: Float32Array;
    public material: Material;
    public camera?: IEntity;

    constructor(zOrder: number, verticies: Float32Array, modelMatrix: Float32Array, material: Material, camera?: IEntity) {
        this.zOrder = zOrder;
        this.verticies = verticies;
        this.modelMatrix = modelMatrix;
        this.material = material;
        this.camera = camera;
    }
}

export default Renderable;