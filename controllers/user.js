const User = global.model.User;
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
    ctx.session.userState = state;
    console.log(ctx.session);
    ctx.body = {code:200};
};

var addPerson = async (ctx, next) =>{
    await next();
    await User.create({
        name: ctx.request.body.name,
        userId: ctx.request.body.id,
        gender: ctx.request.body.gender,
        rol: ctx.request.body.role,
        passwd: '666666'
    }).then(res => {
        ctx.body = {
            code: 200
        };
    }).
        catch ((err)=>{
            ctx.body = {code: 400};
        });
};
var queryPersons = async (ctx, next) => {
    await next();
    let uId = ctx.request.query.id;
    if(uId !== undefined)
    {
        await User.findAll({
            where:{
                userId: uId
            }
        }).then(res => {
            ctx.body = {
                code: 200,
                content: res
            };
        });
    }
    else
    {
        await User.findAll().then(res => {
            ctx.body = {
                code: 200,
                content: res
            };
        });
    }
}



module.exports = {
    "GET /userState"   : userState,
    "POST /userState"  : testState,
    "POST /addPerson"  : addPerson,
    "GET /queryPerson" : queryPersons
};
