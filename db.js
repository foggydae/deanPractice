const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('./config');

function generateId(){
    return uuid.v4();
}

var sequelize = new Sequelize(config.database,
                              config.username,
                              config.password,{
                                  host: config.host,
                                  dialect: config.dialect,
                                  pool: {
                                      max: 5,
                                      min: 0,
                                      idle: 1000
                                  }
                              });
const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for( let key in attributes ) {
        let value = attributes[key];
        if (typeof value ===  'object' && value['type'])
        {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }
        else
        {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableNmae: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if(obj.isNewRecord) {
                    if(!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else {
                    obj.updatedAt = now;
                    obj.version ++;
                }
            }
        }
    });

}

const TYPES = ['STRING', "INTEGER","BIGINT","TEXT", "DOUBLE", "DATEONLY", "BOOLEAN"];
var exp = {
    defineModel: defineModel,
    sync: () => {
        if( process.env.NODE_ENV !== 'production'){
            return sequelize.sync({force:true});
        }
        else{
            throw new Error('canoot sync() when node_env is set to "production"');
        }
    }
};
for( let type of TYPES ) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;
// exp.sequelize = sequelize;

module.exports = exp;

