/*
    randomNumber(min,max)
    生成min到max之间的一个随机数
    参数一：最小值
    参数二：最大值
 */
function randomNumber(min, max) {        
	return parseInt(Math.random() * (max - min + 1)) + min;    
}

//-----------------------------------------
/*
    randomColor(str);
    说明：生成随机颜色
    参数：传参数16生成16进制颜色，传入参数'rgb'生成rgb颜色
*/
function randomColor(str) {     
	if(str == 16) {             //生成16进制的 '0123456789abcdef' #666677
		var str = '0123456789abcdef';            
		var color = '#';            
		for(var i = 0; i < 6; i++) {                
			color += str.charAt(parseInt(Math.random() * str.length));        
		}
		return color;            
	} else if(str == 'rgb') {             //rgb(255,255,0) 生成3个随机数，每个随机数应该在 0-255 
		var r = parseInt(Math.random() * 256);            
		var g = parseInt(Math.random() * 256);            
		var b = parseInt(Math.random() * 256);                
		return 'rgb(' + r + ',' + g + ',' + b + ')';            
	} else {            
		alert('参数传错了');        
	}    
}

//-----------------------------------------
//随机生成4位数字加大小写字母验证码
function randomNum() {    
	var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';     //2.生成随机思维数有字母的验证码
	var num = str.charAt(parseInt(Math.random() * str.length));    
	return num;    
}

//--------------------------------
/*
    封装cookie函数:
    存: Cookie.set()
    取:  Cookie.get()
    删: Cookie.remove()
 */

var Cookie={
    set:function(name,value,prop){//设置cookie
        //存数据到cookie里面:必写的
        var str=name+'='+value;
        
        //json存后面一些可选参数
        if(prop){
            //expires:设置失效时间
            if(prop.expires){
                str+=';expires='+prop.expires.toUTCString();//把时间转成字符串
            }
            //设置path路径
            if(prop.path){
                //如果设置了
                str+=';path='+prop.path;
            }
            //domain设置可访问cookie的域名
            if(prop.domain){
                str+=';domain='+prop.domain;
            }
        }
        //写到cookie
        document.cookie=str;
    },
    get:function(key){
        var cookies=document.cookie;//name=tiantian; age=18; usn=yuanyuan; pws=456123
        var arr=cookies.split('; ');//['name=tiantian','age=18','usn=yuanyuan','pws=456123']
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//['name','tiantian']
            if(key==arr2[0]){
                return arr2[1];
            }
        }
    },
    remove:function(key){
        //删的原理:设置过期时间
        var now=new Date();
        now.setDate(now.getDate()-1);
        this.set(key,'no',{expires:now});//'no'：是因为该键将删除，所以写什么键值都行
    }
}

/*
    ajax函数封装：要参数
        参数一：请求方式：GET  POST
        参数二：接口路径
        参数三：数据(可选)  name='tiantian'&psw=123456  传给后端的数据
        参数四：成功的回调函数(可选的)
 
*/

function ajax(method,url,data,success){
    //1.创建对象
    var xhr=new XMLHttpRequest();
    if(method=='GET' && data){
        //请求方式是get并且有数据
        url+='?'+data;  //var url=`api/checkname.php?username=${val}&time=${new Date()}`;
    }
    xhr.open(method,url,true);//true为是否异步发送请求
    //2.发送请求
    if(method=='GET'){
        xhr.send();//如果是get方式，直接发送请求
    }else{
        //post方式
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(data);//如果是post方式，数据放在send()里面传输
    }
    //3.后台做
    
    //4.接收数据
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200 || xhr.status == 304){
                //成功的：dom操作，数据渲染
                if(success){
                    //如果有回调，就用回调
                    success(xhr.responseText);//实参
                }
            }else{
                console.log('出错了，状态码是：'+xhr.status);//404 找不到页面，408请求超时
            }
        }
    }
}

//-------------------------
//字符串转成对象

//传的参数： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888
//返回值：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888"}

function strToObj(str){
    var obj = {};
    var arr1 = str.split('&');
    for(var i=0;i<arr1.length;i++){
        var arr2 = arr1[i].split('=');
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}

//---------------------------
//对象转成字符串方法封装
//传的参数：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888"}
//返回值： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888

function objToStr(obj){
    var str = '';
    for(var key in obj){
        str += key + '=' + obj[key] + '&';
    }
    str = str.slice(0,-1);
    return str;
}

//--------------------------------
/*
    封装cookie函数:
    存: Cookie.set()
    取:  Cookie.get()
    删: Cookie.remove()
 */

var Cookie={
    set:function(name,value,prop){//设置cookie
        //存数据到cookie里面:必写的
        var str=name+'='+value;
        //json存后面一些可选参数
        if(prop){
            //expires:设置失效时间
            if(prop.expires){
                str+=';expires='+prop.expires.toUTCString();//把时间转成字符串
            }
            //设置path路径
            if(prop.path){
                //如果设置了
                str+=';path='+prop.path;
            }
            //domain设置可访问cookie的域名
            if(prop.domain){
                str+=';domain='+prop.domain;
            }
        }
        //写到cookie
        document.cookie=str;
    },
    get:function(key){
        var cookies=document.cookie;//name=tiantian; age=18; usn=yuanyuan; pws=456123
        var arr=cookies.split('; ');//['name=tiantian','age=18','usn=yuanyuan','pws=456123']
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//['name','tiantian']
            if(key==arr2[0]){
                return arr2[1];
            }
        }
    },
    remove:function(key){
        //删的原理:设置过期时间
        var now=new Date();
        now.setDate(now.getDate()-1);
        this.set(key,'no',{expires:now});//'no'：是因为该键将删除，所以写什么键值都行
    }
}