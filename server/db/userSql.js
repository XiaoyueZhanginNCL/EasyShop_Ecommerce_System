//验证数据库中的用户相关内容
const User = {
	//查询用户手机号
	queryUserTel(option){
		return 'select * from user where tel='+option.userTel+''
	},
	//查询密码
	queryUserPwd(option){
		return 'select * from user where (tel='+option.userTel+') and (pwd=\'' + option.userPwd + '\')'
	},
	//添加用户
	insertUser(option){
		//引入token
		let jwt = require('jsonwebtoken');
		//用户信息
		let payload= {tel:option.userTel};
		//口令
		let secret = 'xiaoyue';
		//生成
		let token=jwt.sign(payload,secret);
		
		return 'insert into user (tel,pwd,imgUrl,nickName,token) values ('+option.userTel+',\'' + option.userPwd + '\',"/images/userdefault.webp",'+option.userTel+',\''+token+'\')'
	}
}
exports =module.exports=User;