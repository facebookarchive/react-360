A port of fontue a SDF font generation util present in the Oculus mobile SDK 1.0.4

## [Mac]
brew install freetype

## [PC]
FreeType can be downloaded from http://www.freetype.org

After downloading FreeType, the libraries must be compiled separately
before building fontue.exe.

The FreeType library must then exist in ./freetype2 as
freetype2/lib/freetype.lib
freetype2/include


# Build

cmake .

