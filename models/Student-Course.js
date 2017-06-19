const db = require('../db');
module.exports = db.defineModel('Student-Course', {
    studentId: db.STRING(10),
    courseNumber: db.STRING(10),
    grade1: {
        type:db.DOUBLE,
        allowNull: true
    },
    grade2:{
        type:db.DOUBLE,
        allowNull: true
    },
    grade3:{
        type:db.DOUBLE,
        allowNull: true
    },
    grade: {
        type:db.DOUBLE,
        allowNull: true
    }
});