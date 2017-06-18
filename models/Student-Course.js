const db = require('../db');
module.exports = db.defineModel('Student-Course', {
    studentId: db.STRING(10),
    courseNumber: db.STRING(10),
    grade1: db.INTEGER,
    grade2: db.INTEGER,
    grade3: db.INTEGER,
    grade: db.INTEGER,
});