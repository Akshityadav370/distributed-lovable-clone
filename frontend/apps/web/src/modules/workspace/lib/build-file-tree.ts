import type { TreeNode } from '../workspace.types';

/**
 * FileTreeDto from workspace-service is a flat list of path strings
 * (e.g. "src/components/Navbar.tsx") -- there is no nested structure
 * on the wire. This folds that flat list into a tree, directories first,
 * alphabetically sorted within each level.
 */
export function buildFileTree(paths: string[]): TreeNode[] {
  const root: TreeNode[] = [];
  const dirIndex = new Map<string, TreeNode>();

  const sortedPaths = [...paths].sort();

  for (const fullPath of sortedPaths) {
    const segments = fullPath.split('/');
    let currentLevel = root;
    let currentPath = '';

    segments.forEach((segment, i) => {
      const isLastSegment = i === segments.length - 1;
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      if (isLastSegment) {
        currentLevel.push({ path: currentPath, name: segment, type: 'file', depth: i, children: [] });
        return;
      }

      let dirNode = dirIndex.get(currentPath);
      if (!dirNode) {
        dirNode = { path: currentPath, name: segment, type: 'folder', depth: i, children: [] };
        dirIndex.set(currentPath, dirNode);
        currentLevel.push(dirNode);
      }
      currentLevel = dirNode.children;
    });
  }

  const sortLevel = (nodes: TreeNode[]): TreeNode[] =>
    [...nodes]
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .map((n) => ({ ...n, children: sortLevel(n.children) }));

  return sortLevel(root);
}
