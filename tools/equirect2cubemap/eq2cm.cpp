// equirect to cubemap
// uses functions from https://github.com/casseveritt/projection

#include <algorithm>
#include <math.h>
#include <stdio.h>
#include <string>


#ifdef __llvm__
#pragma GCC diagnostic ignored "-Wdangling-else"
#endif

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

struct Vec3
{
	float x, y, z;
};

struct Vec2
{
	float x, y;
};

Vec3 Normalize( Vec3 v )
{
	float invmag = 1.f / sqrtf( v.x * v.x + v.y * v.y + v.z * v.z );
	v.x *= invmag;
	v.y *= invmag;
	v.z *= invmag;
	return v;
}

Vec3 CubeToDirection( int face, float x, float y )
{
	Vec3 v;
	v.x = x;
	v.y = y;
	v.z = 1.0;
	v = Normalize( v );
	Vec3 swz;
	switch ( face )
	{
	case 2: // +Y
		swz.z = -v.y;
		swz.x = -v.x;
		swz.y = v.z;
		break;
	case 4: // +Z
		swz.x = -v.x;
		swz.y = v.y;
		swz.z = v.z;
		break;
	case 3: // -Y
		swz.z = v.y;
		swz.x = -v.x;
		swz.y = -v.z;
		break;
	case 1: // -X
		swz.z = v.x;
		swz.y = v.y;
		swz.x = v.z;
		break;
	case 5: // -Z
		swz.x = v.x;
		swz.y = v.y;
		swz.z = -v.z;
		break;
	case 0: // +X
		swz.z = -v.x;
		swz.y = v.y;
		swz.x = -v.z;
		break;
	default:
		break;
	}
	return swz;
}

Vec2 DirectionToEquirect( Vec3 v )
{
	Vec2 p;
	double xz = sqrt( v.x * v.x + v.z * v.z );
	p.x = atan2( v.x, v.z ) / ( 2.0 * M_PI );
	p.y = ( atan2( v.y, xz ) / M_PI ) + 0.5;
	if ( p.x < 0.0 )
	{
		p.x += 1.0;
	}
	p.x = 1.0 - p.x;
	return p;
}

float lerp( float a, float b, float f )
{
	return a * ( 1.0f - f ) + b * f;
}

float bilerp( float p00, float p10, float p01, float p11, float fx, float fy )
{
	float y0 = lerp( p00, p10, fx );
	float y1 = lerp( p01, p11, fx );
	return lerp( y0, y1, fy );
}

void SampleBilerp( const unsigned char *img, int width, int height, int comp, float s, float t,
					unsigned char *dst )
{
	float fi = s * width;
	float fj = t * height;
	if ( fj < 0.f || fj > ( height - 1 ) )
	{
		memset( dst, 0, comp );
		return;
	}
	int i = fi - 1.0f;
	int j = fj - 1.0f;
	int i0 = std::min( std::max( i, 0 ), width - 1 );
	int i1 = std::min( i0 + 1, width - 1 );
	int j0 = std::min( std::max( j, 0 ), height - 1 );
	int j1 = std::min( j0 + 1, height - 1 );
	float ifrac = fi - floor( fi );
	float jfrac = fj - floor( fj );
	const unsigned char *p00 = img + ( ( j0 * width + i0 ) * comp );
	const unsigned char *p10 = img + ( ( j0 * width + i1 ) * comp );
	const unsigned char *p01 = img + ( ( j1 * width + i0 ) * comp );
	const unsigned char *p11 = img + ( ( j1 * width + i1 ) * comp );
	for ( int c = 0; c < comp; c++ )
	{
		dst[ c ] = std::min( std::max( ( int ) bilerp( p00[ c ], p10[ c ], p01[ c ], p11[ c ], ifrac, jfrac ), 0 ), 255 );
	}
}

int main( int argc, char **argv )
{

	printf( "eq2cm: Equirect to CubeMap conversion\n" );

	if ( argc != 4 )
	{
		printf( "usage: eq2cm <eqr-image> <bbc-edge-length> <cm-basename>\n" );
		return 1;
	}
	int edgeLength = atof( argv[ 2 ] );

  int w = 0;
  int h = 0;
  int comp = 0;
	unsigned char *eqr = stbi_load( argv[ 1 ], &w, &h, &comp, 0 );

	printf( "width = %d, height = %d, num_components = %d\n", w, h, comp );

	unsigned char *r = new unsigned char[ edgeLength * edgeLength * comp ];

	float halfEdgeLength = edgeLength / 2.f;
	for ( int f = 0; f < 6; f++ )
	{
		for ( int y = 0; y < edgeLength; y++ )
		{
			unsigned char *line = r + ( edgeLength - 1 - y ) * edgeLength * comp;
			for ( int x = 0; x < edgeLength; x++ )
			{
				Vec3 dir =
					CubeToDirection( f, ( x - halfEdgeLength + 0.5f ) / halfEdgeLength,
											 ( y - halfEdgeLength + 0.5f ) / halfEdgeLength );
				Vec2 eqrtc = DirectionToEquirect( dir );
				SampleBilerp( eqr, w, h, comp, eqrtc.x, 1.0f - eqrtc.y, line );
				if ( comp > 3 )
				{
					line[ 3 ] = 255;
				}
				line += comp;
			}
		}
		std::string output = std::string( argv[ 3 ] ) + std::to_string( f ) + std::string( ".png" );
		stbi_write_png( output.c_str(), edgeLength, edgeLength, comp, r, 0 );
	}

	delete[] r;
	stbi_image_free( eqr );

	return 0;
}
