//nodejs利用好模块化
//基于配置的开发环境

const express = require('express');

// 引入配置文件
const {port,host,rootPath} = require('./config');

// 引入路由文件目录
const Router = require('./router');

let app = express();

// 利用中间件实现静态资源服务器
app.use(express.static(rootPath));


/**/
// 路由(所有的路径都能进到这个路由)
app.use(Router);

// 下面的意思是 只有以api开头的路径才能进入以下路由
// app.use('/api',Router)

app.listen(port,()=>{
    console.log(`server is running on http://${host}:${port}`);
})
