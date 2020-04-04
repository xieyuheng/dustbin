"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGrade(score) {
    if (score < 60) {
        return "C";
    }
    else if (score < 80) {
        return "B";
    }
    else {
        return "A";
    }
}
exports.getGrade = getGrade;
function groupBy(students) {
    let group = {};
    for (let student of students) {
        let grade = getGrade(student.score);
        if (grade in group) {
            group[grade] = group[grade].concat([student]);
        }
        else {
            group[grade] = [student];
        }
    }
    return group;
}
exports.groupBy = groupBy;
