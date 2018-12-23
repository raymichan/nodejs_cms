//把路由封装成模块
const express = require('express');

// 引入单独路由模块
const loginRouter = require('./login');
// const goodslistRouter = require('./goods_list');
// const categoryRouter = require('./category');
// const userRouter = require('./user');
// const ordersRouter = require('./orders');
// const uploadRouter = require('./upload')

//express里面厉害的方法Router()，通过它可以把路由分散开来
let Router = express.Router();

Router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});


//用Router.get('/home',(req.res)=>{})取代app.get('/home',(req.res)=>{})
// 关于登录的路由
Router.use('/login',loginRouter);

// 关于商品列表的路由
// Router.use('/goodslist',goodslistRouter);

// 关于商品分类的路由
// Router.use('/category',categoryRouter);

// 关于用户列表的路由
// Router.use('/user',userRouter);

// 关于订单表的路由
// Router.use('/orders',ordersRoute);

// 上传
// Router.use('/upload',uploadRouter)

//把Router暴露出去
module.exports = Router;