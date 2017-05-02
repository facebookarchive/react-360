/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as THREE from 'three';
import {RayCaster} from 'ovrui';

const LEFT_ORIGIN = [-0.3, -0.5, -0.3];
const RIGHT_ORIGIN = [0.3, -0.5, -0.3];

const blueButtonColor = new THREE.Color('#2b87ca');
const yellowButtonColor = new THREE.Color('#ede81f');
/**
 * Create the gradient material for the beam emitting from the controller
 */
function createFadeMaterial() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 32;
  const cx = canvas.getContext('2d');
  const gradient = cx.createLinearGradient(0, 0, 1024, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cx.fillStyle = gradient;
  cx.fillRect(0, 0, 1024, 32);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  const fadeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  return fadeMaterial;
}

/**
 * ThreeDOFRayCaster implements a laser pointer-like input device for any
 * gamepad input with a pose.
 */
export default class ThreeDOFRayCaster extends RayCaster {
  constructor(scene) {
    super();

    this._scene = scene;

    this._active = true;
    this._gamepadIndex = -1;

    this._createController();
    // Preallocate THREE objects
    this._vector = new THREE.Vector3();
    this._controllerQuaternion = new THREE.Quaternion();
    this._cameraQuaternion = new THREE.Quaternion();

    const initialGamepads = navigator.getGamepads();
    let i = 0;
    while (i < initialGamepads.length && this._gamepadIndex < 0) {
      const gamepad = initialGamepads[i];
      if (gamepad && gamepad.pose) {
        this._setUpGamepad(gamepad);
      }
      i++;
    }

    window.addEventListener('gamepadconnected', (e) => {
      if (this._gamepadIndex < 0 && e.gamepad.pose) {
        this._setUpGamepad(e.gamepad);
      }
    });
    window.addEventListener('gamepaddisconnected', (e) => {
      if (this._gamepadIndex === e.gamepad.index) {
        this._scene.remove(this._mesh);
        this._gamepadIndex = -1;
        this._active = false;
      }
    });
  }

  _getGamepad() {
    const gamepads = navigator.getGamepads();
    return gamepads[this._gamepadIndex];
  }

  _setUpGamepad(gamepad) {
    this._gamepadIndex = gamepad.index;
    this._scene.add(this._mesh);
    this._active = true;
    if (gamepad.hand === 'left') {
      this._origin = LEFT_ORIGIN;
      this._mesh.position.set(LEFT_ORIGIN[0], LEFT_ORIGIN[1], LEFT_ORIGIN[2]);
    } else {
      this._origin = RIGHT_ORIGIN;
      this._mesh.position.set(RIGHT_ORIGIN[0], RIGHT_ORIGIN[1], RIGHT_ORIGIN[2]);
    }
  }

  _createController() {
    if (this._mesh) {
      return;
    }
    const beamGeom = new THREE.Geometry();
    beamGeom.vertices.push(
      new THREE.Vector3(-0.01, 0.01, 0),
      new THREE.Vector3(0.01, 0.01, 0),
      new THREE.Vector3(0.01, 0.01, -1),
      new THREE.Vector3(-0.01, 0.01, -1),

      new THREE.Vector3(-0.01, -0.01, 0),
      new THREE.Vector3(0.01, -0.01, 0),
      new THREE.Vector3(0.01, -0.01, -1),
      new THREE.Vector3(-0.01, -0.01, -1),
    );
    beamGeom.faces.push(
      new THREE.Face3(0, 1, 3),
      new THREE.Face3(1, 2, 3),
      new THREE.Face3(1, 5, 2),
      new THREE.Face3(5, 6, 2),
      new THREE.Face3(5, 4, 6),
      new THREE.Face3(4, 7, 6),
      new THREE.Face3(4, 0, 7),
      new THREE.Face3(0, 3, 7),
    );
    const uvs = [
      new THREE.Vector2(0, 1),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
    ];
    beamGeom.faceVertexUvs[0][0] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][1] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][2] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][3] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][4] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][5] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][6] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][7] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.verticesNeedUpdate = true;
    beamGeom.elementsNeedUpdate = true;
    const beam = new THREE.Mesh(
      beamGeom,
      createFadeMaterial()
    );

    const wand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.03, 0.2, 16),
      new THREE.MeshBasicMaterial({color: '#000000'})
    );
    wand.rotation.x = -Math.PI / 2;
    wand.position.z = 0.1;
    const button = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.01, 16),
      new THREE.MeshBasicMaterial({color: blueButtonColor})
    );
    button.position.y = 0.025;
    button.position.z = 0.04;
    this._controllerButton = button;

    const controller = new THREE.Object3D();
    controller.add(beam);
    controller.add(wand);
    controller.add(button);
    this._mesh = controller;
    window.mesh = this._mesh;
  }

  // Begin RayCaster implementation details
  getType() {
    return '3dof';
  }

  /**
   * Each frame, update the rendered controller in VR space to match the latest
   * orientation data from the gamepad.
   */
  frame() {
    if (!this._active) {
      return;
    }
    const gamepad = this._getGamepad();
    if (gamepad && gamepad.pose && gamepad.pose.orientation) {
      const orientation = gamepad.pose.orientation;
      this._mesh.quaternion.set(orientation[0], orientation[1], orientation[2], orientation[3]);
      if (gamepad.buttons[0] && typeof gamepad.buttons[0] === 'object') {
        if (gamepad.buttons[0].pressed) {
          this._controllerButton.position.y = 0.02;
          this._controllerButton.material.color = yellowButtonColor;
        } else {
          this._controllerButton.position.y = 0.025;
          this._controllerButton.material.color = blueButtonColor;
        }
      }
    }
  }

  /**
   * Return an array containing the x,y,z coordinates of the controller, which
   * is used as the starting point for casting the ray.
   */
  getRayOrigin() {
    if (!this._active) {
      return null;
    }
    return this._origin;
  }

  /**
   * Return an array containing the vector components of the controller's
   * current orientation, which is used as the direction of the ray.
   * Since the controller rotation is not relative to the camera, we multiply
   * by the inverse of the camera's quaternion.
   */
  getRayDirection(camera) {
    if (!this._active || this._gamepadIndex < 0) {
      return null;
    }
    const gamepad = this._getGamepad();
    if (gamepad && gamepad.pose && gamepad.pose.orientation) {
      // Rotate <0, 0, -1> by the controller pose quaternion
      this._vector.set(0, 0, -1);
      const orientation = gamepad.pose.orientation;
      this._controllerQuaternion.set(orientation[0], orientation[1], orientation[2], orientation[3]);
      this._cameraQuaternion.copy(camera.quaternion);
      this._cameraQuaternion.inverse();

      this._vector.applyQuaternion(this._controllerQuaternion);
      this._vector.applyQuaternion(this._cameraQuaternion);
      return [this._vector.x, this._vector.y, this._vector.z];
    }
  }

  drawsCursor() {
    return true;
  }
}
