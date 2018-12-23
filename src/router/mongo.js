//封装连接mongodb客户端模块
const mongodb = require('mongodb');
//获取Mongo客户端
const MongoClient = mongodb.MongoClient;

function mongo(callback){
    MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true},(err, database)=>{
        if(err) throw err;
        let db = database.db('jyh');
        
        callback(db);

        database.close();
    });
}

module.exports = mongo;