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

import Component from "../component/component";
import IEntity from "../entity/ientity";
import Scene from "../scene/scene";
import IMessage from "../message/imessage";
import System from "./system";
import FakeMessageBus from "../fake/message_bus";
import Message from "../message/message";
import FakeEntity from "../fake/entity";
import FakeComponent from "../fake/component";
import SystemEntity from "./system_entity";
import FakeScene from "../fake/scene";
import IScene from "../scene/iscene";
import Reactor from "../fake/reactor";

class TestSystem extends System { }

describe("System - OnMessage", () => {
    type TestTuple = [
        string,
        Error | undefined,
        System,
        IMessage,
    ];
    test.each<TestTuple>([
        [
            "Unused message type",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message("unused")
        ],
        [
            "Update",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message(System.MESSAGE_UPDATE)
        ],
        [
            "Register no payload",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message(System.MESSAGE_REGISTER)
        ],
        [
            "Register no payload",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message(System.MESSAGE_REGISTER)
        ],
        [
            "Register, no evaluator",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message<[IEntity, Component[]]>(System.MESSAGE_REGISTER, [new FakeEntity(0), [new FakeComponent("test")]])
        ],
        [
            "Register, evaluator throws error",
            new Error("evaluator fail"),
            new TestSystem(new FakeMessageBus(), undefined, (): boolean => { throw ("evaluator fail"); }),
            new Message<[IEntity, Component[]]>(System.MESSAGE_REGISTER, [new FakeEntity(0), [new FakeComponent("test")]])
        ],
        [
            "Register, evaluator reject",
            undefined,
            new TestSystem(new FakeMessageBus(), undefined, (): boolean => { return false; }),
            new Message<[IEntity, Component[]]>(System.MESSAGE_REGISTER, [new FakeEntity(0), [new FakeComponent("test")]])
        ],
        [
            "Register, evaluator accept",
            undefined,
            new TestSystem(new FakeMessageBus(), undefined, (): boolean => { return true; }),
            new Message<[IEntity, Component[]]>(System.MESSAGE_REGISTER, [new FakeEntity(0), [new FakeComponent("test")]])
        ],
        [
            "Register, evaluator accept, entity already existed",
            undefined,
            new TestSystem(new FakeMessageBus(),
                undefined,
                (): boolean => { return true; },
                new Map([
                    [0, new SystemEntity(new FakeEntity(0), [])],
                    [1, new SystemEntity(new FakeEntity(1), [])],
                    [2, new SystemEntity(new FakeEntity(2), [])],
                    [3, new SystemEntity(new FakeEntity(3), [])],
                ])
            ),
            new Message<[IEntity, Component[]]>(System.MESSAGE_REGISTER, [new FakeEntity(3), [new FakeComponent("test")]])
        ],
        [
            "Deregister, no payload",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message(System.MESSAGE_DEREGISTER)
        ],
        [
            "Deregister, entity not in system",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message<IEntity>(System.MESSAGE_DEREGISTER, new FakeEntity(3))
        ],
        [
            "Deregister, single entity remove",
            undefined,
            new TestSystem(new FakeMessageBus(), undefined, undefined, new Map([
                [3, new SystemEntity(new FakeEntity(3), [])],
            ])),
            new Message<IEntity>(System.MESSAGE_DEREGISTER, new FakeEntity(3))
        ],
        [
            "Deregister, three entities, remove one",
            undefined,
            new TestSystem(new FakeMessageBus(), undefined, undefined, new Map([
                [0, new SystemEntity(new FakeEntity(0), [])],
                [1, new SystemEntity(new FakeEntity(1), [])],
                [2, new SystemEntity(new FakeEntity(2), [])],
                [3, new SystemEntity(new FakeEntity(3), [])],
            ])),
            new Message<IEntity>(System.MESSAGE_DEREGISTER, new FakeEntity(2))
        ],
        [
            "Destroy, no payload",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message(Scene.MESSAGE_DESTROY)
        ],
        [
            "Destroy, no scene",
            undefined,
            new TestSystem(new FakeMessageBus()),
            new Message<IScene>(Scene.MESSAGE_DESTROY, new FakeScene(0))
        ],
        [
            "Destroy, no matching scene",
            undefined,
            new TestSystem(new FakeMessageBus(), new FakeScene(3)),
            new Message<IScene>(Scene.MESSAGE_DESTROY, new FakeScene(0))
        ],
        [
            "Destroy, unsubscribe all fail",
            new Error("fail to unsubscribe all"),
            new TestSystem(new FakeMessageBus(
                [new Reactor("UnsubscribeAll", (): void => { throw ("fail to unsubscribe all"); })]),
                new FakeScene(0)
            ),
            new Message<IScene>(Scene.MESSAGE_DESTROY, new FakeScene(0))
        ],
        [
            "Destroy, success",
            undefined,
            new TestSystem(new FakeMessageBus(), new FakeScene(0)),
            new Message<IScene>(Scene.MESSAGE_DESTROY, new FakeScene(0))
        ],
    ])("%p", (
        description: string,
        expected: Error | undefined,
        system: System,
        message: IMessage) => {
        if (expected instanceof Error) {
            expect(() => { system.OnMessage(message); }).toThrow(expected);
        } else {
            expect(system.OnMessage(message)).toEqual(expected);
        }
    });
});