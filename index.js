const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

const controller = require('./controller');
app.use(controller());
app.listen(2333);
console.log('app statred at port 2333...');
