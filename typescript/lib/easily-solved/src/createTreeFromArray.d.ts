export interface File {
    id: string;
    isDir: boolean;
    name: string;
    parentId?: string;
    content: string;
}
export interface TreeNode {
    id: string;
    name: string;
    children?: Array<TreeNode>;
    content: string;
}
export declare function createTreeFromArray(files: Array<File>): TreeNode;
export declare function createTreeFromArrayWithParent(parent: File, files: Array<File>): TreeNode;
