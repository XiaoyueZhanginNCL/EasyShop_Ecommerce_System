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
		return 'insert into user (tel,pwd) values ('+option.userTel+',\'' + option.userPwd + '\')'
	}
}
exports =module.exports=User;