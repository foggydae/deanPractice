const db = require('../db');

module.exports = db.defineModel('User', {
    userId: {
        type: db.STRING(10),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN,
    rol: db.STRING(10)
});