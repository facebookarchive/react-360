declare module 'three' {
  declare var ClampToEdgeWrapping: any;
  declare var DefaultLoadingManager: any;
  declare var FlatShading: number;
  declare var LinearFilter: number;
  declare var RepeatWrapping: any;
  declare var SmoothShading: number;
  declare var VertexColors: number;
  declare var NoColors: number;
  declare var NormalBlending: number;
  declare var FrontSide: number;
  declare var SrcAlphaFactor: number;
  declare var OneMinusSrcAlphaFactor: number;
  declare var AddEquation: number;
  declare var LessEqualDepth: number;

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
    constructor($TypedArray, number): BufferAttribute,
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
    constructor(number, number): PlaneBufferGeometry,
  }

  declare class SphereBufferGeometry extends BufferGeometry {
    constructor(number, number, number): SphereBufferGeometry,
  }

  declare class Camera extends Object3D {
    fov: number,
    aspect: number,

    constructor(): Camera,

    localToWorld(Vector3): Vector3,
    updateProjectionMatrix(): this,
  }

  declare class Color {
    constructor(): this,
    constructor(number, number, number): this,
    setHex(number): void,
    set(number): void,
  }

  declare class Euler {
    x: number,
    y: number,
    z: number,
    constructor(number, number, number, ?string): this,
    copy(e: Euler): this,
    set(number, number, number, string): this,
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
    setValues(any): void,
  }

  declare class Matrix4 {
    decompose(Vector3, Quaternion, Vector3): this,
    fromArray(Array<number>): void,
    getInverse(matrix: Matrix4): Matrix4,
  }

  declare class Mesh extends Object3D {
    material: Material | Array<Material>,
    name: string,

    constructor(geom: Geometry, material: Material | Array<Material>): Mesh,
  }

  declare class MeshBasicMaterial extends Material {
    constructor(?{color: number | string}): MeshBasicMaterial,
  }

  declare class MeshLambertMaterial extends Material {
    constructor(?{color: number | string}): MeshLambertMaterial,
  }

  declare class MeshPhongMaterial extends Material {
    constructor(?{color: number | string}): MeshPhongMaterial,
  }

  declare class MultiMaterial extends Material {
    constructor(multi: Array<any>): MultiMaterial,
  }

  declare class Ray {
    copy(ray: Ray): Ray,
    applyMatrix4(matrix: Matrix4): void,
    intersectSphere(sphere: Sphere, intersectionPoint: Vector3) : Vector3;
  }

  declare class Sphere {
    constructor(center: Vector3, radius: number): Sphere,
  }

  declare class ShaderMaterial extends Material {
    constructor(): ShaderMaterial,
    uniforms: any,
  }

  declare class Object3D {
    children: Array<Object3D>,
    matrixAutoUpdate: boolean,
    matrix: Matrix4,
    matrixWorld: Matrix4,
    position: Vector3,
    quaternion: Quaternion,
    rotation: Euler,
    uuid: string,

    constructor(): Object3D,
    add(obj: Object3D): void,
    remove(obj: Object3D): void,
    updateMatrixWorld(flag?: boolean): void,
  }

  declare class Quaternion {
    x: number,
    y: number,
    z: number,
    w: number,
    constructor(number, number, number, number): Quaternion,
    clone(): Quaternion,
    fromArray(Array<number> | Float32Array): this,
    multiply(Quaternion): this,
    premultiply(Quaternion): this,
    setFromEuler(Euler): this,
  }

  declare class Scene extends Object3D {
    autoUpdate: boolean,
    background: Color | Texture | null,
    backgroundLeft: Color | Texture | null,
    backgroundRight: Color | Texture | null,
    constructor(): Scene,
  }

  declare class Texture {
    generateMipmaps: boolean,
    image: Image | HTMLCanvasElement,
    wrapS: number,
    wrapT: number,
    minFilter: number,
    magFilter: number,
    needsUpdate: boolean,
    repeat: Vector2,

    constructor(HTMLCanvasElement | HTMLVideoElement | Image): this,

    dispose(): void,
  }

  declare class TextureLoader {
    constructor(loader: any): TextureLoader,
    load(
      path: string,
      onLoad?: (Texture) => mixed,
      onProgress?: (number) => mixed,
      onError?: (any) => mixed
    ): any,
    setCrossOrigin(origin: 'anonymous' | 'use-credentials'): void,
  }

  declare class Vector2 {
    constructor(x: number, y: number): Vector2,
    set(x: number, y: number): void,
  }

  declare class Vector3 {
    x: number,
    y: number,
    z: number,
    applyMatrix4(matrix: Matrix4): void,
    clone(): Vector3,
    constructor(): this,
    constructor(x: number, y: number, z: number): this,
    copy(v: Vector3): this,
    applyEuler(e: Euler): this,
    applyQuaternion(Quaternion): this,
    fromArray(arr: [number, number, number] | Float32Array): this,
    normalize(): this,
    set(number, number, number): this,
    sub(v: Vector3): this,
  }

  declare class Vector4 {
    constructor(): this,
    constructor(x: number, y: number, z: number, w: number): this,
    fromArray(arr: [number, number, number, number] | Float32Array): this,
    copy(v: Vector4): this,
  }

  declare class WebGLRenderer {
    domElement: Element,
    localClippingEnabled: boolean,
    sortObjects: boolean,
    constructor(): this,
    getClearAlpha(): number,
    getClearColor(): Color,
    getSize(): {width: number, height: number},
    render(Scene, Camera, ?any, ?boolean): this,
    setClearColor(number | string | Color, ?number): this,
    setPixelRatio(number): this,
    setRenderTarget(e: ?Element): this,
    setSize(number, number, ?boolean): this,
  }

  declare class AmbientLight {
    intensity: number,
    color: Color,
  }

  declare class AnimationMixer {
    constructor(Scene): this,
    clipAction(clip: any): any,
  }

}
