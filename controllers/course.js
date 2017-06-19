const Course = global.model.Course;
var addCourse = async (ctx, next) => {
    await next();
    await Course.create({
        number: ctx.request.body.id,
        name: ctx.request.body.name,
        information: ctx.request.body.information
    }).then(res => {
        ctx.body = {
            code: 200
        };
    }).catch(err => {
        ctx.body = {
            code: 400,
            content: err
        };
    });
};
var queryCourse = async (ctx, next) => {
    await next();
    let cNumber = ctx.request.query.number;
    if(cNumber !== undefined)
    {
        await Course.findAll({
            where:{
                number: cNumber
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
        await Course.findAll()
            .then(res=>{
                ctx.body = {
                    code: 200,
                    content:res
                };
            });
    }
};

module.exports = {
    "POST /addCourse"  : addCourse,
    "GET /queryCourse" : queryCourse
};