# Texture Options

JamJar supports customisation of how textures are presented and rendered with
the use of the [ITextureOptions] optionset.

## Filtering

The following texture filtering options are supported:

- **Nearest** - nearest neighbour filtering.
- **Bilinear** - bilinear filtering.
- **Trilinear** - trilinear filtering.

These are specified by the [TextureFiltering] enum.

### Minification Filtering

To apply a filter when minifying a texture, provide the `minFilter` property.

### Magnification Filtering

To apply a filter when magnifying a texture, provide the `magFilter` property.

## Wrapping

The following texture wrapping options are supported:

- **Repeat** - Repeat the textures image.
- **Mirrored Repeat** - Repeat the texture image, mirroring the image with each repeat.
- **Clamp to Edge** - Clamps the coordinates between 0 and 1.

These are specified by the [TextureWrapping] enum. These can be applied either
to the x axis with `xWrap` or to the y axis with `yWrap`.

## Mipmaps

Mipmaps can be generated or not generated by providing the `generateMipmaps`
option. This is a boolean option, `true` will generate mipmaps, `false` will
skip mipmap generation.

[ITextureOptions]:../../reference/interfaces/itextureoptions
[TextureFiltering]:../../reference/enums/texturefiltering
[TextureWrapping]:../../reference/enums/texturewrapping