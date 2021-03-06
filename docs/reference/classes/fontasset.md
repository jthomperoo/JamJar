
# Class: FontAsset

FontAsset represents a loaded and rendered font asset.

## Hierarchy

* **FontAsset**

## Index

### Constructors

* [constructor](fontasset.md#constructor)

### Properties

* [name](fontasset.md#name)
* [request](fontasset.md#request)
* [MESSAGE_FINISH_LOAD](fontasset.md#static-message_finish_load)

## Constructors

###  constructor

\+ **new FontAsset**(`name`: string, `request`: [FontRequest](fontrequest.md)): *[FontAsset](fontasset.md)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`request` | [FontRequest](fontrequest.md) |

**Returns:** *[FontAsset](fontasset.md)*

## Properties

###  name

• **name**: *string*

Name of the asset

___

###  request

• **request**: *[FontRequest](fontrequest.md)*

Request that created the asset

___

### `Static` MESSAGE_FINISH_LOAD

▪ **MESSAGE_FINISH_LOAD**: *"finish_font_load"* = "finish_font_load"

Message when a font asset is finished loading.
