var userState = async (ctx, next) => {
    var state = ctx.session.userState;
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
    var state = ctx.request.body.state;
    ctx.session.state = state;
}


module.exports = {
    "GET /userState": userState,
    "POST /testState": testState
};