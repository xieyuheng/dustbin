export interface TreeNode {
    id: string;
    label: string;
    children?: Array<TreeNode>;
}
export declare function findNodeById(node: TreeNode, id: string): TreeNode | null;
