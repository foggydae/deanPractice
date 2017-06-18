const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
// const router = require('koa-router')();
const app = new Koa();

const session-config = require('./session');
app.use(session(session-config, app));
global.model = require('./model');
app.use(bodyParser());
const controller = require('./controller');
app.use(controller());
app.listen(2333);
console.log('app statred at port 2333...');
