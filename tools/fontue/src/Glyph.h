#pragma once

// =============================================
// CGlyph
// this is just a temporary structure for holding glyph info until it's written to disk
// =============================================
class CGlyph {
 public:
  CGlyph(uint32_t const charCode)
      : CharCode(charCode),
        X(-1),
        Y(-1),
        Width(0),
        Height(0),
        Area(0),
        AdvanceX(0),
        AdvanceY(0),
        BearingX(0),
        BearingY(0),
        Bitmap(NULL) {}

  static bool SortByHeightThenWidth(CGlyph const* a, CGlyph const* b);

  uint32_t CharCode; // character code for this glyph
  int32_t X; // x offset in the bitmap
  int32_t Y; // y offset in the bitmap
  int32_t Width; // width of the character in pixels (doesn't include any empty pixels to the left
                 // or right -- advanceX does that)
  int32_t Height; // height of the character (doesn't include any empty pixels to the top or
                  // bottom -- advanceY does that)
  int32_t Area; // area of the character (used for sorting)
  int32_t AdvanceX; // horizontal increment to the next character
  int32_t AdvanceY; // vertical increment to the next character
  int32_t BearingX; //
  int32_t BearingY; //
  CBitmap* Bitmap; // bitmap of the glyph
};

bool CGlyph::SortByHeightThenWidth(CGlyph const* a, CGlyph const* b) {
  if (a->Height != b->Height) {
    return a->Height < b->Height;
  }
  return a->Width < b->Width;
}

// =============================================
// CRectangle
//
// We start out with a single rectangle representing the image and then we split it as we
// add glyphs.
// =============================================
class CRectangle {
 public:
  CRectangle() : GlyphIndex(-1), X(0), Y(0), Width(0), Height(0) {}

  CRectangle(int32_t const x, int32_t const y, int32_t const w, int32_t const h)
      : GlyphIndex(-1), X(x), Y(y), Width(w), Height(h) {}

  CRectangle* SplitHorizontally(int32_t const splitHeight);
  CRectangle* SplitVertically(int32_t const splitWidth);

  bool CanFitGlyph(CGlyph const& glyph) const {
    return Width >= glyph.Width && Height >= glyph.Height;
  }

  int32_t GetGlyphIndex() const {
    return GlyphIndex;
  }
  void SetGlyphIndex(int32_t const i) {
    GlyphIndex = i;
  }

  int32_t GetX() const {
    return X;
  }
  void SetX(int32_t const x) {
    X = x;
  }

  int32_t GetY() const {
    return Y;
  }
  void SetY(int32_t const y) {
    Y = y;
  }

  int32_t GetWidth() const {
    return Width;
  }
  void SetWidth(int32_t const w) {
    Width = w;
  }

  int32_t GetHeight() const {
    return Height;
  }
  void SetHeight(int32_t const h) {
    Height = h;
  }

  int32_t GetArea() const {
    return Width * Height;
  }

  void SetDims(int32_t const w, int32_t const h) {
    Width = w;
    Height = h;
  }

  static bool CompareGlyphArea(CRectangle const* a, CRectangle const* b);
  static bool CompareGlyphHeight(CRectangle const* a, CRectangle const* b);

 private:
  int32_t GlyphIndex; // index of the glyph occupying this bin (-1 if not occupied)
  int32_t X; // x location of the bin
  int32_t Y; // y location of the bin
  int32_t Width; // width of the bin
  int32_t Height; // height of the bin
};

bool CRectangle::CompareGlyphArea(CRectangle const* a, CRectangle const* b) {
  return a->GetArea() < b->GetArea();
}

bool CRectangle::CompareGlyphHeight(CRectangle const* a, CRectangle const* b) {
  return a->GetHeight() < b->GetHeight();
}

CRectangle* CRectangle::SplitHorizontally(int32_t const splitHeight) {
  if (splitHeight > Height) {
    assert(splitHeight <= Height);
    return NULL;
  }
  if (splitHeight == Height) {
    // if it's the same height we don't need to do anything
    return NULL;
  }
  CRectangle* r = new CRectangle(X, Y + splitHeight, Width, Height - splitHeight);
  // adjust this rectangle's dimensions since it was just sliced!
  Height = splitHeight;
  return r;
}

CRectangle* CRectangle::SplitVertically(int32_t const splitWidth) {
  if (splitWidth > Width) {
    assert(splitWidth <= Width);
    return NULL;
  }
  if (splitWidth == Width) {
    // same width so nothing to do
    return NULL;
  }
  CRectangle* r = new CRectangle(X + splitWidth, Y, Width - splitWidth, Height);
  // adjust width since this rectangle is now cut into two
  Width = splitWidth;
  return r;
}
