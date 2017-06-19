const db = require('../db');
module.exports = db.defineModel('Teacher-Course', {
    teacherId: db.STRING(10),
    courseNumber: db.STRING(10),
    grade1: {
        type:db.INTEGER,
        allowNull: true
    },
    grade2:{
        type:db.INTEGER,
        allowNull: true
    },
    grade3: {
        type:db.INTEGER,
        allowNull: true
    }
});