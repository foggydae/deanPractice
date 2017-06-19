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
let settleGrade = async (ctx, next) => {
    await next();
    let sId = ctx.request.body.studentId,
        cNumber = ctx.request.body.courseNumber,
        grade1 = ctx.request.grade1,
        grade2 = ctx.request.grade2,
        grade3 = ctx.request.grade3;
    await Student_Course.update(
        {
            grade1: grade1,
            grade2: grade2,
            grade3: grade3
        },
        {
            where:{
                studentId: sId,
                courseNumber: cNumber
            }
        }
    ).then(res=>{
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
let  queryTeacherCourse = async (ctx, next) => {
    await next();
    let tId = ctx.request.query.teacherId;
    await Teacher_Course.findAll({
        where:{
            teacherId: tId
        }
    }).then(res => {
        ctx.body = {
            code: 200,
            content: res
        };
    })
};
let editCourse = async (ctx, next) => {
    await next();
    let id = ctx.request.body.id,
        tId = ctx.request.body.teacherId,
        cNumber = ctx.request.body.courseNumber,
        grade1 = ctx.request.body.grade1, 
        grade2 = ctx.request.body.grade2, 
        grade3 = ctx.request.body.grade3;
    await Teacher_Course.update(
        {
            grade1: grade1,
            grade2: grade2,
            grade3: grade3
        },
        {
            where:{
                id: id,
                teacherId: tId,
                courseNumber: cNumber
            }
        }
    ).then(res=>{
        ctx.body = {
            code: 200
        };
    }).catch(err=>{
        ctx.body = {
            code: 500,
            content: err
        };
    })
};
let getCourseStudent = async(ctx, next) => {
    await next();
    let cNumber = ctx.request.query.courseNumber;
    await Student_Course.findAll({
        where:{
            courseNumber: cNumber
        }
    }).then(res=>{
        ctx.body = {
            code : 200,
            content: res
        };
    })
};

module.exports = {
    "POST /addCourse"  : addCourse,
    "GET /queryCourse" : queryCourse,

    "POST /claimCourse"       : claimCourse,
    "GET /getCourseStudent"   : getCourseStudent,
    "POST /editCourse"        : editCourse,
    "GET /queryTeacherCourse" : queryTeacherCourse,
    "POST /settleGrade"       : settleGrade
};