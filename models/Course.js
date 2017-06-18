const db = require('../db');

module.exports = db.defineModel('Course', {
    number: {
        type: db.STRING(10),
        unique: true
    },
    name: db.STRING(100),
    information: db.TEXT
});