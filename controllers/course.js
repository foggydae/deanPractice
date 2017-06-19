const Course = global.model.Course;
const Student = global.model.User;
const Teacher_Course = global.model['Teacher-Course'];
const Student_Course = global.model['Student-Course'];
const Sequelize = require('sequelize');
// const db = require('../db');

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
let chooseCourse = async (ctx, next) =>{
    await next();
    let sId = ctx.request.body.studentId,
        cNumber = ctx.request.body.courseNumber;
    await Student_Course.create({
        studentId: sId,
        courseNumber: cNumber
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
    
    Teacher_Course.belongsTo(Course,{foreignKey: 'courseNumber',targetKey: 'number'});
    await Teacher_Course.findAll({
        include:[{
            model: Course,
            where: {number: Sequelize.col('`Teacher-Course`.courseNumber')}
        }],
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

    Student_Course.belongsTo(Course,{foreignKey: 'courseNumber',targetKey: 'number'});
    Student_Course.belongsTo(Student,{foreignKey: 'studentId',targetKey: 'userId'});
    await Student_Course.findAll({
        include:[
            {
                model: Course,
                where: {number: Sequelize.col('`Student-Course`.courseNumber')}
            },
            {
                model: Student,
                where:{userId: Sequelize.col('`Student-Course`.studentId')
                      }
            }
            ],
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

let queryStudentCourse = async(ctx, next)=>{
    await next();
    let sId = ctx.request.query.studentId;
    console.log('quey');
    
    // await db.sequelize.query("select * from `Student-Courses`,Courses where `Student-Courses`.courseNumber = Courses.number and studentId = ?;",{replacements: [sId],type: Sequelize.QueryTypes.SELECT}).then(res=>{
    //     ctx.body = {
    //         code: 200,
    //         content: res
    //     };
    // });
    
    Student_Course.belongsTo(Course,{foreignKey: 'courseNumber',targetKey: 'number'});
    await Student_Course.findAll({
        include:[{
            model: Course,
            where: {number: Sequelize.col('`Student-Course`.courseNumber')}
        }],
        where: {
            studentId : sId
        }
    }).then(res => {
        ctx.body = {
            code: 200,
            content: res
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            content: err
        };
    });
};

module.exports = {
    "POST /addCourse"  : addCourse,
    "GET /queryCourse" : queryCourse,

    "POST /claimCourse"       : claimCourse,
    "GET /getCourseStudent"   : getCourseStudent,
    "POST /editCourse"        : editCourse,
    "GET /queryTeacherCourse" : queryTeacherCourse,
    "POST /settleGrade"       : settleGrade,
    "POST /chooseCourse"      : chooseCourse,
    "GET /queryStudentCourse" : queryStudentCourse
};