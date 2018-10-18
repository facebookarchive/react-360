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

import * as Elements from './Elements';
import applyProps from './applyProps';

const NO_CONTEXT = {};
const UPDATE_SIGNAL = {};

// Core properties
export function getPublicInstance(instance) {
  return instance;
}

export function getRootHostContext() {
  return NO_CONTEXT;
}

export function getChildHostContext() {
  return NO_CONTEXT;
}

export function prepareForCommit(containerInfo) {
  // no-op
}

export function resetAfterCommit() {
  // no-op
}

export function createInstance(
  type,
  props,
  rootContainerInstance,
  hostContext,
  internalInstanceHandle
) {
  // create view from type
  const element = Elements[type];
  const view = element.create(rootContainerInstance);
  applyProps(view, null, props);
  return view;
}

export function appendInitialChild(parentInstance, child) {
  const index = parentInstance.getChildCount();
  parentInstance.addChild(index, child);
}

export function finalizeInitialChildren(
  parentInstance,
  type,
  props,
  rootContainerInstance,
  hostContext
) {
  return false;
}

export function prepareUpdate(
  instance,
  type,
  oldProps,
  newProps,
  rootContainerInstance,
  hostContext
) {
  return UPDATE_SIGNAL;
}

export function shouldSetTextContent(type, props) {
  return typeof props.children === 'string' || typeof props.children === 'number';
}

export function shouldDeprioritizeSubtree(type, props) {
  return false;
}

export function createTextInstance() {
  throw new Error('not implemented');
}

export const scheduleTimeout = setTimeout;
export const cancelTimeout = clearTimeout;
export const noTimeout = -1;
export const now = Date.now;
export const isPrimaryRenderer = true;
export const supportsMutation = true;
export const supportsPersistence = false;
export const supportsHydration = false;

// Mutation

export function appendChild(parentInstance, child) {
  throw new Error('not implemented');
}

export function appendChildToContainer(parentInstance, child) {
  parentInstance.append(child);
}

export function commitTextUpdate(textInstance, oldText, newText) {
  throw new Error('not implemented');
}

export function commitMount(instance, type, newProps) {
  // no-op
}

export function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
  applyProps(instance, oldProps, newProps);
}

export function insertBefore(parentInstance, child, beforeChild) {
  throw new Error('not implemented');
}

export function insertInContainerBefore(parentInstance, child, beforeChild) {
  throw new Error('not implemented');
}

export function removeChild(parentInstance, child) {
  throw new Error('not implemented');
}

export function removeChildFromContainer(parentInstance, child) {
  throw new Error('not implemented');
}

export function resetTextContent(instance) {
  // set instance text to ''
  throw new Error('not implemented');
}
