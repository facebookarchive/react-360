/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * MTLParser handles the parsing of Waveform MTL files.
 * It reads through the string contents of a MTL file and produces an array
 * of materials declared in the file. This can be consumed by external loaders
 * to create proper materials for any rendering engine.
 */
type Channels = Array<number>;
export type TextureOptions = {
  blendu: boolean,
  blendv: boolean,
  boost?: number,
  brightness: number,
  contrast: number,
  origin: [number, number, number],
  scale: [number, number, number],
  turbulence: [number, number, number],
  texRes?: string,
  clamp: boolean,
  bumpMultiplier?: number,
  imfchan?: 'r' | 'g' | 'b' | 'm' | 'l' | 'z',
  type?:
    | 'sphere'
    | 'cube_top'
    | 'cube_bottom'
    | 'cube_front'
    | 'cube_back'
    | 'cube_left'
    | 'cube_right',
};
export type Texture = {
  file: string,
  options: TextureOptions,
};
export type RawMTL = {
  name: string,
  ambient?: Channels,
  specular?: Channels,
  diffuse?: Channels,
  emissive?: Channels,
  opacity?: number,
  illum?: number,
  specularExp?: number,
  textureMap?: {
    ambient?: Texture,
    specular?: Texture,
    diffuse?: Texture,
    emissive?: Texture,
    specularExp?: Texture,
    bump?: Texture,
    displacement?: Texture,
    decal?: Texture,
  },
};
export type MTLParserState = Array<RawMTL>;

const CHANNELS_TEST = /^\s+([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)/;

/**
 * readChannels reads in a triplet of R/G/B values, ranging from 0 to 1.
 * It returns an array containing these values, and throws an error if they
 * cannot be parsed.
 */
export function readChannels(remainder: string, lineNumber: number): Array<number> {
  const match = remainder.match(CHANNELS_TEST);
  if (!match) {
    throw new Error('Expected a series of numbers on line ' + lineNumber);
  }
  const points = [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])];
  if (isNaN(points[0]) || isNaN(points[1]) || isNaN(points[2])) {
    throw new Error('Invalid number on line ' + lineNumber);
  }
  for (let i = 0; i < points.length; i++) {
    if (points[i] < 0) {
      points[i] = 0;
    } else if (points[i] > 1) {
      points[i] = 1;
    }
  }
  return points;
}

/**
 * readTextureOptions parses the flags that may be defined when a texture map
 * is declared. It skips any flags it does not recognize, so vendor-specific
 * extensions of the spec can be safely handled.
 * It returns an object containing the gathered parameters, providing
 * map-specific defaults where appropriate.
 */
