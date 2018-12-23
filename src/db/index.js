/**
 * 关于数据库的所有操作{对于分类、用户……的增删改查都放在这里来}
 * 增
 * 删
 * 改
 * 查
 */

// 引用mongodb模块
const mongodb = require('mongodb');
// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/h51809';
// 连接数据库
function connect(collectionName){
    return new Promise((resolve,reject)=>{

        MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
            if(err){
                reject(err);
                return;
            }

            // 使用数据库
            let db = client.db('h51809');

            // 使用集合
            let col = db.collection(collectionName);

            resolve({col,client});
        });
    })
}
//百度查找解决useNewUrlParser 警告解决办法
// module.exports = {
//     getDB: function (callback) {
//         MongoClient.connect(url, {useNewUrlParser:true},  function (err, db) {
//             callback(db)   
//         })
//     }
// }
// 查一
// db.findOne('admin_inf',{name:username,password});
exports.findOne = (collectionName,query)=>{
    return new Promise(async(resolve,reject)=>{

        let {col,client} = await connect(collectionName);

        // 查询所有分类
        col.findOne(query,(err,result)=>{
            if(err){
                reject({
                    code:0,
                    msg:'fail'
                });
            }else{

                resolve({
                    code:1,
                    msg:'success'
                });
            }


            // 关闭数据库，避免资源浪费
            client.close();
        });
    
    });
}

// 查多
exports.find = (collectionName,query)=>{
    return new Promise(async(resolve,reject)=>{

        let {col,client} = await connect(collectionName);

        // 查询所有分类
        col.findOne(query).toArray((err,result)=>{
            if(err){
                reject({
                    code:0,
                    msg:'fail',
                    data:err
                });
            }else{

                resolve({
                    code:1,
                    msg:'success',
                    data:result
                });
            }


            // 关闭数据库，避免资源浪费
            client.close();
        });
    
    });
}

// 增
exports.insert = (collectionName,data)=>{
    return new Promise(async(resolve,reject)=>{

        let {col,client} = await connect(collectionName);


        // 插入所有分类
        col[Array.isArray(data) ? 'insertMany':'insertOne'](data,(err,result)=>{
            if(err){
                reject({
                    code:0,
                    msg:'fail',
                    data:err
                });
            }else{

                resolve({
                    code:1,
                    msg:'success',
                    data:result
                });
            }


            // 关闭数据库，避免资源浪费
            client.close();
        });
    
    });
}

// 删
exports.delete = (collectionName,query)=>{
    return new Promise(async(resolve,reject)=>{

        let {col,client} = await connect(collectionName);


        // 查询所有分类
        col[Array.isArray(query) ? 'deleteMany':'deleteOne'](query,(err,result)=>{
            if(err){
                reject({
                    code:0,
                    msg:'fail',
                    data:err
                });
            }else{

                resolve({
                    code:1,
                    msg:'success',
                    data:result
                });
            }


            // 关闭数据库，避免资源浪费
            client.close();
        });
    
    });
}

// 改
exports.update = (collectionName,query,data)=>{
    return new Promise(async(resolve,reject)=>{

        let {col,client} = await connect(collectionName);

        // if(query._id){
        //     query = {_id:query._id}
        // }

        // 更新所有分类
        col[Array.isArray(query) ? 'updateMany':'updateOne'](query,{$set:data},(err,result)=>{
            if(err){
                reject({
                    code:0,
                    msg:'fail',
                    data:err
                });
            }else{

                resolve({
                    code:1,
                    msg:'success',
                    data:result
                });
            }


            // 关闭数据库，避免资源浪费
            client.close();
        });
    
    });
}