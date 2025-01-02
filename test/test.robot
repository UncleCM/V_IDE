*** Settings ***
Library           SeleniumLibrary
Library           DatabaseLibrary

*** Variables ***
${DB_TYPE}            psycopg2
${DB_HOST}            localhost
${DB_PORT}            5432
${DB_NAME}            school_db
${DB_USER}            postgres
${DB_PASSWORD}        password
${QUERY_TEACHER}      SELECT answer FROM teacher_answers WHERE id=1
${QUERY_STUDENT}      SELECT output FROM student_outputs WHERE id=1

*** Test Cases ***
Compare Teacher And Student Answers From Database
    [Documentation]    Compare teacher's answer and student's output fetched from the database.
    
    # Connect to the database
    Connect To Database    ${DB_TYPE}    ${DB_HOST}:${DB_PORT}/${DB_NAME}    ${DB_USER}    ${DB_PASSWORD}
    
    # Execute queries
    ${teacher_answer}    Query    ${QUERY_TEACHER}
    ${student_output}    Query    ${QUERY_STUDENT}
    
    # Extract results (assuming single row return)
    ${teacher_text}      Set Variable    ${teacher_answer}[0][0]
    ${student_text}      Set Variable    ${student_output}[0][0]
    
    Log To Console       Teacher's Answer: ${teacher_text}
    Log To Console       Student's Output: ${student_text}
    
    # Compare the answers
    Should Be Equal      ${teacher_text}    ${student_text}
    
    # Disconnect from database
    Disconnect From Database