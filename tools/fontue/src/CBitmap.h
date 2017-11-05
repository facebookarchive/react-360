#pragma once

#include "stb_image_write.h"

class CBitmap {
 public:
  CBitmap() : Buffer(NULL), Width(0), Height(0), BytesPerPixel(0), Pitch(0) {}
  ~CBitmap() {
    free(Buffer);
  }

  static bool Create(
      CBitmap& bm,
      int32_t const width,
      int32_t const height,
      int32_t const bytesPerPixel,
      bool const fill) {
    size_t bmSizeInBytes = (size_t)width * (size_t)height * (size_t)bytesPerPixel;
    assert(bmSizeInBytes > 0);
    bm.Buffer = reinterpret_cast<uint8_t*>(malloc(bmSizeInBytes));
    if (bm.Buffer == NULL) {
      bm.Width = 0;
      bm.Height = 0;
      bm.BytesPerPixel = 0;
      bm.Pitch = 0;
      return false;
    }
    bm.Width = width;
    bm.Height = height;
    bm.BytesPerPixel = bytesPerPixel;
    bm.Pitch = bytesPerPixel * width;
    if (fill) {
      memset(bm.Buffer, 0, bmSizeInBytes);
    }
    return true;
  }

  static CBitmap*
  Create(int32_t const width, int32_t const height, int32_t bytesPerPixel, bool const fill) {
    CBitmap* bm = new CBitmap;
    if (bm == NULL) {
      return NULL;
    }
    if (!Create(*bm, width, height, bytesPerPixel, fill)) {
      delete bm;
      return NULL;
    }
    return bm;
  }

  void CopyInto(CBitmap& other, int32_t const x, int32_t const y);

  void SetPixelRGBA(int32_t const x, int32_t const y, uint32_t rgba) {
    size_t ofs = (size_t(y) * size_t(Pitch)) + (size_t(x) * BytesPerPixel);
    Buffer[ofs + 0] = rgba >> 24;
    Buffer[ofs + 1] = (rgba >> 16) & 0xFF;
    Buffer[ofs + 2] = (rgba >> 8) & 0xFF;
    Buffer[ofs + 3] = (rgba & 0xFF);
  }

  void SetPixelRGBA(
      int32_t const x,
      int32_t const y,
      uint8_t const r,
      uint8_t const g,
      uint8_t const b,
      uint8_t const a) {
    size_t ofs = (size_t(y) * size_t(Pitch)) + (size_t(x) * BytesPerPixel);
    Buffer[ofs + 0] = r;
    Buffer[ofs + 1] = g;
    Buffer[ofs + 2] = b;
    Buffer[ofs + 3] = a;
  }

  uint32_t GetPixelRGBA(int32_t x, int32_t y) const {
    if (x < 0) {
      x = 0;
    } else if (x >= Width) {
      x = Width - 1;
    }
    if (y < 0) {
      y = 0;
    } else if (y >= Height) {
      y = Height - 1;
    }
    size_t ofs = (size_t(y) * size_t(Pitch)) + (size_t(x) * BytesPerPixel);
    return uint32_t(
        (Buffer[ofs + 0] << 24) | (Buffer[ofs + 1] << 16) | (Buffer[ofs + 2] << 8) |
        Buffer[ofs + 3]);
  }

  uint32_t GetPixelRGB(int32_t x, int32_t y) const {
    if (x < 0) {
      x = 0;
    } else if (x >= Width) {
      x = Width - 1;
    }
    if (y < 0) {
      y = 0;
    } else if (y >= Height) {
      y = Height - 1;
    }
    size_t ofs = (size_t(y) * size_t(Pitch)) + (size_t(x) * BytesPerPixel);
    return uint32_t((Buffer[ofs + 0] << 24) | (Buffer[ofs + 1] << 16) | (Buffer[ofs + 2] << 8));
  }

