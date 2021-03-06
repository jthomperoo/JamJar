
# Class: FullscreenSystem

FullscreenSystem handles JS fullscreen change events, and provides a method for requesting
entering/existing fullscreen/pointer lock.

## Hierarchy

  ↳ [System](system.md)

  ↳ **FullscreenSystem**

  ↳ [TestFullscreenSystem](testfullscreensystem.md)

## Implements

* [ISubscriber](../interfaces/isubscriber.md)

## Index

### Constructors

* [constructor](fullscreensystem.md#constructor)

### Properties

* [canvas](fullscreensystem.md#private-canvas)
* [document](fullscreensystem.md#private-document)
* [entities](fullscreensystem.md#protected-entities)
* [messageBus](fullscreensystem.md#protected-messagebus)
* [scene](fullscreensystem.md#protected-optional-scene)
* [subscriberID](fullscreensystem.md#subscriberid)
* [MESSAGE_DEREGISTER](fullscreensystem.md#static-message_deregister)
* [MESSAGE_ENTER_FULLSCREEN](fullscreensystem.md#static-message_enter_fullscreen)
* [MESSAGE_EXIT_FULLSCREEN](fullscreensystem.md#static-message_exit_fullscreen)
* [MESSAGE_REGISTER](fullscreensystem.md#static-message_register)
* [MESSAGE_REQUEST_ENTER_FULLSCREEN](fullscreensystem.md#static-message_request_enter_fullscreen)
* [MESSAGE_REQUEST_EXIT_FULLSCREEN](fullscreensystem.md#static-message_request_exit_fullscreen)
* [MESSAGE_UPDATE](fullscreensystem.md#static-message_update)

### Methods

* [Destroy](fullscreensystem.md#destroy)
* [OnDestroy](fullscreensystem.md#protected-ondestroy)
* [OnMessage](fullscreensystem.md#onmessage)
* [Update](fullscreensystem.md#protected-update)
* [onFullscreenChange](fullscreensystem.md#protected-onfullscreenchange)

## Constructors

###  constructor

\+ **new FullscreenSystem**(`messageBus`: [IMessageBus](../interfaces/imessagebus.md), `canvas`: HTMLCanvasElement, `document`: HTMLDocument, `scene?`: [IScene](../interfaces/iscene.md), `entities?`: Map‹number, [SystemEntity](systementity.md)›, `subscriberID?`: undefined | number): *[FullscreenSystem](fullscreensystem.md)*

*Overrides [System](system.md).[constructor](system.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`messageBus` | [IMessageBus](../interfaces/imessagebus.md) |
`canvas` | HTMLCanvasElement |
`document` | HTMLDocument |
`scene?` | [IScene](../interfaces/iscene.md) |
`entities?` | Map‹number, [SystemEntity](systementity.md)› |
`subscriberID?` | undefined &#124; number |

**Returns:** *[FullscreenSystem](fullscreensystem.md)*

## Properties

### `Private` canvas

• **canvas**: *HTMLCanvasElement*

___

### `Private` document

• **document**: *HTMLDocument*

___

### `Protected` entities

• **entities**: *Map‹number, [SystemEntity](systementity.md)›*

*Inherited from [System](system.md).[entities](system.md#protected-entities)*

A map of entities, mapped by their entity ID.
ID: Entity
0: PlayerEntity
1: ObstacleEntity
etc.

___

### `Protected` messageBus

• **messageBus**: *[IMessageBus](../interfaces/imessagebus.md)*

*Inherited from [System](system.md).[messageBus](system.md#protected-messagebus)*

Reference to the message bus, the fundamental piece of JamJar
for communicating with other parts of the engine.

___

### `Protected` `Optional` scene

• **scene**? : *[IScene](../interfaces/iscene.md)*

*Inherited from [System](system.md).[scene](system.md#protected-optional-scene)*

Any scene this system is part of, will change the lifecycle of the
system to be part of the scene's lifecycle - it will be destroyed
when the scene is destroyed.

___

###  subscriberID

• **subscriberID**: *number*

*Implementation of [ISubscriber](../interfaces/isubscriber.md).[subscriberID](../interfaces/isubscriber.md#subscriberid)*

*Inherited from [Subscriber](subscriber.md).[subscriberID](subscriber.md#subscriberid)*

___

### `Static` MESSAGE_DEREGISTER

▪ **MESSAGE_DEREGISTER**: *"system_deregister"* = "system_deregister"

*Inherited from [System](system.md).[MESSAGE_DEREGISTER](system.md#static-message_deregister)*

___

### `Static` MESSAGE_ENTER_FULLSCREEN

▪ **MESSAGE_ENTER_FULLSCREEN**: *"message_enter_fullscreen"* = "message_enter_fullscreen"

___

### `Static` MESSAGE_EXIT_FULLSCREEN

▪ **MESSAGE_EXIT_FULLSCREEN**: *"message_exit_fullscreen"* = "message_exit_fullscreen"

___

### `Static` MESSAGE_REGISTER

▪ **MESSAGE_REGISTER**: *"system_register"* = "system_register"

*Inherited from [System](system.md).[MESSAGE_REGISTER](system.md#static-message_register)*

___

### `Static` MESSAGE_REQUEST_ENTER_FULLSCREEN

▪ **MESSAGE_REQUEST_ENTER_FULLSCREEN**: *"message_request_enter_fullscreen"* = "message_request_enter_fullscreen"

___

### `Static` MESSAGE_REQUEST_EXIT_FULLSCREEN

▪ **MESSAGE_REQUEST_EXIT_FULLSCREEN**: *"message_request_exit_fullscreen"* = "message_request_exit_fullscreen"

___

### `Static` MESSAGE_UPDATE

▪ **MESSAGE_UPDATE**: *"system_update"* = "system_update"

*Inherited from [System](system.md).[MESSAGE_UPDATE](system.md#static-message_update)*

## Methods

###  Destroy

▸ **Destroy**(): *void*

*Inherited from [System](system.md).[Destroy](system.md#destroy)*

Destroy destroys the System and unsubscribes it from all messages.
The System should be garbage collected after this, unless a direct
reference to it exists somewhere. Therefore direct references to
systems are discouraged; communication should all be through the
message bus.

**Returns:** *void*

___

### `Protected` OnDestroy

▸ **OnDestroy**(): *void*

*Inherited from [System](system.md).[OnDestroy](system.md#protected-ondestroy)*

Custom Destroy logic should go here to facilitate garbage collection, for example
removing listeners.

**Returns:** *void*

___

###  OnMessage

▸ **OnMessage**(`message`: [IMessage](../interfaces/imessage.md)): *void*

*Overrides [System](system.md).[OnMessage](system.md#onmessage)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | [IMessage](../interfaces/imessage.md) |

**Returns:** *void*

___

### `Protected` Update

▸ **Update**(`dt`: number): *void*

*Inherited from [System](system.md).[Update](system.md#protected-update)*

General update method, default empty. Override with custom logic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dt` | number | DeltaTime  |

**Returns:** *void*

___

### `Protected` onFullscreenChange

▸ **onFullscreenChange**(`event`: Event): *void*

When a fullsceenchange event occurs this method is called, handles forwarding the fullscreen events
into the JamJar ECS messaging system.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | Event | The fullscreenchange event  |

**Returns:** *void*
