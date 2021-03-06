
# Class: Vector

Vector is the 2 dimensional representation of a vector, with two values (x,y).
This is a mutable data structure, operations on Vector objects will affect the original object.

## Hierarchy

* **Vector**

## Index

### Constructors

* [constructor](vector.md#constructor)

### Properties

* [data](vector.md#private-data)

### Accessors

* [x](vector.md#x)
* [y](vector.md#y)

### Methods

* [Add](vector.md#add)
* [Apply3D](vector.md#apply3d)
* [Apply4D](vector.md#apply4d)
* [Copy](vector.md#copy)
* [Dot](vector.md#dot)
* [Equals](vector.md#equals)
* [Invert](vector.md#invert)
* [Magnitude](vector.md#magnitude)
* [Multiply](vector.md#multiply)
* [Normalize](vector.md#normalize)
* [Rotate](vector.md#rotate)
* [RotateDeg](vector.md#rotatedeg)
* [Scale](vector.md#scale)
* [Sub](vector.md#sub)

## Constructors

###  constructor

\+ **new Vector**(`x`: number, `y`: number): *[Vector](vector.md)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vector](vector.md)*

## Properties

### `Private` data

• **data**: *Float32Array*

## Accessors

###  x

• **get x**(): *number*

**Returns:** *number*

• **set x**(`value`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  y

• **get y**(): *number*

**Returns:** *number*

• **set y**(`value`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

## Methods

###  Add

▸ **Add**(`vector`: [Vector](vector.md)): *[Vector](vector.md)*

Add adds two vectors together, result saved to the original Vector and returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vector` | [Vector](vector.md) | The vector to add to this one |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the result of the addition

___

###  Apply3D

▸ **Apply3D**(`matrix`: [Matrix3D](matrix3d.md)): *[Vector](vector.md)*

Apply3D applies a 3x3 matrix to this vector, result saved to the original Vector and returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`matrix` | [Matrix3D](matrix3d.md) | Matrix to apply to this vector |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, Vector that has the matrix applied to it

___

###  Apply4D

▸ **Apply4D**(`matrix`: [Matrix4D](matrix4d.md)): *[Vector](vector.md)*

Apply4D applies a 4x4 matrix to this vector, result saved to the original Vector and returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`matrix` | [Matrix4D](matrix4d.md) | Matrix to apply to this vector |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, Vector that has the matrix applied to it

___

###  Copy

▸ **Copy**(): *[Vector](vector.md)*

Copy produces a copy of this vector and its values, rather than pointing to the same vector.

**Returns:** *[Vector](vector.md)*

The copy of this vector

___

###  Dot

▸ **Dot**(`vector`: [Vector](vector.md)): *number*

Dot calculates the dot product of two vectors.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vector` | [Vector](vector.md) | The vector to dot with this vector |

**Returns:** *number*

The result of the dot product

___

###  Equals

▸ **Equals**(`other`: [Vector](vector.md)): *boolean*

Equals determines if another

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`other` | [Vector](vector.md) |   |

**Returns:** *boolean*

___

###  Invert

▸ **Invert**(): *[Vector](vector.md)*

Invert flips the values of this vector, `x -> -x` and `y -> -y`, result saved to the original Vector and
returned.

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the result of the inverting

___

###  Magnitude

▸ **Magnitude**(): *number*

Calculates magnitude of this vector.

**Returns:** *number*

The magnitude

___

###  Multiply

▸ **Multiply**(`vector`: [Vector](vector.md)): *[Vector](vector.md)*

Multiply multiplies two vectors together, result saved to the original Vector and returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vector` | [Vector](vector.md) | The matrix to multiply this one by |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the result of the multiplication

___

###  Normalize

▸ **Normalize**(): *[Vector](vector.md)*

Returns a normalized version of this vector, result saved to the original Vector and returned.

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the normalized vector

___

###  Rotate

▸ **Rotate**(`center`: [Vector](vector.md), `angle`: number): *[Vector](vector.md)*

Rotate applies a rotation around a point to the vector in radians, result saved to the original Vector and
returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`center` | [Vector](vector.md) | The point to rotate around |
`angle` | number | The angle in radians to rotate by |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the result of the rotation

___

###  RotateDeg

▸ **RotateDeg**(`center`: [Vector](vector.md), `angle`: number): *[Vector](vector.md)*

RotateDeg applies a rotation around a point to the vector in degrees, result saved to the original Vector and
returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`center` | [Vector](vector.md) | The point to rotate around |
`angle` | number | The angle in degrees to rotate by |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the result of the rotation

___

###  Scale

▸ **Scale**(`scalar`: number): *[Vector](vector.md)*

Scale multiplies this vector by a scalar value (non-vector), result saved to the original Vector and returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`scalar` | number | The scalar value to multiply this vector by |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the result of the scaling

___

###  Sub

▸ **Sub**(`vector`: [Vector](vector.md)): *[Vector](vector.md)*

Sub takes one vector from another, result saved to the original Vector and returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vector` | [Vector](vector.md) | The vector to subtract from this one |

**Returns:** *[Vector](vector.md)*

This vector to allow chaining, the result result of the subtraction
