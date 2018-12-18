document.addEventListener('DOMContentLoaded',function(){

    //获取元素节点
    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    let NPhint = document.querySelector('#NPhint');
    let loginBtn = document.querySelector('#loginBtn');
    let hint = document.querySelector('#hint');
    let code = document.querySelector('.code');
    let incode = document.querySelector('#incode');
    let show = document.querySelector('#show');
    //随机验证码
    var verifyCode = new GVerify("codeBtn");

    //验证验证码
    var yzmOk=false;
    incode.onblur = ()=>{
        var res = verifyCode.validate(incode.value);
        if(res){
            hint.className="";
            yzmOk=true;//正确的情况才打开开关
        }else{
            hint.className = 'show layui-icon layui-icon-close-fill';
            yzmOk=false;
        }
        
    }
    
    


    let status = [200,304];
    loginBtn.onclick = ()=>{
        let _username = username.value;
        let _password = password.value;
        if(yzmOk){
            NPhint.className ="";
            let xhr = new XMLHttpRequest();
            xhr.onload = ()=>{
                if(status.includes(xhr.status)){
                    let res = JSON.parse(xhr.responseText);
                    if(res.code === 1){
                        location.href = '/index.html';
                    }else{
                        NPhint.className = 'show layui-icon layui-icon-close-fill';
                    }
                }
            }
            xhr.open('post','/login',true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(`username=${_username}&password=${_password}`);
        }
    }
    //===============

})