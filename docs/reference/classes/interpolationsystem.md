
# Class: InterpolationSystem

InterpolationSystem is responsible for updating each entities transform value after a render, so
its previous value is always 1 frame before.
This is part of the rendering process.

## Hierarchy

  ↳ [System](system.md)

  ↳ **InterpolationSystem**

## Implements

* [ISubscriber](../interfaces/isubscriber.md)

## Index

### Constructors

* [constructor](interpolationsystem.md#constructor)

### Properties

* [entities](interpolationsystem.md#protected-entities)
* [messageBus](interpolationsystem.md#protected-messagebus)
* [scene](interpolationsystem.md#protected-optional-scene)
* [subscriberID](interpolationsystem.md#subscriberid)
* [MESSAGE_DEREGISTER](interpolationsystem.md#static-message_deregister)
* [MESSAGE_REGISTER](interpolationsystem.md#static-message_register)
* [MESSAGE_UPDATE](interpolationsystem.md#static-message_update)

### Methods

* [Destroy](interpolationsystem.md#destroy)
* [GetSystemEntity](interpolationsystem.md#protected-getsystementity)
* [OnMessage](interpolationsystem.md#onmessage)
* [Update](interpolationsystem.md#protected-update)
* [interpolateTransforms](interpolationsystem.md#private-interpolatetransforms)
* [EVALUATOR](interpolationsystem.md#static-private-evaluator)

## Constructors

###  constructor

\+ **new InterpolationSystem**(`messageBus`: [IMessageBus](../interfaces/imessagebus.md), `scene?`: [Scene](scene.md)): *[InterpolationSystem](interpolationsystem.md)*

*Overrides [System](system.md).[constructor](system.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`messageBus` | [IMessageBus](../interfaces/imessagebus.md) |
`scene?` | [Scene](scene.md) |

**Returns:** *[InterpolationSystem](interpolationsystem.md)*

## Properties

### `Protected` entities

• **entities**: *[SystemEntity](systementity.md)[]*

*Inherited from [System](system.md).[entities](system.md#protected-entities)*

___

### `Protected` messageBus

• **messageBus**: *[IMessageBus](../interfaces/imessagebus.md)*

*Inherited from [System](system.md).[messageBus](system.md#protected-messagebus)*

___

### `Protected` `Optional` scene

• **scene**? : *[IScene](../interfaces/iscene.md)*

*Inherited from [System](system.md).[scene](system.md#protected-optional-scene)*

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

### `Protected` GetSystemEntity

▸ **GetSystemEntity**(`entity`: [IEntity](../interfaces/ientity.md)): *[SystemEntity](systementity.md) | undefined*

*Inherited from [System](system.md).[GetSystemEntity](system.md#protected-getsystementity)*

Helper function to retrieve the SystemEntity equivalent of an
Entity if it exists in this system, otherwise returns undefined.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entity` | [IEntity](../interfaces/ientity.md) | The entity to get the SystemEntity of |

**Returns:** *[SystemEntity](systementity.md) | undefined*

The system entity if it exists, otherwise undefined

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

### `Private` interpolateTransforms

▸ **interpolateTransforms**(`entities`: [SystemEntity](systementity.md)[]): *void*

interpolateTransforms updates the `previous` member to be the current position of the transform.
This is used in rendering, allowing render systems to use the previous and current position to
interpolate its position when drawing.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entities` | [SystemEntity](systementity.md)[] | The entities to update the interpolation positions of  |

**Returns:** *void*

___

### `Static` `Private` EVALUATOR

▸ **EVALUATOR**(`entity`: [IEntity](../interfaces/ientity.md), `components`: [Component](component.md)[]): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | [IEntity](../interfaces/ientity.md) |
`components` | [Component](component.md)[] |

**Returns:** *boolean*