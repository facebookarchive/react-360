declare class VRDisplay extends EventTarget {
  isConnected: boolean,
  isPresenting: boolean,
  capabilities: VRDisplayCapabilities,
  stageParameters: null | VRStageParameters,
  getEyeParameters(VREye): VREyeParameters,
  displayId: number,
  displayName: string,
  getFrameData(VRFrameData): boolean,
  getPose(): VRPose,
  resetPose(): void,
  depthNear: number,
  depthFar: number,
  requestAnimationFrame(cb: (number) => void): number,
  cancelAnimationFrame(number): void,
  requestPresent(VRLayerInit[]): Promise<void>,
  exitPresent(): Promise<void>,
  getLayers(): VRLayerInit[],
  submitFrame(): void,
}

type VRSource = HTMLCanvasElement;

type VRLayerInit = {
  source?: null | VRSource,
  leftBounds?: number[],
  rightBounds?: number[],
};

type VRDisplayCapabilities = {
  hasPosition: boolean,
  hasOrientation: boolean,
  hasExternalDisplay: boolean,
  canPresent: boolean,
  maxLayers: number,
};

type VREye = 'left' | 'right';

type VRFieldOfView = {
  upDegrees: number,
  rightDegrees: number,
  downDegrees: number,
  leftDegrees: number,
};

type VRPose = {
  position?: Float32Array,
  linearVelocity?: Float32Array,
  linearAcceleration?: Float32Array,
  orientation?: Float32Array,
  angularVelocity?: Float32Array,
  angularAcceleration?: Float32Array,
};

declare class VRFrameData {
  timestamp: number,
  leftProjectionMatrix: Float32Array,
  leftViewMatrix: Float32Array,
  rightProjectionMatrix: Float32Array,
  rightViewMatrix: Float32Array,
  pose: VRPose,
}

type VREyeParameters = {
  offset: Float32Array,
  fieldOfView: VRFieldOfView,
  renderWidth: number,
  renderHeight: number,
};

type VRStageParameters = {
  sittingToStandingTransform: Float32Array,
  sizeX: number,
  sizeZ: number,
};

type VRDisplayEventReason = 'mounted' | 'navigation' | 'requested' | 'unmounted';

type VRDisplayEventInit = {
  display: VRDisplay,
  reason: VRDisplayEventReason,
};

declare class VRDisplayEvent extends Event {
  display: VRDisplay,
  reason?: VRDisplayEventReason,

  constructor(string, VRDisplayEventInit): VRDisplayEvent,
}
