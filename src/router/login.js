const express = require('express');
let Router = express.Router();

// const mongodb = require('mongodb');
// // 获取Mongo客户端
// const MongoClient = mongodb.MongoClient;

//引入自定义的数据库所有操作模块
const db = require('../db');

const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });


// 路由
// 登录
Router.post('/',urlencodedParser,async(req,res)=>{
    let {username,password} = req.body;

    // 处理password为数字的情况
    password = isNaN(password) ? password : password*1;

    console.log(username,password);
    console.log({username,password});

    // 查询是否存在数据
    let data;
    try{
        // user.findOne('admin_inf',{name:username,password});
        data = await db.findOne('admin_inf',{name:username,password});
    }catch(err){
        data = err;
    }
        console.log(data);
     res.send(data);

     //
     
    
});
module.exports = Router;