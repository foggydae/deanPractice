var userState = async (ctx, next) => {
    var state = ctx.session.userState;
	console.log(state);
    if (state === 'admin' ||
        state === 'teacher' ||
        state === 'student')
    {
        ctx.body = {code:200, content:{state:state}};
    }
    else
    {
        ctx.body = {code:200, content:{state:'logout'}};
    }
};
var testState = async (ctx, next) => {
	console.log(ctx.session);
    var state = ctx.request.body.state;
	console.log(state);
    ctx.session.state = state;
	console.log(ctx.session);
    ctx.body = {code:200};
}


module.exports = {
    "GET /userState": userState,
    "POST /userState": testState
};
