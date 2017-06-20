const User = global.model.User;
var loginController = async (ctx, next) => {
    console.log(ctx.request.body);
	var id = ctx.request.body.id || '',
		passwd = ctx.request.body.passwd || '';
    await User.findOne({
        where:{
            userId: id,
            passwd: passwd
        },
        raw: true
    }).then(res => {
        console.log(res);
        if(res.userId === id)
        {
            ctx.session.id = id;
            ctx.session.userState = res.rol;
		    ctx.body = {code:200,content:res.rol};
        }
    })

};
module.exports = {
	"POST /login" : loginController
}
