declare module 'three' {
  declare var ClampToEdgeWrapping: any;
  declare var DefaultLoadingManager: any;
  declare var FlatShading: number;
  declare var LinearFilter: number;
  declare var RepeatWrapping: any;
  declare var SmoothShading: number;
  declare var VertexColors: number;
  declare var NoColors: number;

  declare class Box3 {
    max: Vector3,
    min: Vector3,

    constructor(): Box3,
    setFromObject(obj: any): void,
  }

  declare class BoxGeometry extends Geometry {
    constructor(number, number, number, number, number, number): BoxGeometry,
  }

  declare class BufferAttribute {
    constructor(): BufferAttribute,
  }

  declare class BufferGeometry extends Geometry {
    constructor(): BufferGeometry,
    addAttribute(name: string, attr: BufferAttribute): void,
    addGroup(start: number, length: number, index: number): void,
    computeVertexNormals(): void,
    setIndex(attr: BufferAttribute): void,
  }

  declare class BoxBufferGeometry extends BufferGeometry {
    constructor(number, number, number): BoxBufferGeometry,
  }

  declare class CylinderBufferGeometry extends BufferGeometry {
    constructor(number, number, number, number): CylinderBufferGeometry,
  }

  declare class PlaneBufferGeometry extends BufferGeometry {
    constructor(number, number): PlaneBufferGeometry;
  }

  declare class SphereBufferGeometry extends BufferGeometry {
    constructor(number, number, number): SphereBufferGeometry,
  }

  declare class Camera extends Object3D {
    constructor(): Camera,

    localToWorld(Vector3): Vector3,
  }

  declare class Color {
    constructor(): Color,
    setHex(number): void,
    set(number): void,
  }

  declare class Euler {
    copy(e: Euler): void,
  }

  declare class Geometry {}

  declare class Group extends Object3D {
    constructor(): Group,
    dispose(): void,
  }

  declare class Material {
    color: Color,
    map: ?Texture,
    needsUpdate: boolean,
    opacity: number,
    shading: number,
    transparent: boolean,
    url: string,
    wireframe: boolean,
    vertexColors: number,

    dispose(): void,
  }

  declare class Matrix4 {
    fromArray(arr: [number, number, number, number]): void,
  }

  declare class Mesh extends Object3D {
    material: Material,
    name: string,

    constructor(geom: Geometry, material: Material): Mesh,
  }

  declare class MeshBasicMaterial extends Material {
    constructor(): MeshBasicMaterial,
  }

  declare class MeshLambertMaterial extends Material {
    constructor(): MeshLambertMaterial,
  }

  declare class MeshPhongMaterial extends Material {
    constructor(): MeshPhongMaterial,
  }

  declare class MultiMaterial extends Material {
    constructor(multi: Array<any>): MultiMaterial,
  }

  declare class Object3D {
    children: Array<Object3D>,
    matrixAutoUpdate: boolean,
    matrix: Matrix4,
    uuid: string,

    constructor(): Object3D,
    add(obj: Object3D): void,
    remove(obj: Object3D): void,
    updateMatrixWorld(flag: boolean): void,
  }

  declare class Scene {
    constructor(): Scene,
  }

  declare class Texture {
    generateMipmaps: boolean,
    wrapS: number,
    wrapT: number,
    minFilter: number,
    magFilter: number,
    needsUpdate: boolean,

    dispose(): void,
  }

  declare class TextureLoader {
    constructor(loader: any): TextureLoader,
    load(path: string): any,
    setCrossOrigin(flag: boolean): void,
  }

  declare class Vector2 {
    constructor(x: number, y: number): Vector2,
  }

  declare class Vector3 {
    x: number,
    y: number,
    z: number,
    constructor(): this,
    constructor(x: number, y: number, z: number): this,
    fromArray(arr: [number, number, number]): this,
    copy(v: Vector3): this,
    applyEuler(e: Euler): this,
    normalize(): this,
    sub(v: Vector3): this,
  }

  declare class Vector4 {
    constructor(): this,
    constructor(x: number, y: number, z: number, w: number): this,
    fromArray(arr: [number, number, number, number]): this,
    copy(v: Vector4): this,
  }

  declare class AmbientLight {
    intensity: number,
    color: Color,
  }
}
