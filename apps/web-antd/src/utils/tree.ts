export interface TreeNode {
  key: number;
  id: number;
  name: string;
  label: string;
  parent_id: number;
  children?: TreeNode[];
}

/**
 * 基于数组构建树形结构
 * @param data
 */
export function buildTree(data: TreeNode[]): TreeNode[] {
  const map = new Map<number, TreeNode>();
  const roots: TreeNode[] = [];

  data.forEach((node) => {
    map.set(node.id, { ...node, children: [] });
  });

  data.forEach((node) => {
    if (node.parent_id === 0) {
      roots.push(<TreeNode>map.get(node.id));
    } else {
      const parent = map.get(node.parent_id);
      if (parent) {
        parent.children?.push(<TreeNode>map.get(node.id));
      }
    }
  });

  return roots;
}
