
# Class: MotionSystem

MotionSystem handles basic physics calculations for entities with a motion component.
This system handles velocity, acceleration, angular velocity and angular acceleration.

## Hierarchy

  ↳ [System](system.md)

  ↳ **MotionSystem**

## Implements

* [ISubscriber](../interfaces/isubscriber.md)

## Index

### Constructors

* [constructor](motionsystem.md#constructor)

### Properties

* [entities](motionsystem.md#protected-entities)
* [messageBus](motionsystem.md#protected-messagebus)
* [scene](motionsystem.md#protected-optional-scene)
* [subscriberID](motionsystem.md#subscriberid)
* [MESSAGE_DEREGISTER](motionsystem.md#static-message_deregister)
* [MESSAGE_REGISTER](motionsystem.md#static-message_register)
* [MESSAGE_UPDATE](motionsystem.md#static-message_update)

### Methods

* [Destroy](motionsystem.md#destroy)
* [OnDestroy](motionsystem.md#protected-ondestroy)
* [OnMessage](motionsystem.md#onmessage)
* [Update](motionsystem.md#protected-update)
* [EVALUATOR](motionsystem.md#static-private-evaluator)

## Constructors

###  constructor

\+ **new MotionSystem**(`messageBus`: [IMessageBus](../interfaces/imessagebus.md), `scene?`: [IScene](../interfaces/iscene.md), `entities?`: Map‹number, [SystemEntity](systementity.md)›, `subscriberID?`: undefined | number): *[MotionSystem](motionsystem.md)*

*Overrides [System](system.md).[constructor](system.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`messageBus` | [IMessageBus](../interfaces/imessagebus.md) |
`scene?` | [IScene](../interfaces/iscene.md) |
`entities?` | Map‹number, [SystemEntity](systementity.md)› |
`subscriberID?` | undefined &#124; number |

**Returns:** *[MotionSystem](motionsystem.md)*

## Properties

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

### `Static` MESSAGE_REGISTER

▪ **MESSAGE_REGISTER**: *"system_register"* = "system_register"

*Inherited from [System](system.md).[MESSAGE_REGISTER](system.md#static-message_register)*

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

*Inherited from [System](system.md).[OnMessage](system.md#onmessage)*

*Overrides [Subscriber](subscriber.md).[OnMessage](subscriber.md#abstract-onmessage)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | [IMessage](../interfaces/imessage.md) |

**Returns:** *void*

___

### `Protected` Update

▸ **Update**(`dt`: number): *void*

*Overrides [System](system.md).[Update](system.md#protected-update)*

**Parameters:**

Name | Type |
------ | ------ |
`dt` | number |

**Returns:** *void*

___

### `Static` `Private` EVALUATOR

▸ **EVALUATOR**(`entity`: [IEntity](../interfaces/ientity.md), `components`: [Component](component.md)[]): *boolean*

Ensure has Transform and Motion.

**Parameters:**

Name | Type |
------ | ------ |
`entity` | [IEntity](../interfaces/ientity.md) |
`components` | [Component](component.md)[] |

**Returns:** *boolean*
