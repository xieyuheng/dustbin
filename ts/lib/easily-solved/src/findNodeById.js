"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findNodeById(node, id) {
    if (node.id === id) {
        return node;
    }
    else {
        if (node.children) {
            for (let child of node.children) {
                let found = findNodeById(child, id);
                if (found !== null) {
                    return found;
                }
            }
        }
        return null;
    }
}
exports.findNodeById = findNodeById;
