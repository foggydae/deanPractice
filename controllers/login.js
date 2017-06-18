var loginController = async (ctx, next) => {
	var id = ctx.requrest.body.id || '',
		passwd = ctx.requrest.body.passwd || '';
	if(true)
	{
		return {code:200,body:"hello, login"};
	}
}
module.exports = {
	"POST /login" : loginController
}
