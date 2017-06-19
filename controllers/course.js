const Course = global.model.Course;
const Teacher_Course = global.model['Teacher-Course'];
const Student_Course = global.model['Student-Course'];

let addCourse = async (ctx, next) => {
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
let queryCourse = async (ctx, next) => {
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

let claimCourse = async (ctx, next) => {
    await next();
    let tId = ctx.request.body.teacherId,
        cNumber = ctx.request.body.courseNumber;
    await Teacher_Course.create({
        teacherId: tId,
        courseNumber:cNumber
    }).then(res => {
        ctx.body = {
            code: 200
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            content: err
        };
    })
};

module.exports = {
    "POST /addCourse"  : addCourse,
    "GET /queryCourse" : queryCourse,

    "POST /claimCourse" : claimCourse
};