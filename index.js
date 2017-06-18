const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const router = require('koa-router')();
const app = new Koa();

global.model = require('./model');
app.use(bodyParser());
const controller = require('./controller');
app.use(controller());
app.listen(2333);
console.log('app statred at port 2333...');
