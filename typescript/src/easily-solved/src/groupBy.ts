export
function getGrade (score: number): string {
  if (score < 60) {
    return "C"
  } else if (score < 80) {
    return "B"
  } else {
    return "A"
  }
}

export
interface Student {
  name: string,
  score: number,
}

export
function groupBy (
  students: Array <Student>,
): { [key: string]: Array <Student> } {
  let group: { [key: string]: Array <Student> } = {}
  for (let student of students) {
    let grade = getGrade (student.score)
    if (grade in group) {
      group [grade] = group [grade] .concat ([ student ])
    } else {
      group [grade] = [ student ]
    }
  }
  return group
}
