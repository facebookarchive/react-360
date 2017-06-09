/************************************************************************************

PublicHeader:   None
Filename    :   main.cpp
Content     :   Utility functions for manipulating file paths
Created     :   May 8, 2014
Author      :   Jonathan E. Wright
Notes       :

Copyright   :   Copyright 2014 Oculus VR, LLC. All Rights reserved.

************************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <string>
#include <vector>
#include <map>
#include <algorithm>
#include <iostream>
#include <time.h>
#include <stdint.h>
#include <float.h>
#include <ft2build.h>
#include <sstream>
#include <memory.h>
#include <math.h>
#include <assert.h>
#include <string.h>
#include "JSON.h"
#include "CBitmap.h"
#include "utf8.h"
#include "Glyph.h"

static int FNT_FILE_VERSION = 1;
const int MAX_PATH = 1024;

#include FT_FREETYPE_H

#define USED(var__) (void)(var__)

namespace OVR {

#if defined(_WIN32)
#define strcasecmp stricmp
#endif

void ReplaceChar(std::string& str, char ch1, char ch2) {
  for (auto i = 0; i < str.length(); ++i) {
    if (str[i] == ch1)
      str[i] = ch2;
  }
}

int32_t Clamp(const int32_t a, const int32_t mn, const int32_t mx) {
  return a < mn ? mn : a > mx ? mx : a;
}

inline int32_t ftoi(const double d) {
  return (int32_t)d;
}

inline int32_t dtoi(const double d) {
  return (int32_t)d;
}

static float ClampFloat(float const in, float const min, float const max) {
  if (in < min) {
    return min;
  } else if (in > max) {
    return max;
  }
  return in;
}

static int32_t NextPowerOfTwo(int32_t n) {
  n--;
  n |= (n >> 1);
  n |= (n >> 2);
  n |= (n >> 4);
  n |= (n >> 8);
  n |= (n >> 16);
  n++;
  return n;
}

static void FreeRectList(std::vector<CRectangle*>& list) {
  for (int i = 0; i < list.size(); ++i) {
    delete list[i];
    list[i] = NULL;
  }
  list.resize(0);
}

static bool PlaceGlyphs(
    std::vector<CGlyph*> const& glyphs,
    int32_t const sideX,
    int32_t const sideY,
    std::vector<CRectangle*>& usedRects) {
  // make an initial rectangle
  CRectangle* initialRect = new CRectangle(0, 0, sideX, sideY);

  std::vector<CRectangle*> emptyRects;
  emptyRects.push_back(initialRect);

  // make a list of glyphs indices that are not used
  std::vector<int32_t> unusedGlyphs;
  unusedGlyphs.resize(glyphs.size());
  for (int i = 0; i < glyphs.size(); ++i) {
    unusedGlyphs[i] = i;
  }

  // while we have unused glyphs and an empty bin
  // - place the largest glyph in the empty rect and remove the glyph from the unused list
  // - split the empty rect (it may split into anywhere from 0 to 3 new rects depending on
  //   where the cut is made)
  // - put the rect with the glyph in it into the used list
  // - add new rects to the empty list
  while (unusedGlyphs.size()) {
    int32_t glyphIndex = unusedGlyphs.back();
    unusedGlyphs.pop_back();

    CGlyph const& g = *(glyphs[glyphIndex]);
    if (g.Width <= 0 || g.Height <= 0) {
      continue; // some glyphs can actually take up no space... like space
    }

    CRectangle* emptyRect = NULL;
    if (emptyRects.size() == 0) {
      // ran out of free rectangles -- we need a larger initial rectangle to allocate from
      FreeRectList(emptyRects);
      FreeRectList(usedRects);
      return false;
    }
    emptyRect = emptyRects.back();
    emptyRects.pop_back();

    // if the glyph won't fit, see if there's
    if (!emptyRect->CanFitGlyph(g)) {
      // the glyph doesn't fit in the current empty rect, so search the list for one that does
      int32_t i = static_cast<int32_t>(emptyRects.size()) - 1;
      for (; i >= 0; --i) {
        CRectangle* rect = emptyRects[i];
        if (rect->CanFitGlyph(g)) {
          emptyRects[i] = emptyRect;
          emptyRect = rect;
          std::sort(emptyRects.begin(), emptyRects.end(), CRectangle::CompareGlyphHeight);
          break;
        }
      }
      if (i < 0) {
        // couldn't fit in any of the remaining rects -- we need to start with a larger
        // initial rectangle
        delete emptyRect;
        FreeRectList(emptyRects);
        FreeRectList(usedRects);
        return false;
      }
    }
    assert(emptyRect->CanFitGlyph(g));
    emptyRect->SetGlyphIndex(glyphIndex);
    usedRects.push_back(emptyRect);
    if (g.Width != emptyRect->GetWidth() || g.Height != emptyRect->GetHeight()) {
      CRectangle* hRect = emptyRect->SplitHorizontally(g.Height);
      CRectangle* vRect = emptyRect->SplitVertically(g.Width);
      if (hRect != NULL) {
        emptyRects.push_back(hRect);
      }
      if (vRect != NULL) {
        emptyRects.push_back(vRect);
      }
    }
  }

  // clean up empty rects and total the unused area for metrics
  int32_t emptyArea = 0;
  for (size_t i = 0; i < emptyRects.size(); ++i) {
    emptyArea += emptyRects[i]->GetArea();
    delete emptyRects[i];
    emptyRects[i] = NULL;
  }
  emptyRects.resize(0);

  // total the used area
  int32_t usedArea = 0;
  for (size_t i = 0; i < usedRects.size(); ++i) {
    usedArea += usedRects[i]->GetArea();
  }

  std::cout << "Empty area: " << emptyArea << "\n";
  std::cout << "Used area: " << usedArea << "\n";

  return true;
}

#define ASSIGN_NEXT_ARG(_var_)                                             \
  if (i + 1 >= argc) {                                                     \
    std::cout << "Expected an argument after option " << argv[i] << ".\n"; \
    return -1;                                                             \
  }

#define ASSIGN_NEXT_ARGI(_var_) \
  ASSIGN_NEXT_ARG(_var_)        \
  _var_ = atoi(argv[++i]);

#define ASSIGN_NEXT_ARGF(_var_) \
  ASSIGN_NEXT_ARG(_var_)        \
  _var_ = static_cast<float>(atof(argv[++i]));

#define ASSIGN_NEXT_ARGSTR(_var_) \
  ASSIGN_NEXT_ARG(_var_)          \
  _var_ = argv[++i];

bool IsHexString(std::string const& s) {
  return (s.length() > 2 && s[0] == '0' && s[1] == 'x');
}

bool CharIsInString(char const ch, char const* s) {
  if (s[0] == '\0') {
    return false;
  }
  for (int i = 0; s[i] != '\0'; ++i) {
    if (s[i] == ch) {
      return true;
    }
  }
  return false;
}

std::string StripLeadingChars(std::string const& s, char const* chars) {
  char const* p = s.c_str();
  while (CharIsInString(*p, chars)) {
    p++;
  }

  std::string out(p);
  return out;
}

std::string StripTrailingChars(std::string const& s, char const* chars) {
  size_t len = s.length();
  if (len == 0) {
    std::string empty;
    return empty;
  }

  char const* start = s.c_str();
  char const* end = start + len - 1;
  while (CharIsInString(*end, chars) && end >= start) {
    end--;
  }
  std::string out(start, (end - start));
  return out;
}

bool StringToHex(std::string const& s, uint32_t& value) {
  std::string temp = StripLeadingChars(s, " \n\t\r");
  temp = StripTrailingChars(s, " \n\t\r");
  value = 0;
  int32_t len = static_cast<int32_t>(s.length());
  for (int32_t i = 0; i < len; ++i) {
    char const c = s.c_str()[len - 1 - i];
    int placeIdx;
    if (c == 'x' && s[0] == '0' && len - 1 - i == 1) {
      // if we got an 'x' in the second character spot and the first character is '0', we're
      // done.
      return true;
    }
    if (c >= 48 && c <= 57) {
      placeIdx = c - 48;
    } else if (c >= 97 && c <= 102) {
      placeIdx = c - 87;
    } else if (c >= 65 && c <= 70) {
      placeIdx = c - 55;
    } else {
      return false;
    }
    int32_t placeValue = (1 << (i * 4)) * placeIdx;
    value += placeValue;
  }
  return true;
}

class UnicodeRange {
 public:
  UnicodeRange() : StartCode(0), EndCode(0) {}
  UnicodeRange(uint32_t const s, uint32_t const e) : StartCode(s), EndCode(e) {}

  uint32_t StartCode;
  uint32_t EndCode;
};

bool AddCodePointsFromFile(
    char const* charFile,
    std::vector<uint32_t>& codePoints,
    bool const verifyAscii,
    std::string& asciiErrors,
    std::string& nonAsciiChars) {
  FILE* f = fopen(charFile, "rb");
  if (f == NULL) {
    return false;
  }

  fseek(f, 0, SEEK_END);
  size_t flen = ftell(f);
  fseek(f, 0, SEEK_SET);

  char* buff = new char[flen + 1];
  size_t numRead = fread(buff, flen, 1, f);
  fclose(f);
  if (numRead != 1) {
    delete[] buff;
    return false;
  }

  buff[flen] = '\0';
  char const* p = buff;
  uint32_t curChar;
  curChar = DecodeNextChar(&p);
  int32_t count = 0;
  while (curChar) {
    if (verifyAscii == true && curChar > 256) {
      bool alreadyLogged = false;
      size_t len = nonAsciiChars.size();
      for (size_t i = 0; i < len; ++i) {
        if (nonAsciiChars[i] == curChar) {
          alreadyLogged = true;
          break;
        }
      }
      if (!alreadyLogged) {
        nonAsciiChars.append(1, curChar);
      }
      asciiErrors.append("ERROR: Non-ASCII character detected.\n");
      asciiErrors.append("Offending file: ");
      asciiErrors.append(charFile);
      asciiErrors.append("\n");
      asciiErrors.append("Offending text: \n");
      asciiErrors.append(1, curChar);
      char const* p2 = p;
      int numOutChars = 0;
      uint32_t outChar = DecodeNextChar(&p2);
      while (outChar && numOutChars < 40) {
        asciiErrors.append(1, outChar);
        numOutChars++;
        outChar = DecodeNextChar(&p2);
      }
      asciiErrors.append("\n");
    }
    size_t i = 0;
    for (; i < codePoints.size(); ++i) {
      if (codePoints[i] == curChar) {
        break;
      }
    }
    if (i >= codePoints.size()) {
      count++;
      codePoints.push_back(curChar);
    }

    curChar = DecodeNextChar(&p);
  }

  delete[] buff;

  // codePoints should now be a list of unique Unicode code points
  std::cout << "Read " << count << " unique characters from file.\n";

  return true;
}

static int CreateBitmapFont(int const argc, char const* argv[], FT_Library& ftLibrary) {
  int32_t fontIdx = 0;
  int32_t charSize = 32;
  int32_t pixelSize = 0;
  int32_t faceIdx = -1;
  int32_t hpad = 32;
  int32_t vpad = 32;
  int32_t targetWidth = -1; // for sdf only
  int32_t targetHeight = -1; // for sdf only
  bool signedDistanceField = false;
  bool grid = false;
  bool raw = false;
  bool verifyAscii = false;
  std::string asciiErrors; // using std::string because of its easy UTF-8 support
  std::string nonAsciiChars;
  std::string asciiErrorFile;
  int numCfCommands = 0;
  float scaleBias = 1.0f;
  float centerOffset = 0.0f;
  int32_t alphaValue = -1; // -1 means set alpha to RGB
  float tweakScale = 1.0f;
  float edgeWidth = 32.0f;
  char const* const FALLBACK_FONT_NAME = "droidsans.ttf";
  std::vector<std::string> fallbackFontFiles;
  fallbackFontFiles.push_back(std::string(FALLBACK_FONT_NAME));

  typedef std::pair<uint32_t, uint32_t> charRemap_t;

  std::vector<charRemap_t> characterRemaps;

  std::vector<uint32_t> glyphToUnicodeMap;
  std::vector<UnicodeRange> unicodeRanges;
  UnicodeRange replacementRange(0xFFFD, 0xFFFD);
  unicodeRanges.push_back(replacementRange);

  for (int i = 3; i < argc; ++i) {
    if (strcasecmp(argv[i], "-hpad") == 0) {
      ASSIGN_NEXT_ARGI(hpad);
    } else if (strcasecmp(argv[i], "-vpad") == 0) {
      ASSIGN_NEXT_ARGI(vpad);
    } else if (strcasecmp(argv[i], "-charSize") == 0) {
      ASSIGN_NEXT_ARGI(pixelSize);
    } else if (strcasecmp(argv[i], "-pixelSize") == 0) {
      ASSIGN_NEXT_ARGI(pixelSize);
    } else if (strcasecmp(argv[i], "-idx") == 0) {
      ASSIGN_NEXT_ARGI(fontIdx);
    } else if (strcasecmp(argv[i], "-faceIdx") == 0) {
      ASSIGN_NEXT_ARGI(faceIdx);
    } else if (strcasecmp(argv[i], "-sdf") == 0) {
      signedDistanceField = true;
      ASSIGN_NEXT_ARGI(pixelSize);
      ASSIGN_NEXT_ARGI(targetWidth);
      ASSIGN_NEXT_ARGI(targetHeight);
    } else if (strcasecmp(argv[i], "-grid") == 0) {
      grid = true;
    } else if (strcasecmp(argv[i], "-raw") == 0) {
      raw = true;
    } else if (strcasecmp(argv[i], "-bias") == 0) {
      ASSIGN_NEXT_ARGF(scaleBias);
    } else if (strcasecmp(argv[i], "-centerOffset") == 0 || strcasecmp(argv[i], "-co") == 0) {
      ASSIGN_NEXT_ARGF(centerOffset);
    } else if (strcasecmp(argv[i], "-ts") == 0) {
      ASSIGN_NEXT_ARGF(tweakScale);
    } else if (strcasecmp(argv[i], "-ew") == 0) {
      ASSIGN_NEXT_ARGF(edgeWidth);
    } else if (strcasecmp(argv[i], "-remap") == 0) {
      // remap a character to render as something else
      std::string from;
      std::string to;
      ASSIGN_NEXT_ARGSTR(from);
      ASSIGN_NEXT_ARGSTR(to);
      uint32_t fromi = 0;
      uint32_t toi = 0;
      if (!StringToHex(from, fromi)) {
        fromi = static_cast<uint32_t>(atoi(from.c_str()));
      }
      if (!StringToHex(to, toi)) {
        toi = static_cast<uint32_t>(atoi(to.c_str()));
      }
      characterRemaps.push_back(charRemap_t(fromi, toi));
    } else if (strcasecmp(argv[i], "-a") == 0 || strcasecmp(argv[i], "-alpha") == 0) {
      // defaults to negative, which means the alpha should be the same as the RGB channels
      ASSIGN_NEXT_ARGI(alphaValue);
      if (alphaValue > 255) {
        alphaValue = 255;
      }
    } else if (strcasecmp(argv[i], "-ur") == 0) {
      // add a range of unicode characters
      std::string startStr;
      std::string endStr;
      ASSIGN_NEXT_ARGSTR(startStr);
      ASSIGN_NEXT_ARGSTR(endStr);
      uint32_t start;
      uint32_t end;
      if (!StringToHex(startStr, start)) {
        start = atoi(startStr.c_str());
      }
      if (!StringToHex(endStr, end)) {
        end = atoi(endStr.c_str());
      }
      UnicodeRange r(start, end);
      unicodeRanges.push_back(r);
    } else if (strcasecmp(argv[i], "-uc") == 0) {
      // add a single unicode character
      int32_t c;
      ASSIGN_NEXT_ARGI(c);
      UnicodeRange r(c, c);
      unicodeRanges.push_back(r);
    } else if (strcasecmp(argv[i], "-cf") == 0 || strcasecmp(argv[i], "-charFile") == 0) {
      numCfCommands++;
      std::string charFile;
      ASSIGN_NEXT_ARGSTR(charFile);
      if (!AddCodePointsFromFile(
              charFile.c_str(), glyphToUnicodeMap, verifyAscii, asciiErrors, nonAsciiChars)) {
        std::cout << "Error reading file " << charFile << " for code points.\n";
        return -1;
      }
    } else if (strcasecmp(argv[i], "-fb") == 0 || strcasecmp(argv[i], "-fallback") == 0) {
      std::string fallbackFontFile;
      ASSIGN_NEXT_ARGSTR(fallbackFontFile);
      fallbackFontFiles.push_back(fallbackFontFile);
    } else if (strcasecmp(argv[i], "-verifyAscii") == 0) {
      verifyAscii = true;
      ASSIGN_NEXT_ARGSTR(asciiErrorFile);
      if (numCfCommands > 0) {
        std::cout << "-verifyAscii must come before any -cf commands!\n";
        return -1;
      }
    } else {
      std::cout << "Unknown option " << argv[i] << "!\n";
      return -1;
    }
  }

  // ensure all remapped characters are added
  for (int i = 0; i < static_cast<int>(characterRemaps.size()); ++i) {
    charRemap_t const& remap = characterRemaps[i];
    UnicodeRange range(remap.first, remap.first);
    unicodeRanges.push_back(range);
  }

  std::string inFileName = argv[1];
  std::string outFileName = argv[2];
  ReplaceChar(inFileName, '\\', '/');
  ReplaceChar(outFileName, '\\', '/');

  std::vector<FT_Face> fallbackFontFaces;
  FT_Error error;

  for (int i = 0; i < static_cast<int>(fallbackFontFiles.size()); ++i) {
    FT_Face fallbackFontFace = NULL;
    error = FT_New_Face(ftLibrary, fallbackFontFiles[i].c_str(), 0, &fallbackFontFace);
    if (error) {
      std::cout << "Error loading fallback font " << FALLBACK_FONT_NAME << ".\n";
    } else {
      fallbackFontFaces.push_back(fallbackFontFace);
    }
  }

  FT_Face ftFace;
  error = FT_New_Face(ftLibrary, inFileName.c_str(), fontIdx, &ftFace);
  if (error) {
    std::cout << "Error loading font " << fontIdx << " from font file " << inFileName << ".\n";
    return -1;
  }

  if (faceIdx >= 0) {
    for (int i = 0; i < static_cast<int>(fallbackFontFaces.size()); ++i) {
      FT_Select_Size(fallbackFontFaces[i], 0); // cannot specify a face index for fallback fonts
    }
    error = FT_Select_Size(ftFace, faceIdx);
    if (error) {
      std::cout << "Error selecting face " << faceIdx << " from font file " << inFileName << ".\n";
      return -1;
    }
  } else {
    if (!FT_IS_SCALABLE(ftFace)) {
      std::cout << "Failed to set pixel size. Font is not scalable.\n";
      return -1;
    }
    if (pixelSize > 0) {
      for (int i = 0; i < static_cast<int>(fallbackFontFaces.size()); ++i) {
        FT_Set_Pixel_Sizes(fallbackFontFaces[i], pixelSize, pixelSize);
      }
      error = FT_Set_Pixel_Sizes(ftFace, pixelSize, pixelSize);
    } else {
      for (int i = 0; i < static_cast<int>(fallbackFontFaces.size()); ++i) {
        FT_Set_Pixel_Sizes(fallbackFontFaces[i], pixelSize, pixelSize);
      }
      error = FT_Set_Char_Size(ftFace, 0, charSize * 72, 0, 72);
    }
    if (error) {
      if ((ftFace->face_flags & FT_FACE_FLAG_FIXED_SIZES) != 0 &&
          (ftFace->face_flags & FT_FACE_FLAG_SCALABLE) == 0) {
        std::cout << "Font is bitmap-only. Use -faceIdx to select a size. Available sizes are:\n";
        for (int i = 0; i < ftFace->num_fixed_sizes; ++i) {
          FT_Bitmap_Size& size = ftFace->available_sizes[i];
          std::cout << "Index: " << i << ", size: " << size.size << ", width: " << size.width
                    << ", height: " << size.height << "\n";
        }
        std::cout << "Failed to set " << (pixelSize > 0 ? "pixelSize" : "charSize")
                  << (pixelSize > 0 ? pixelSize : charSize) << ".\n";
        return -1;
      }
    }
  }

  // determine the font height in scaled space
  int oldFontHeight = (ftFace->size->metrics.ascender - ftFace->size->metrics.descender) >> 6;
  oldFontHeight = oldFontHeight;
  int fontHeight = (ftFace->size->metrics.height) >> 6;

  std::cout << "Loaded font file " << inFileName << ".\n";

  // calculate the number of glyphs and build a flat list of all glyphs
  for (int i = 0; i < static_cast<int>(unicodeRanges.size()); ++i) {
    UnicodeRange const& r = unicodeRanges[i];
    for (uint32_t charCode = r.StartCode; charCode <= r.EndCode; ++charCode) {
      // don't add duplicate glyphs
      int j = 0;
      for (; j < static_cast<int>(glyphToUnicodeMap.size()); ++j) {
        if (glyphToUnicodeMap[j] == charCode) {
          break;
        }
      }
      if (j >= glyphToUnicodeMap.size()) {
        glyphToUnicodeMap.push_back(charCode);
      }
    }
  }

  if (asciiErrors.size() > 0) {
    std::cout << glyphToUnicodeMap.size() << " unique glyphs were found.\n";
    std::cout << "Non-ASCII characters were detected. Writing errors to '" << asciiErrorFile
              << "'.\n";
    FILE* outf = fopen(asciiErrorFile.c_str(), "wb");
    if (outf == NULL) {
      std::cout << "Error could not open file '" << asciiErrorFile << ".\n";
      return -1;
    }
    char msg[128];
    snprintf(msg, sizeof(msg), "%lu Non-ASCII characters found: ", nonAsciiChars.size());
    fwrite(msg, strlen(msg), 1, outf);
    nonAsciiChars.append(1, '\n');
    fwrite(nonAsciiChars.c_str(), nonAsciiChars.size(), 1, outf);
    fwrite(asciiErrors.c_str(), asciiErrors.size(), 1, outf);
    fclose(outf);
    return -1;
  }

  std::sort(glyphToUnicodeMap.begin(), glyphToUnicodeMap.end());

  {
    // output all of the characters to a UTF-8 file
    char buffer[1024];
    sprintf(
        buffer,
        "Unicode code points for '%s':\nTotal code points: %i\n",
        outFileName.c_str(),
        static_cast<int>(glyphToUnicodeMap.size()));
    std::string allCodepointsStr(buffer);
    for (size_t i = 0; i < glyphToUnicodeMap.size(); ++i) {
      sprintf(buffer, "%d: ", glyphToUnicodeMap[i]);
      std::string temp(buffer);
      temp.append(1, glyphToUnicodeMap[i]);
      temp.append(1, '\n');
      allCodepointsStr += temp;
    }

    std::string path;
    path += std::string(outFileName) + "_allcodepoints.txt";

    FILE* outf = fopen(path.c_str(), "wb");
    if (outf == NULL) {
      std::cout << "Error could not open file '" << path << ".\n";
      return -1;
    }
    fwrite(allCodepointsStr.c_str(), allCodepointsStr.size(), 1, outf);
    fclose(outf);
  }

  int32_t const numGlyphs = static_cast<int>(glyphToUnicodeMap.size());
  std::cout << "Rendering " << glyphToUnicodeMap.size() << " glyphs.\n";

  // render the glyphs to individual bitmaps
  int64_t totalArea = 0;
  int32_t numUndefined = 0;
  int32_t emptyChars = 0;
  std::vector<CGlyph*> glyphs;
  glyphs.resize(numGlyphs); // some glyphs may not be assigned, depending
  int32_t highest = -1;
  for (int32_t i = 0; i < static_cast<int32_t>(glyphToUnicodeMap.size()); ++i) {
    FT_ULong const realCharCode = static_cast<FT_ULong>(glyphToUnicodeMap[i]);
    glyphs[i] = new CGlyph(realCharCode);
    CGlyph& g = *(glyphs[i]);

    // if this glyph is remapped to render as something else, do that now
    uint32_t charCode = realCharCode;
    for (int j = 0; j < static_cast<int>(characterRemaps.size()); ++j) {
      charRemap_t const& remap = characterRemaps[j];
      if (remap.first == charCode) {
        charCode = remap.second;
        std::cout << "Remapping code " << realCharCode << " to render as " << charCode << "\n";
        break;
      }
    }

    FT_Face face = ftFace;
    FT_UInt glyphIdx = FT_Get_Char_Index(ftFace, charCode);
    if (glyphIdx == 0) {
      for (int f = 0; f < static_cast<int>(fallbackFontFaces.size()); ++f) {
        glyphIdx = FT_Get_Char_Index(fallbackFontFaces[f], charCode);
        if (glyphIdx > 0) {
          //					std::cout << "No glyph for character code " << charCode << ", using
          //fallback "
          //							  << fallbackFontFiles[ f ].c_str() << "\n";
          face = fallbackFontFaces[f];
          break;
        }
      }
    }
    if (glyphIdx == 0) {
      // this is very common for character codes < 32 and > 127
      if ((charCode >= 32 && charCode <= 127) || charCode > 255) {
        if (numUndefined < 10) {
          std::cout << "Undefined character code " << charCode << ".\n";
        } else if (numUndefined == 10) {
          std::cout << "Multiple undefined characters were found.\n";
        }
        numUndefined++;
      }
      continue;
    }
    const int32_t loadFlags = FT_LOAD_DEFAULT;
    error = FT_Load_Glyph(face, glyphIdx, loadFlags);
    if (error) {
      std::cout << "Error loading glyph for character code " << charCode << ".\n";
      continue;
    }

    if (face->glyph == NULL) {
      continue;
    }
    if (face->glyph->format != FT_GLYPH_FORMAT_BITMAP) {
      error = FT_Render_Glyph(face->glyph, FT_RENDER_MODE_NORMAL);
      if (error) {
        std::cout << "Failed to render glyph for character code " << charCode << ".\n";
        continue;
      }
    }

    FT_Bitmap& ftBitmap = face->glyph->bitmap;
    FT_Glyph_Metrics& ftMetrics = face->glyph->metrics;

    if (face->glyph->metrics.height > highest) {
      highest = face->glyph->metrics.height;
    }

    g.Width = ftBitmap.width + hpad;
    g.Height = ftBitmap.rows + vpad;
    // shifts are for 26.6 fixed point, so we're just truncating the fractional part
    // int extraHPad = ( hpad >> 1 ) - ( ftMetrics.horiBearingX >> 6 );
    // int extraVPad = ( vpad >> 1 ) - ( ftMetrics.horiBearingY >> 6 );
    g.AdvanceX = (ftMetrics.horiAdvance >> 6); // + extraHPad;
    g.AdvanceY = (ftMetrics.vertAdvance >> 6); // + extraVPad;
    g.BearingX = (ftMetrics.horiBearingX >> 6) - (hpad >> 1);
    g.BearingY = (ftMetrics.horiBearingY >> 6) + (vpad >> 1);

    if (ftBitmap.width == 0 || ftBitmap.rows == 0) {
      if (charCode > ' ') {
        std::cout << "Character " << charCode << " has zero area!\n";
        emptyChars++;
      }
      continue;
    }

    totalArea += g.Width * g.Height;

    if (ftBitmap.pixel_mode == FT_PIXEL_MODE_GRAY) {
      if (ftBitmap.num_grays != 256) {
        std::cout << "Wrong bitmap format (!256 grays) for glyph character code " << charCode
                  << ".\n";
        continue;
      }

      g.Bitmap = CBitmap::Create(g.Width, g.Height, 4, true);

      // copy from rendered glyph to the bitmap
      uint8_t* buffer = static_cast<uint8_t*>(ftBitmap.buffer);

      for (int y = 0; y < ftBitmap.rows; ++y) {
        for (int x = 0; x < ftBitmap.width; ++x) {
          uint8_t gray = buffer[y * ftBitmap.pitch + x];
          uint8_t alpha = alphaValue < 0 ? gray : static_cast<uint8_t>(alphaValue);
          g.Bitmap->SetPixelRGBA(x + (hpad >> 1), y + (vpad >> 1), gray, gray, gray, alpha);
        }
      }
      if (grid) {
        uint8_t alpha = alphaValue < 0 ? 255 : static_cast<uint8_t>(alphaValue);
        // put a grid around each char
        for (int y = 0; y < ftBitmap.rows; ++y) {
          int py = y + (vpad >> 1);
          if (y == 0 || y == ftBitmap.rows - 1) {
            // set entire row
            for (int x = 0; x < ftBitmap.width; ++x) {
              int px = x + (hpad >> 1);
              g.Bitmap->SetPixelRGBA(px, py, 255, 255, 255, alpha);
            }
          } else {
            // set first and last
            int px = (hpad >> 1);
            g.Bitmap->SetPixelRGBA(px, py, 255, 255, 255, alpha);
            px = (ftBitmap.width - 1) + (hpad >> 1);
            g.Bitmap->SetPixelRGBA(px, py, 255, 255, 255, alpha);
          }
        }
      }
      // for debugging individual glyphs -- RAW format can be loaded with IrfanView + plugins.
      if (raw && charCode == 'a') {
        char glyphName[MAX_PATH];
        sprintf(glyphName, "glyph_%u.png", charCode);
        g.Bitmap->WritePNG(glyphName);
      }
    } else {
      std::cout << "Unsupported bitmap format for glyph character code " << charCode << ".\n";
      continue;
    }
  }

  highest >>= 6;

  if (numUndefined > 0) {
    std::cout << numUndefined << " undefined characters were found.\n";
  }

  if (emptyChars > 0) {
    std::cout << emptyChars << " were empty (no glyph data to render).\n";
  }

  if (totalArea == 0) {
    std::cout << "No glyphs were rendered.\n";
    return -1;
  }
  std::cout << "No glyphs were rendered.\n";

  std::sort(glyphs.begin(), glyphs.end(), CGlyph::SortByHeightThenWidth);

  // split a square up into separate rectangles for each glyph. If we run out of space before
  // all glyphs are assigned to a sub rectangle, then increase the smallest dimension x or y
  // to the next power of two and try again.
  std::vector<CRectangle*> usedRects;
  const int32_t MAX_TEXTURE_DIM = 65536 / 2;

  // get the square root of the area, then find the next power of two larger than the square root
  // and use that as our starting side dimensions
  int32_t sqRoot = (int32_t)sqrtf((float)totalArea + 1.f);
  int32_t nextPowerOfTwoFromSqRoot = NextPowerOfTwo(sqRoot);
  int32_t sidex = nextPowerOfTwoFromSqRoot >> 1;
  int32_t sidey = nextPowerOfTwoFromSqRoot >> 1;
  if (sidex == 0) {
    sidex = 1;
  }
  if (sidey == 0) {
    sidey = sidex;
  }
  if (sidex > MAX_TEXTURE_DIM || sidey > MAX_TEXTURE_DIM) {
    std::cout << "Aborting. The glyphs could not be packed into the max texture size of "
              << MAX_TEXTURE_DIM << "x" << MAX_TEXTURE_DIM << ".\n";
    return 1;
  }

  std::cout << totalArea << " " << sidex << " " << sidey << "\n";
  while (!PlaceGlyphs(glyphs, sidex, sidey, usedRects)) {
    std::cout << sidex << " " << sidey << "\n";
    // increase the shorter side and try again
    if (sidex <= sidey) {
      sidex <<= 1;
    } else {
      sidey <<= 1;
    }

    if (sidex > MAX_TEXTURE_DIM || sidey > MAX_TEXTURE_DIM) {
      std::cout << "Aborting. The glyphs could not be packed into the max texture size of "
                << MAX_TEXTURE_DIM << "x" << MAX_TEXTURE_DIM << ".\n";
      return 1;
    }
  }

  // render each glyph rectangle into its place in the final bitmap
  CBitmap* fontBitmap = CBitmap::Create(sidex, sidey, 4, true);
  std::cout << "Rendering to " << sidex << "x" << sidey << " bitmap... ";
  int32_t maxY = 0;
  for (int i = 0; i < usedRects.size(); ++i) {
    CRectangle const* r = usedRects[i];
    CGlyph& g = *(glyphs[r->GetGlyphIndex()]);
    g.X = r->GetX();
    g.Y = r->GetY();
    assert(g.X >= 0 && g.Y >= 0);
    assert(g.X + g.Width <= sidex);
    assert(g.Y + g.Height <= sidey);
    if (g.Bitmap != NULL) // glyph may have no bitmap if it is a space
    {
      g.Bitmap->CopyInto(*fontBitmap, g.X, g.Y);
    }
    if (g.Y + g.Height > maxY) {
      maxY = g.Y + g.Height;
    }
    delete r;
    usedRects[i] = NULL;
  }

  // make sure that the maxY includes vertical padding so that we don't have a bottom row with
  // no distance falloff at the edge.
  maxY = OVR::Clamp(maxY + (vpad >> 1), 0, fontBitmap->Height);

  std::cout << "done.\n";

  usedRects.resize(0);

  // output the glyph image as a TGA and the glyph info as a JSON file
  // write out the bitmap as a .tga
  std::cout << "Writing " << fontBitmap->Width << "x" << fontBitmap->Height << " image file '"
            << outFileName << "'...\n";

  time_t sdfStart;
  time(&sdfStart);

  double scale = 1.0f;
  std::string sdfFileName = std::string(outFileName) + std::string("_sdf");

  if (signedDistanceField) {
    if (targetHeight == -1) {
      targetHeight = sidex / 8;
      targetWidth = sidex / 8;
    }
    if (targetHeight == 0) {
      targetHeight = maxY;
      targetWidth = sidex;
    }

    // convert the bitmap to a signed distane field representation
    int32_t actualHeight = ftoi(targetHeight * ((float)maxY / (float)sidex));
    CBitmap* sdfBitmap = CBitmap::Create(targetWidth, actualHeight, 4, true);

    scale = (float)targetWidth / (float)sidex;
    double const invScale = (float)sidex / (float)targetWidth;
    double const halfPixelInSource = invScale * 0.5f;

    std::cout << "Generating " << targetWidth << "x" << actualHeight
              << " signed distance field... ";

    CBitmap::CalcRadialWalkTable(256);
    for (int32_t y = 0; y < sdfBitmap->Height; ++y) {
      printf("row %i of %i\n", y, sdfBitmap->Height);

      // calculate distances in the corresponding row in the font bitmap
      int32_t fr = dtoi((invScale * y) + halfPixelInSource);
      for (int32_t x = 0; x < sdfBitmap->Width; ++x) {
        // calculate the corresponding column in the font bitmap
        int32_t fc = dtoi((invScale * x) + halfPixelInSource);
        float distance = fontBitmap->CalcDistance(fc, fr);
        assert(distance >= -1.0f && distance <= 1.0f);
        float s;
        if (distance < 0.0f) {
          distance *= 128.0f + 128;
        } else {
          distance *= 127.0f + 128;
        }
        s = ClampFloat(distance + 128.0f, 0.0f, 255.0f);
        uint8_t b = 255 - (uint8_t)s;
        sdfBitmap->SetPixelRGBA(
            x, y, b, b, b, alphaValue < 0 ? b : static_cast<uint8_t>(alphaValue));
      }
    }

    std::cout << "done.            \n"; // extra spaces are intentional to clear previous output

    std::cout << "Writing " << targetWidth << "x" << actualHeight << " image file '" << sdfFileName
              << "'...\n";
    std::string ktxPath = sdfFileName + ".png";
    sdfBitmap->WritePNG(ktxPath.c_str());

    delete sdfBitmap;
  }

  time_t sdfEnd;
  time(&sdfEnd);
  std::cout << "Sampling took " << (sdfEnd - sdfStart) << " seconds.\n";

  delete fontBitmap;
  fontBitmap = NULL;

  // output the glyph data as JSON
  std::string fontFileName = std::string(outFileName) + std::string(".fnt");

  JSON* joFont = JSON::CreateObject();
  joFont->AddStringItem("FontName", fontFileName.c_str());
  std::string commandLine;
  for (int i = 1; i < argc; ++i) {
    commandLine += argv[i];
    if (i < argc - 1) {
      commandLine += " ";
    }
  }

  for (auto it = glyphs.begin(); it != glyphs.end();) {
    CGlyph* g = *it;
    if (g->Height == 0) {
      it = glyphs.erase(it);
    } else {
      it++;
    }
  }

  joFont->AddStringItem("CommandLine", commandLine.c_str());
  joFont->AddNumberItem("Version", FNT_FILE_VERSION);
  joFont->AddNumberItem("NaturalWidth", sidex);
  joFont->AddNumberItem("NaturalHeight", maxY);
  joFont->AddNumberItem("HorizontalPad", hpad);
  joFont->AddNumberItem("VerticalPad", vpad);
  joFont->AddNumberItem("FontHeight", fontHeight);
  joFont->AddNumberItem("CenterOffset", centerOffset);
  joFont->AddNumberItem("TweakScale", tweakScale);
  joFont->AddNumberItem("EdgeWidth", edgeWidth);
  joFont->AddNumberItem("NumGlyphs", static_cast<int32_t>(glyphs.size()));
  JSON* joGlyphsArray = JSON::CreateArray();
  joFont->AddItem("Glyphs", joGlyphsArray);
  // add all glyphs
  for (int i = 0; i < glyphs.size(); ++i) {
    CGlyph const& g = *(glyphs[i]);
    JSON* joGlyph = JSON::CreateObject();
    joGlyph->AddNumberItem("CharCode", g.CharCode);
    joGlyph->AddNumberItem(
        "X", g.X); // now in natural units because the JSON writer loses precision
    joGlyph->AddNumberItem(
        "Y", g.Y); // now in natural units because the JSON writer loses precision
    joGlyph->AddNumberItem("Width", g.Width);
    joGlyph->AddNumberItem("Height", g.Height);
    joGlyph->AddNumberItem("AdvanceX", g.AdvanceX);
    joGlyph->AddNumberItem("AdvanceY", g.AdvanceY);
    joGlyph->AddNumberItem("BearingX", g.BearingX);
    joGlyph->AddNumberItem("BearingY", g.BearingY);
    joGlyphsArray->AddArrayElement(joGlyph);
  }

  std::cout << "Writing font file '" << fontFileName << "'...\n";
  joFont->Save(fontFileName.c_str());

  return 0;
}

static void PrintTitle() {
  std::cout << "Fontue version 0.0\n";
  std::cout << "by Jonathan E. Wright\n";
  std::cout << "Copyright (C) 2014 by Oculus VR, LLC.\n\n";
  std::cout << "Portions of this software are copyright (C) 1996-2014 The FreeType\n";
  std::cout << "Project (www.freetype.org).  All rights reserved.\n\n";
}

static void PrintUsage() {
  std::cout << "Fontue takes a TrueType font as input and uses the FreeType library to\n";
  std::cout << "create a bitmapped or signed distance field font image and glyph file that\n";
  std::cout << "can be used to render a variable-spaced bitmap font in high-performance\n";
  std::cout << "applications.\n\n";
  std::cout << "USAGE: fontue <in font file> <out font file > [[-option], ... ]\n";
  std::cout << "The output file name will be used to output both the font info (.fnt) and the\n";
  std::cout << "image file (.tga), so no extension is necessary.\n";
  std::cout << "Options:\n";
  std::cout << "-hpad <n> : horizontal pad around each glyph\n";
  std::cout << "-vpad <n> : vertical pad around each glyph\n";
  std::cout << "-pixelSize <n> : pixel size of the font.\n";
  std::cout << "-idx <n> : index of the font to load from the input font file.\n";
  std::cout << "-faceIdx <n> : index of the font face to use from the input font file.\n";
  std::cout << "-sdf <pixelSize> <targetWidth> <targetHeight>: output the bitmap as a signed "
               "distance field.\n";
  std::cout
      << "-ur <n1> <n2> : specify a range of unicode character codes to render, from n1 to n2.\n";
  std::cout << "-uc <n> : specify a single unicode character code to render.\n";
  std::cout
      << "-charFile <file name> : specify a UTF8 file that contains character codes to render.\n";
  std::cout << "-verifyAscii <out file>: verifies that all characters are within ASCII range "
               "(i.e. < 256) must come before ALL -cf commands!\n";
  std::cout << "-cf <file name> : shortcut for charFile.\n";
  std::cout << "-co <f> : floating point number specifying and offset for the 'center' of the "
               "distance range.\n";
  std::cout << "-ts <f> : floating point number indicating tweak scale.\n";
}

} // namespace OVR

int main(int const argc, char const* argv[]) {
  OVR::PrintTitle();

  if (argc == 1) {
    OVR::PrintUsage();
    return 0;
  }

  FT_Library ftLibrary;
  FT_Error error = FT_Init_FreeType(&ftLibrary);
  if (error) {
    std::cout << "An error occurred while initializing the FreeType library!\n";
    return -1;
  }

  int rc = OVR::CreateBitmapFont(argc, argv, ftLibrary);

  FT_Done_FreeType(ftLibrary);

  if (rc == 0) {
    std::cout << "Success.\n";
  } else {
    std::cout << "Failed.\n";
  }

  return rc;
}
