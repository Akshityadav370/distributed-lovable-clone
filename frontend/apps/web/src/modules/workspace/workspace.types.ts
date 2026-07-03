export interface FileNode {
  path: string;
}

export interface FileTreeDto {
  files: FileNode[];
}

export interface TreeNode {
  path: string;
  name: string;
  type: 'file' | 'folder';
  depth: number;
  children: TreeNode[];
}
