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

import {
    Game,
    IMessageBus,
    EntityManager,
    MessageBus,
    Message,
    WebGLSystem,
    HTTPImageSystem,
    SpriteSystem,
    ImageRequest,
    TextureFiltering,
    Entity,
    Transform,
    Sprite,
    Polygon,
    Camera,
    Material,
    Texture,
    Vector,
    Color,
    TextureWrapping,
} from "jamjar";

class TextureGame extends Game {
    constructor(messageBus: IMessageBus) {
        super(messageBus, "shader-example");
    }

    OnStart(): void {
        this.messageBus.Publish(new Message<ImageRequest>(ImageRequest.MESSAGE_REQUEST_LOAD, new ImageRequest(
            "nearest",
            "assets/example.png",
            {
                minFilter: TextureFiltering.NEAREST,
                magFilter: TextureFiltering.NEAREST,
            }
        )));
        this.messageBus.Publish(new Message<ImageRequest>(ImageRequest.MESSAGE_REQUEST_LOAD, new ImageRequest(
            "bilinear",
            "assets/example.png",
            {
                minFilter: TextureFiltering.BILINEAR,
                magFilter: TextureFiltering.BILINEAR,
            }
        )));
        this.messageBus.Publish(new Message<ImageRequest>(ImageRequest.MESSAGE_REQUEST_LOAD, new ImageRequest(
            "trilinear",
            "assets/example.png",
            {
                minFilter: TextureFiltering.TRILINEAR,
                magFilter: TextureFiltering.TRILINEAR,
            }
        )));
        this.messageBus.Publish(new Message<ImageRequest>(ImageRequest.MESSAGE_REQUEST_LOAD, new ImageRequest(
            "trilinear_repeat",
            "assets/example.png",
            {
                minFilter: TextureFiltering.TRILINEAR,
                magFilter: TextureFiltering.TRILINEAR,
                xWrap: TextureWrapping.REPEAT,
                yWrap: TextureWrapping.REPEAT,
            }
        )));
        this.messageBus.Publish(new Message<ImageRequest>(ImageRequest.MESSAGE_REQUEST_LOAD, new ImageRequest(
            "bilinear_mirror_repeat",
            "assets/example.png",
            {
                minFilter: TextureFiltering.BILINEAR,
                magFilter: TextureFiltering.BILINEAR,
                xWrap: TextureWrapping.MIRRORED_REPEAT,
                yWrap: TextureWrapping.MIRRORED_REPEAT,
            }
        )));

        // Create camera
        const cameraEntity = new Entity(this.messageBus);
        cameraEntity.Add(new Camera());
        cameraEntity.Add(new Transform());

        // Create entities
        const nearest = new Entity(this.messageBus);
        nearest.Add(new Transform(new Vector(-40, 20), new Vector(20,20)));
        nearest.Add(new Sprite(
            new Material({
                texture: new Texture("nearest"),
            }),
        ));

        const bilinear = new Entity(this.messageBus);
        bilinear.Add(new Transform(new Vector(0, 20), new Vector(20,20)));
        bilinear.Add(new Sprite(
            new Material({
                texture: new Texture("bilinear"),
            }),
        ));

        const trilinear = new Entity(this.messageBus);
        trilinear.Add(new Transform(new Vector(40, 20), new Vector(20,20)));
        trilinear.Add(new Sprite(
            new Material({
                texture: new Texture("trilinear"),
            }),
        ));

        const nearestRed = new Entity(this.messageBus);
        nearestRed.Add(new Transform(new Vector(-40, -20), new Vector(20,20)));
        nearestRed.Add(new Sprite(
            new Material({
                texture: new Texture("nearest"),
                color: new Color(1,0,0,1)
            }),
        ));

        const bilinearMirroRepeat = new Entity(this.messageBus);
        bilinearMirroRepeat.Add(new Transform(new Vector(0, -20), new Vector(20,20)));
        bilinearMirroRepeat.Add(new Sprite(
            new Material({
                texture: new Texture("bilinear_mirror_repeat", Polygon.QuadByPoints(new Vector(0,0), new Vector(5,5))),
                color: new Color(1,1,1,0.5)
            }),
        ));

        const trilinearRepeat = new Entity(this.messageBus);
        trilinearRepeat.Add(new Transform(new Vector(40, -20), new Vector(20,20)));
        trilinearRepeat.Add(new Sprite(
            new Material({
                texture: new Texture("trilinear_repeat", Polygon.QuadByPoints(new Vector(0,0), new Vector(5,5))),
                color: new Color(0,1,0,1)
            }),
            0,
        ));
    }
}

// Get canvas
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

// Get WebGL2 context
const gl = canvas.getContext("webgl2", { alpha: false });
if (!gl) {
    throw ("WebGL2 not supported in this browser")
}

// Create message bus and entity manager
const messageBus = new MessageBus();
new EntityManager(messageBus);

// Create game systems
new WebGLSystem(messageBus, gl);
new SpriteSystem(messageBus);
new HTTPImageSystem(messageBus);

// Create and start game
new TextureGame(messageBus).Start();
