declare module 'ovrui' {
  declare type FontDims = {
    maxWidth: number,
    maxHeight: number,
    maxDescent: number,
    numLines: number,
    lineWidths: Array<number>,
  };

  declare class GuiSys {
    font: any,
    eventDispatcher: {
      addEventListener(event: string, handler: (UIViewEvent) => void): void,
    },

    constructor(): GuiSys,
    add(view: any): void,
    remove(view: any): void,
    requestFrameFunction(handler: (curTime: number) => void): number,
    cancelFrameFunction(uid: number): void,
    applyUpdates(camera: any, root: any): void,
    frameRenderUpdates(camera: any): void,
    frameInputEvents(camera: any, renderer: any): void,
    frame(camera: any, renderer: any): void,
    addCursor(): void,
    updateCursor(camera: any): void,
    setCursorEnabled(flag: boolean): void,
    setCursorVisibility(visibility: boolean): void,
    getOffscreenRenders(): any,
    registerOffscreenRender(scene: any, camera: any, renderTarget: any): number,
    unregisterOffscreenRender(uid: number): void,
    setMouseHitEnabled(flag: number): void,
    setMouseCursorInactiveStyle(style: string): void,
    setMouseCursorActiveStyle(style: string): void,
    setTouchHitEnabled(flag: number): void,
    setCursorVisibility(visibility: boolean): void,
    setCursorAutoDepth(flag: number): void,
    setCursorFixedDistance(distance: number): void,
    setRaycasters(raycasters: any): void,
    getLastLocalIntersect(): [number, number] | null,
  }

  declare class Player {
    camera: any,
    isMobile: boolean,
    renderer: any,

    frame(): void,
    render(scene: any): void,
    renderOffscreen(scene: any, camera: any, renderTarget: any): void,
    requestAnimationFrame(cb: (ms: number) => void): number,
  }

  declare class UIView {
    parent: ?UIView,
    visible: boolean,
    renderGroup: boolean,
    clippingEnabled: boolean,
    tag: number,
    children: Array<any>,
    owner: any,

    add(view: any): void,
    forceRaycastTest(value: boolean): void,
    remove(view: any): void,
    setBackgroundColor(value: number): void,
    setBillboarding(value: boolean): void,
    setBorderColor(value: number): void,
    setBorderWidth(widths: any): void,
    setBorderRadius(widths: ?Array<number>): void,
    setCursorVisibilitySlop(left: number, top: number, right: number, bottom: number): void,
    setImage(uri: string, cb: (loaded: boolean, width: number, height: number) => void): void,
    setImageColor(value: number): void,
    setImageTexture(value: any): void,
    setImmediateListener(listener: ?{eventType: any, callback: () => void}): void;
    setInset(value: Array<number>): void,
    setInsetSize(value: Array<number>): void,
    setIsInteractable(value: boolean): void,
    setIsMouseInteractable(value: boolean): void,
    setFrame(x: number, y: number, width: number, height: number, animator: any): void,
    setHitSlop(left: number, top: number, right: number, bottom: number): void,
    setLocalTransform(values: Array<number>): void,
    setOpacity(opacity: number): void,
    setPointerEvents(value: string): void,
    setResizeMode(value: string): void,
    setText(text: string): void,
    setTextureCrop(value: Array<number>): void,
    setTextSize(size: number): void,
    setTextAlphaCenter(value: number): void,
    setTextColorCenter(value: number): void,
    setTextHAlign(value: number): void,
    setTextVAlign(value: number): void,
  }

  declare class UIViewEvent {
    args: any,
    eventType: string,
    type: string,
    view: UIView,
  }

  declare function wrapLines(
    font: any,
    text: string,
    fontHeight: number,
    maxWidth: ?number,
    maxHeight: ?number,
    maxLines: ?number,
    hasPerPixelClip: ?boolean
  ): any;

  declare function measureText(font: any, text: string, fontHeight: number): FontDims;

  declare var GuiSysEventType: {
    HIT_CHANGED: 'HIT_CHANGED',
    INPUT_EVENT: 'INPUT_EVENT',
  };

  declare var UIViewEventType: {
    FOCUS_LOST: 'FOCUS_LOST',
    FOCUS_GAINED: 'FOCUS_GAINED',
  };

  declare var SDFFONT_MARKER_COLOR: number;
}
