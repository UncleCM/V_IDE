Library           RequestsLibrary

${TEACHER_API}    http://example.com/api/teacher-answer/1
${STUDENT_API}    http://example.com/api/student-output/1

${teacher}        Get Request    ${TEACHER_API}
${student}        Get Request    ${STUDENT_API}

Should Be Equal    ${teacher.json()}    ${student.json()}
