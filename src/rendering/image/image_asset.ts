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

import TextureWrapping from "../texture/texture_wrapping";
import TextureFiltering from "../texture/texture_filtering";

/**
 * ImageAsset represents a graphical image asset that has been loaded/
 * attempted to be loaded.
 * Stores meta info around the image, such as a name, the success
 * of the image being loaded, and any errors from loading it.
 * Also stores the image itself.
 */
class ImageAsset {
    /**
     * Message when an image asset is finished loading.
     */
    public static readonly MESSAGE_FINISH_LOAD = "finish_image_load";

    /**
     * Name of the image asset, how it is referred to throughout the system, 
     * should be unique.
     */
    public name: string;
    /**
     * The actual image.
     */
    public image: HTMLImageElement | ImageData;
    /**
     * A boolean indicating the success of loading the image, true = successful
     * load, false = failed loading.
     */
    public success: boolean;
    /**
     * An optional field, contains any error from loading the image, if there is
     * none it will be undefined.
     */
    public error?: Error;
    /**
     * Texture minification filter.
     */
    public minFilter: TextureFiltering;
    /**
     * Texture magnification filter.
     */
    public magFilter: TextureFiltering;
    /**
     * Texture wrapping along x axis.
     */
    public xWrap: TextureWrapping;
    /**
     * Texture wrapping along y axis.
     */
    public yWrap: TextureWrapping;
    /**
     * Texture option for generating mipmaps or not.
     * True = generate mipmaps, false = don't generate mipmaps.
     */
    public generateMipmaps: boolean;
    /**
     * Option for mirroring the texture when loading it (vertical and horizontal
     * flip). True = mirror, false = don't mirror.
     */
    public mirror: boolean;

    constructor(name: string, 
        image: HTMLImageElement | ImageData, 
        success: boolean, 
        xWrap: TextureWrapping,
        yWrap: TextureWrapping,
        magFilter: TextureFiltering,
        minFilter: TextureFiltering,
        generateMipmaps: boolean, 
        mirror: boolean,
        error?: Error) {
        this.name = name;
        this.image = image;
        this.success = success;
        this.error = error;
        this.xWrap = xWrap;
        this.yWrap = yWrap;
        this.magFilter = magFilter;
        this.minFilter = minFilter;
        this.generateMipmaps = generateMipmaps;
        this.mirror = mirror;
    }
}

export default ImageAsset;