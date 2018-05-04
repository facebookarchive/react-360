declare interface SceneGraphNode {
  children: SceneGraphNode[];
  parent: ?SceneGraphNode;

  add(...nodes: SceneGraphNode[]): mixed;
  remove(...nodes: SceneGraphNode[]): mixed;
}