export function readTextureOptions(remainder: string): Texture {
  const args = remainder.split(/\s+/);
  const options: TextureOptions = {
    blendu: true,
    blendv: true,
    brightness: 0,
    contrast: 1,
    origin: [0, 0, 0],
    scale: [1, 1, 1],
    turbulence: [0, 0, 0],
    clamp: false,
  };
  const file = args[args.length - 1];
  let index = 0;
  while (index < args.length - 1) {
    const opt = args[index];
    if (opt[0] !== '-') {
      index++;
      continue;
    }
    if (opt === '-blendu') {
      const flag = args[index + 1];
      if (flag === 'on') {
        options.blendu = true;
      } else if (flag === 'off') {
        options.blendu = false;
      }
      index += 2;
      continue;
    }
    if (opt === '-blendv') {
      const flag = args[index + 1];
      if (flag === 'on') {
        options.blendv = true;
      } else if (flag === 'off') {
        options.blendv = false;
      }
      index += 2;
      continue;
    }
    if (opt === '-boost') {
      const boost = parseFloat(args[index + 1]);
      if (!isNaN(boost)) {
        options.boost = boost;
      }
      index += 2;
      continue;
    }
    if (opt === '-mm') {
      const base = parseFloat(args[index + 1]);
      const gain = parseFloat(args[index + 2]);
      if (!isNaN(base) && !isNaN(gain)) {
        options.brightness = base;
        options.contrast = gain;
      }
      index += 3;
      continue;
    }
    // -o, -s, and -t may provide one, two, or three values
    if (opt === '-o') {
      index++;
      const u = parseFloat(args[index]);
      index++;
      if (isNaN(u)) {
        continue;
      }
      options.origin[0] = u;
      if (args[index][0] !== '-') {
        const v = parseFloat(args[index]);
        index++;
        if (isNaN(v)) {
          continue;
        }
        options.origin[1] = v;
        if (args[index][0] !== '-') {
          const w = parseFloat(args[index]);
          index++;
          if (isNaN(w)) {
            continue;
          }
          options.origin[2] = w;
        }
      }
      continue;
    }
    if (opt === '-s') {
      index++;
      const u = parseFloat(args[index]);
      index++;
      if (isNaN(u)) {
        continue;
      }
      options.scale[0] = u;
      if (args[index][0] !== '-') {
        const v = parseFloat(args[index]);
        index++;
        if (isNaN(v)) {
          continue;
        }
        options.scale[1] = v;
        if (args[index][0] !== '-') {
          const w = parseFloat(args[index]);
          index++;
          if (isNaN(w)) {
            continue;
          }
          options.scale[2] = w;
        }
      }
      continue;
    }
    if (opt === '-t') {
      index++;
      const u = parseFloat(args[index]);
      index++;
      if (isNaN(u)) {
        continue;
      }
      options.turbulence[0] = u;
      if (args[index][0] !== '-') {
        const v = parseFloat(args[index]);
        index++;
        if (isNaN(v)) {
          continue;
        }
        options.turbulence[1] = v;
        if (args[index][0] !== '-') {
          const w = parseFloat(args[index]);
          index++;
          if (isNaN(w)) {
            continue;
          }
          options.turbulence[2] = w;
        }
      }
      continue;
    }
    if (opt === '-texres') {
      const res = args[index + 1];
      options.texRes = res;
      index += 2;
      continue;
    }
    if (opt === '-clamp') {
      const flag = args[index + 1];
      if (flag === 'on') {
        options.clamp = true;
      } else if (flag === 'off') {
        options.clamp = false;
      }
      index += 2;
      continue;
    }
    if (opt === '-bm') {
      const mult = parseFloat(args[index + 1]);
      if (!isNaN(mult)) {
        options.bumpMultiplier = mult;
      }
      index += 2;
      continue;
    }
    if (opt === '-imfchan') {
      const chan = args[index + 1];
      if (
        // Explicit checks for flowtype safety
        chan === 'r' ||
        chan === 'g' ||
        chan === 'b' ||
        chan === 'm' ||
        chan === 'l' ||
        chan === 'z'
      ) {
        options.imfchan = chan;
      }
      index += 2;
      continue;
    }
    if (opt === '-type') {
      const type = args[index + 1];
      if (
        // Explicit checks for flowtype safety
        type === 'sphere' ||
        type === 'cube_top' ||
        type === 'cube_bottom' ||
        type === 'cube_front' ||
        type === 'cube_back' ||
        type === 'cube_left' ||
        type === 'cube_right'
      ) {
        options.type = type;
      }
      index += 2;
      continue;
    }
    // No match
    index++;
  }
  return {file, options};
}

/**
 * readLine parses a single line of a MTL file. It updates the state object
 * according to any supported declarations that are encountered on that line.
 */
