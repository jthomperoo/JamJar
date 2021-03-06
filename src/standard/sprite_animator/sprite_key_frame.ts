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

import Material from "../../rendering/material/material";

/**
 * SpriteKeyFrame represents a key frame, which is a material to apply to a
 * Sprite for a duration of frames.
 */
class SpriteKeyFrame {
    /**
     * Material to apply when rendering the Key Frame.
     */
    public material: Material;
    /**
     * Number of frames to render this Key Frame for.
     */
    public frameCount: number;

    constructor(material: Material, frameCount: number) {
        this.material = material;
        this.frameCount = frameCount;
    }
}

export default SpriteKeyFrame;