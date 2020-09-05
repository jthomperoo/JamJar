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

import IMessage from "./imessage";
import IMessageBus from "./imessage_bus";
import ISubscriber from "./isubscriber";

/**
 * MessageBus is the core link between each part of the Engine, it handles processing
 * messages and deciding which subscribers should recieve each message.
 * An object can subscribe to a certain message, the message bus will keep track of
 * subscribers for a message type.
 * Messages can be sent to the message bus, which will be queued up.
 * A dispatch can be triggered on the message bus, which will cause the message bus
 * to send all the messages and to the subscribers that have subscribed to the message
 * type.
 * The dispatch should probably be left to the core game loop for triggering.
 */
class MessageBus implements IMessageBus {
    private subscribers: Record<string, ISubscriber[]>;
    private messageQueue: IMessage[];

    constructor(subscribers: Record<string, ISubscriber[]> = {}, messageQueue: IMessage[] = []) {
        this.subscribers = subscribers;
        this.messageQueue = messageQueue;
    }

    /**
     * Processes the message bus queue and forwards the messages to the subscribers.
     * who have subscribed to each message type.
     */
    public Dispatch(): void {
        const queueLength = this.messageQueue.length;
        for (let i = 0; i < queueLength; i++) {
            // Will always be non null
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            const message = this.messageQueue.shift()!;
            const messageSubs = this.subscribers[message.type];
            if (!messageSubs) {
                continue;
            }
            // Take a copy of the array, otherwise subscribers might unsubscribe
            // as part of this message, mixing the dispatch order and causing
            // other subscribers to not recieve a message
            const clonedQueue = [...messageSubs];
            for (let j = 0; j < clonedQueue.length; j++) {
                clonedQueue[j].OnMessage(message);
            }
        }
    }

    /**
     * Publish adds a message to the message bus queue to be dispatched.
     * @param {IMessage} message The message to send
     */
    public Publish(message: IMessage): void {
        this.messageQueue.push(message);
    }

    /**
     * Subscribe subscibes a subscriber to a particular message type or types.
     * @param {ISubscriber} subscriber The subscriber to the message type(s)
     * @param {string|string[]} types The message type(s) to subscribe to
     */
    public Subscribe(subscriber: ISubscriber, types: string | string[]): void {
        if (types instanceof Array) {
            for (const type of types) {
                this.Subscribe(subscriber, type);
            }
            return;
        }
        let typeSubs = this.subscribers[types];
        if (!typeSubs) {
            typeSubs = [];
        }
        typeSubs.push(subscriber);
        this.subscribers[types] = typeSubs;
    }

    /**
     * UnsubscribeAll unsubscribes a Subscriber from all messages.
     * @param {ISubscriber} subscriber The subscriber to unsubscribe
     */
    public UnsubscribeAll(subscriber: ISubscriber): void {
        for (const key in this.subscribers) {
            const subscribers = this.subscribers[key];
            for (let i = 0; i < subscribers.length; i++) {
                const typeSub = subscribers[i];
                if (subscriber.subscriberID === typeSub.subscriberID) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }

    /**
     * Unsubscribe unsubscribes a subscriber from a specific message type or types.
     * @param {ISubscriber} subscriber The subscriber to unsubscribe
     * @param {string|strings} types The message type(s) to unsubscribe from
     */
    public Unsubscribe(subscriber: ISubscriber, types: string | string[]): void {
        if (types instanceof Array) {
            for (const type of types) {
                this.Unsubscribe(subscriber, type);
            }
            return;
        }
        const typeSubs = this.subscribers[types];
        if (!typeSubs) {
            return;
        }
        for (let i = 0; i < typeSubs.length; i++) {
            const typeSub = typeSubs[i];
            if (subscriber.subscriberID === typeSub.subscriberID) {
                typeSubs.splice(i, 1);
            }
        }
    }
}

export default MessageBus;
