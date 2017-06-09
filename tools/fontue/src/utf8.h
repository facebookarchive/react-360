#pragma once

uint32_t DecodeNextChar_Advance0(const char** putf8Buffer) {
  uint32_t uc;
  char c;

// Security considerations:
//
// Changed, this is now only the case for DecodeNextChar:
//  - If we hit a zero byte, we want to return 0 without stepping
//    the buffer pointer past the 0. th
//
// If we hit an "overlong sequence"; i.e. a character encoded
// in a longer multibyte string than is necessary, then we
// need to discard the character.  This is so attackers can't
// disguise dangerous characters or character sequences --
// there is only one valid encoding for each character.
//
// If we decode characters { 0xD800 .. 0xDFFF } or { 0xFFFE,
// 0xFFFF } then we ignore them; they are not valid in UTF-8.

// This isn't actually an invalid character; it's a valid char that
// looks like an inverted question mark.
#define INVALID_CHAR 0x0FFFD

#define FIRST_BYTE(mask, shift) uc = (c & (mask)) << (shift);

#define NEXT_BYTE(shift)                          \
  c = **putf8Buffer;                              \
  if (c == 0)                                     \
    return 0; /* end of buffer, do not advance */ \
  if ((c & 0xC0) != 0x80)                         \
    return INVALID_CHAR; /* standard check */     \
  (*putf8Buffer)++;                               \
  uc |= (c & 0x3F) << shift;

  c = **putf8Buffer;
  (*putf8Buffer)++;
  if (c == 0)
    return 0; // End of buffer.

  if ((c & 0x80) == 0)
    return (uint32_t)c; // Conventional 7-bit ASCII.

  // Multi-byte sequences.
  if ((c & 0xE0) == 0xC0) {
    // Two-byte sequence.
    FIRST_BYTE(0x1F, 6);
    NEXT_BYTE(0);
    if (uc < 0x80)
      return INVALID_CHAR; // overlong
    return uc;
  } else if ((c & 0xF0) == 0xE0) {
    // Three-byte sequence.
    FIRST_BYTE(0x0F, 12);
    NEXT_BYTE(6);
    NEXT_BYTE(0);
    if (uc < 0x800)
      return INVALID_CHAR; // overlong
    // Not valid ISO 10646, but Flash requires these to work
    // see AS3 test e15_5_3_2_3 for String.fromCharCode().charCodeAt(0)
    // if (uc >= 0x0D800 && uc <= 0x0DFFF) return INVALID_CHAR;
    // if (uc == 0x0FFFE || uc == 0x0FFFF) return INVALID_CHAR; // not valid ISO 10646
    return uc;
  } else if ((c & 0xF8) == 0xF0) {
    // Four-byte sequence.
    FIRST_BYTE(0x07, 18);
    NEXT_BYTE(12);
    NEXT_BYTE(6);
    NEXT_BYTE(0);
    if (uc < 0x010000)
      return INVALID_CHAR; // overlong
    return uc;
  } else if ((c & 0xFC) == 0xF8) {
    // Five-byte sequence.
    FIRST_BYTE(0x03, 24);
    NEXT_BYTE(18);
    NEXT_BYTE(12);
    NEXT_BYTE(6);
    NEXT_BYTE(0);
    if (uc < 0x0200000)
      return INVALID_CHAR; // overlong
    return uc;
  } else if ((c & 0xFE) == 0xFC) {
    // Six-byte sequence.
    FIRST_BYTE(0x01, 30);
    NEXT_BYTE(24);
    NEXT_BYTE(18);
    NEXT_BYTE(12);
    NEXT_BYTE(6);
    NEXT_BYTE(0);
    if (uc < 0x04000000)
      return INVALID_CHAR; // overlong
    return uc;
  } else {
    // Invalid.
    return INVALID_CHAR;
  }
}

uint32_t DecodeNextChar(const char** putf8Buffer) {
  uint32_t ch = DecodeNextChar_Advance0(putf8Buffer);
  if (ch == 0)
    (*putf8Buffer)--;
  return ch;
}