export function readLine(state: MTLParserState, line: string, lineNumber: number) {
  let index = 0;
  const length = line.length;
  while ((index < length && line[index] === ' ') || line[index] === '\t') {
    index++;
  }
  if (index >= length) {
    return;
  }
  const first = line[index];
  if (first === '#') {
    return;
  }
  const latest = state[state.length - 1];
  if (first === 'K') {
    if (line[index + 1] === 'a') {
      const channels = readChannels(line.substr(index + 2), lineNumber);
      latest.ambient = channels;
      return;
    }
    if (line[index + 1] === 'd') {
      const channels = readChannels(line.substr(index + 2), lineNumber);
      latest.diffuse = channels;
      return;
    }
    if (line[index + 1] === 's') {
      const channels = readChannels(line.substr(index + 2), lineNumber);
      latest.specular = channels;
      return;
    }
    if (line[index + 1] === 'e') {
      const channels = readChannels(line.substr(index + 2), lineNumber);
      latest.emissive = channels;
    }
  }
  if (first === 'd') {
    if (line[index + 1] === ' ' || line[index + 1] === '\t') {
      let density = parseFloat(line.substr(index + 2).trim());
      if (isNaN(density)) {
        throw new Error('Density must be a number');
      }
      if (density < 0) {
        density = 0;
      } else if (density > 1) {
        density = 1;
      }
      latest.opacity = density;
      return;
    }
  }
  if (first === 'T') {
    if (line[index + 1] === 'r') {
      let transparency = parseFloat(line.substr(index + 2).trim());
      if (isNaN(transparency)) {
        throw new Error('Transparency must be a number');
      }
      if (transparency < 0) {
        transparency = 0;
      } else if (transparency > 1) {
        transparency = 1;
      }
      latest.opacity = 1 - transparency;
      return;
    }
  }
  if (first === 'N') {
    if (line[index + 1] === 's') {
      const specularExp = parseFloat(line.substr(index + 2).trim());
      if (isNaN(specularExp)) {
        throw new Error('Specular exponent must be a number');
      }
      latest.specularExp = specularExp;
      return;
    }
  }
  if (first === 'n') {
    if (line.substr(index, 6) === 'newmtl') {
      const mtl = line.substr(index + 7).trim();
      if (mtl.length < 1) {
        throw new Error('newmtl must provide a material name on line ' + lineNumber);
      }
      state.push({
        name: mtl,
      });
      return;
    }
    throw new Error('Unknown identifier: u');
  }
  if (first === 'i') {
    if (line.substr(index, 5) === 'illum') {
      const mode = parseInt(line.substr(index + 6).trim(), 10);
      if (isNaN(mode)) {
        throw new Error('Illumination mode must be a number on line ' + lineNumber);
      }
      latest.illum = mode;
    }
  }
  if (first === 'm') {
    const command = line.substr(index, 6).toLowerCase();
    if (command === 'map_ka') {
      const tex = readTextureOptions(line.substr(index + 6).trim());
      if (tex.file) {
        if (!latest.textureMap) {
          latest.textureMap = {};
        }
        latest.textureMap.ambient = tex;
      }
      return;
    }
    if (command === 'map_kd') {
      const tex = readTextureOptions(line.substr(index + 6).trim());
      if (tex.file) {
        if (!latest.textureMap) {
          latest.textureMap = {};
        }
        latest.textureMap.diffuse = tex;
      }
    }
    if (command === 'map_ks') {
      const tex = readTextureOptions(line.substr(index + 6).trim());
      if (tex.file) {
        if (!latest.textureMap) {
          latest.textureMap = {};
        }
        latest.textureMap.specular = tex;
      }
    }
    if (command === 'map_ns') {
      const tex = readTextureOptions(line.substr(index + 6).trim());
      if (tex.file) {
        if (!latest.textureMap) {
          latest.textureMap = {};
        }
        latest.textureMap.specularExp = tex;
      }
    }
  }
  if (line.substr(index, 8).toLowerCase() === 'map_bump') {
    const tex = readTextureOptions(line.substr(index + 8).trim());
    if (tex.file) {
      if (!latest.textureMap) {
        latest.textureMap = {};
      }
      if (!tex.options.imfchan) {
        tex.options.imfchan = 'l';
      }
      latest.textureMap.bump = tex;
    }
  }
  if (line.substr(index, 4).toLowerCase() === 'bump') {
    const tex = readTextureOptions(line.substr(index + 4).trim());
    if (tex.file) {
      if (!latest.textureMap) {
        latest.textureMap = {};
      }
      if (!tex.options.imfchan) {
        tex.options.imfchan = 'l';
      }
      latest.textureMap.bump = tex;
    }
  }
  if (line.substr(index, 4).toLowerCase() === 'disp') {
    const tex = readTextureOptions(line.substr(index + 4).trim());
    if (tex.file) {
      if (!latest.textureMap) {
        latest.textureMap = {};
      }
      latest.textureMap.displacement = tex;
    }
  }
  if (line.substr(index, 5).toLowerCase() === 'decal') {
    const tex = readTextureOptions(line.substr(index + 5).trim());
    if (tex.file) {
      if (!latest.textureMap) {
        latest.textureMap = {};
      }
      latest.textureMap.decal = tex;
    }
  }
}

/**
 * readMTLFile is the entry point for the MTLParser. It takes the text contents
 * of a MTL file and returns a Promise that is resolved with the intermediate
 * state extracted from that file.
 */
export function readMTLFile(data: string): Promise<MTLParserState> {
  const state = [];
  // Normalize linebreaks
  if (data.indexOf('\r\n') > -1) {
    data = data.replace('\r\n', '\n');
  }
  const lines = data.split('\n');
  const length = lines.length;
  let index = 0;
  return new Promise((resolve, reject) => {
    const chunk = function() {
      const start = Date.now();
      while (Date.now() - start < 16 && index < length) {
        try {
          readLine(state, lines[index], index + 1);
          index++;
        } catch (e) {
          reject(e);
        }
      }
      if (index >= length) {
        resolve(state);
      } else {
        // Schedule the next piece of work at the end of the event queue
        setTimeout(chunk, 0);
      }
    };
    chunk();
  });
}