  uint32_t SamplePixelRGBA(float const u, float const v) {
    float const u1 = (u * Width);
    float const v1 = (v * Height);
    int const x = static_cast<int>(floor(u1));
    int const y = static_cast<int>(floor(v1));
    float const uFrac = u1 - x;
    float const vFrac = v1 - y;
    float const invuFrac = 1.0f - uFrac;
    float const invvFrac = 1.0f - vFrac;
    uint32_t s0 = GetPixelRGBA(x, y);
    uint32_t s1 = GetPixelRGBA(x + 1, y);
    uint32_t s2 = GetPixelRGBA(x, y + 1);
    uint32_t s3 = GetPixelRGBA(x + 1, y + 1);
    float r = ((s0 >> 24) * uFrac + (s1 >> 24) * invuFrac) * invvFrac +
        ((s2 >> 24) * uFrac + (s3 >> 24) * invuFrac) * vFrac;
    float g = (((s0 >> 16) & 0xFF) * uFrac + ((s1 >> 16) & 0xFF) * invuFrac) * invvFrac +
        (((s2 >> 16) & 0xFF) * uFrac + ((s3 >> 16) & 0xFF) * invuFrac) * vFrac;
    float b = (((s0 >> 8) & 0xFF) * uFrac + ((s1 >> 8) & 0xFF) * invuFrac) * invvFrac +
        (((s2 >> 8) & 0xFF) * uFrac + ((s3 >> 8) & 0xFF) * invuFrac) * vFrac;
    float a = ((s0 & 0xFF) * uFrac + (s1 & 0xFF) * invuFrac) * invvFrac +
        ((s2 & 0xFF) * uFrac + (s3 & 0xFF) * invuFrac) * vFrac;
    uint32_t p = ((int)r << 24) | ((int)g << 16) | ((int)b << 8) | (int)a;
    return p;
  }

  uint32_t SamplePixelRGB(float const u, float const v) {
    float const u1 = (u * Width);
    float const v1 = (v * Height);
    int const x = static_cast<int>(floor(u1));
    int const y = static_cast<int>(floor(v1));
    float const uFrac = u1 - x;
    float const vFrac = v1 - y;
    float const invuFrac = 1.0f - uFrac;
    float const invvFrac = 1.0f - vFrac;
    uint32_t s0 = GetPixelRGB(x, y);
    uint32_t s1 = GetPixelRGB(x + 1, y);
    uint32_t s2 = GetPixelRGB(x, y + 1);
    uint32_t s3 = GetPixelRGB(x + 1, y + 1);
    float r = ((s0 >> 24) * uFrac + (s1 >> 24) * invuFrac) * invvFrac +
        ((s2 >> 24) * uFrac + (s3 >> 24) * invuFrac) * vFrac;
    float g = (((s0 >> 16) & 0xFF) * uFrac + ((s1 >> 16) & 0xFF) * invuFrac) * invvFrac +
        (((s2 >> 16) & 0xFF) * uFrac + ((s3 >> 16) & 0xFF) * invuFrac) * vFrac;
    float b = (((s0 >> 8) & 0xFF) * uFrac + ((s1 >> 8) & 0xFF) * invuFrac) * invvFrac +
        (((s2 >> 8) & 0xFF) * uFrac + ((s3 >> 8) & 0xFF) * invuFrac) * vFrac;
    uint32_t p = ((int)r << 24) | ((int)g << 16) | ((int)b << 8);
    return p;
  }

  void WritePNG(char const* path) const {
    std::vector<uint8_t> output;
    for (auto i = 0; i < (Width * Height); i++) {
      output.push_back(Buffer[i * BytesPerPixel]);
      output.push_back(0);
      output.push_back(0);
    }
    stbi_write_png(path, Width, Height, 3, &output[0], Width * 3);
  }

  struct WalkType_t {
    // float    scale;
    int16_t x;
    int16_t y;
  };

  static int32_t const WALK_RADIUS = 256;

  static void CalcRadialWalkTable(int32_t const radius) {
    int32_t const radialWalkTableSize = (radius * 2 + 1) * (radius * 2 + 1);
    WalkTable = new WalkType_t[radialWalkTableSize];
    NumWalk = 0;
    CalcRadialWalkTable(WALK_RADIUS, WalkTable, NumWalk);
  }

