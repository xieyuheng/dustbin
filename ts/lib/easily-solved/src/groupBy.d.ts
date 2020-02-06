export declare function getGrade(score: number): string;
export interface Student {
    name: string;
    score: number;
}
export declare function groupBy(students: Array<Student>): {
    [key: string]: Array<Student>;
};
