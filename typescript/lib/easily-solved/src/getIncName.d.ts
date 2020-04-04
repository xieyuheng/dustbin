export interface TreeNode {
    id: string;
    type: string;
    name: string;
    children?: Array<TreeNode>;
}
export declare function leastComplementNumber(numbers: Array<number>): number;
export declare function getIncName(name: string, node: TreeNode): string;
