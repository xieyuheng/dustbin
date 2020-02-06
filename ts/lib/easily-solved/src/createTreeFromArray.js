"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createTreeFromArray(files) {
    for (let file of files) {
        if (file.parentId === undefined) {
            return createTreeFromArrayWithParent(file, files);
        }
    }
    throw new Error("no root");
}
exports.createTreeFromArray = createTreeFromArray;
function createTreeFromArrayWithParent(parent, files) {
    return parent.isDir
        ? {
            id: parent.id,
            name: parent.name,
            children: files
                .filter(file => file.parentId === parent.id)
                .map(file => createTreeFromArrayWithParent(file, files)),
            content: parent.content,
        }
        : {
            id: parent.id,
            name: parent.name,
            content: parent.content,
        };
}
exports.createTreeFromArrayWithParent = createTreeFromArrayWithParent;