  // creates a table 8sed to walk in a circle around a single pixel in an image
  static void CalcRadialWalkTable(int32_t const radius, WalkType_t* walk, int32_t& numWalk) {
    numWalk = 0;
    for (int r = 0; r < radius; r++) {
      for (int y = -r; y <= r; y++) {
        for (int x = -r; x <= r; x++) {
          const int s = y * y + x * x;
          if (s >= r * r && s < (r + 1) * (r + 1)) {
            WalkType_t newWalk;
            // newWalk.scale = 1.0f - (float)( x * x + y * y ) / ( radius * radius *
            // radius );
            newWalk.x = (short)x;
            newWalk.y = (short)y;
            walk[numWalk] = newWalk;
            for (int i = numWalk - 1; i >= 0; i--) {
              if (x * x + y * y >= walk[i].x * walk[i].x + walk[i].y * walk[i].y) {
                walk[i + 1] = newWalk;
                break;
              }
              walk[i + 1] = walk[i];
            }
            numWalk++;
          }
        }
      }
    }
  }

  float CalcDistance(int32_t const x, int32_t const y) const {
    // get the color at x,y ... search for the closest opposite color
    uint32_t pixelColor = GetPixelRGBA(x, y) & 0xff000000;
    if (pixelColor == 0) {
      // starting outside of a glyph -- walk until we find the closes outside pixel
      for (int32_t i = 1; i < NumWalk; ++i) {
        int32_t xx = x + WalkTable[i].x;
        int32_t yy = y + WalkTable[i].y;
        if (xx < 0 || yy < 0 || xx >= Width || yy >= Height) {
          continue; // ignore out-of-bound pixels if we started outside
        }
        uint32_t curColor = GetPixelRGB(xx, yy) & 0xff000000; // ignore alpha
        if (curColor != 0) {
          return sqrtf(float(
                     (int32_t)WalkTable[i].x * (int32_t)WalkTable[i].x +
                     (int32_t)WalkTable[i].y * (int32_t)WalkTable[i].y)) /
              WALK_RADIUS;
        }
      }
      return 1.0f;
    }
    // starting inside of a glyph -- walk until we find the closest inside pixel
    for (int32_t i = 1; i < NumWalk; ++i) {
      int32_t xx = x + WalkTable[i].x;
      int32_t yy = y + WalkTable[i].y;
      uint32_t curColor;
      if (xx < 0 || yy < 0 || xx >= Width || yy >= Height) {
        curColor = 0; // if we started inside, consider out-of-bound pixels as outside
      } else {
        curColor = GetPixelRGB(xx, yy) & 0xff000000; // ignore alpha
      }
      if (curColor == 0) {
        return (sqrtf(float(
                    (int32_t)WalkTable[i].x * (int32_t)WalkTable[i].x +
                    (int32_t)WalkTable[i].y * (int32_t)WalkTable[i].y)) /
                WALK_RADIUS) *
            -1.0f;
      }
    }
    return -1.0f;
  }

  uint8_t* Buffer; // the bitmap data
  int32_t Width; // width of the bitmap
  int32_t Height; // height of the bitmap
  int32_t BytesPerPixel; // bits per pixel
  uint32_t
      Pitch; // width * bytes per pixel (memory offset to advance to next row of the bitmap image)

  static WalkType_t* WalkTable;
  static int32_t NumWalk;
};

CBitmap::WalkType_t* CBitmap::WalkTable = NULL;
int32_t CBitmap::NumWalk = 0;

void CBitmap::CopyInto(CBitmap& other, int32_t const x, int32_t const y) {
  for (size_t r = 0; r < Height; ++r) {
    size_t outR = y + r;
    assert(outR < other.Height);
    size_t outOfs = outR * size_t(other.Pitch) + size_t(x) * 4;
    size_t inOfs = r * size_t(Pitch);
    for (size_t c = 0; c < Width; ++c) {
      other.Buffer[outOfs + c * 4 + 0] = Buffer[inOfs + c * 4 + 0];
      other.Buffer[outOfs + c * 4 + 1] = Buffer[inOfs + c * 4 + 1];
      other.Buffer[outOfs + c * 4 + 2] = Buffer[inOfs + c * 4 + 2];
      other.Buffer[outOfs + c * 4 + 3] = Buffer[inOfs + c * 4 + 3];
    }
  }
}
