var loginController = async (ctx, next) => {
    console.log(ctx.request.body);
	var id = ctx.request.body.id || '',
		passwd = ctx.request.body.passwd || '';
		ctx.body = {code:200,body:"hello, login"};
}
module.exports = {
	"POST /login" : loginController
}
