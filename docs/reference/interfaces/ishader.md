
# Interface: IShader

IShader is the interface representing a general shader.
This is designed to allow the possiblity of switching out the
render technology, e.g. GLSL, HLSL etc.

## Hierarchy

* **IShader**

## Implemented by

* [DefaultPrimitiveFragmentShader](../classes/defaultprimitivefragmentshader.md)
* [DefaultPrimitiveVertexShader](../classes/defaultprimitivevertexshader.md)
* [DefaultTextFragmentShader](../classes/defaulttextfragmentshader.md)
* [DefaultTextureFragmentShader](../classes/defaulttexturefragmentshader.md)
* [DefaultTextureVertexShader](../classes/defaulttexturevertexshader.md)
* [GLSLShader](../classes/glslshader.md)
* [TestShader](../classes/testshader.md)

## Index

### Properties

* [source](ishader.md#source)
* [type](ishader.md#type)

## Properties

###  source

• **source**: *string*

Source code of the shader, can be in any language.

___

###  type

• **type**: *string*

Type of the shader, for example fragment or vertex shader.
