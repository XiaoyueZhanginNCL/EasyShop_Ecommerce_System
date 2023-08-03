var express = require('express');
var router = express.Router();
var connection=require('../db/sql.js');
var user =require('../db/userSql.js');
var QcloudSms = require("qcloudsms_js");
let jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//修改订单状态
router.post('/api/submitOrder',function(req,res,next){
	console.log("555555",req.body.orderId, req.body.shopArr);
	let token = req.headers.token;
	//解析token
	let tokenObj=jwt.decode(token);
	//订单号
	let orderId=req.body.orderId;
	//购物车选中的商品
	let shopArr=req.body.shopArr
	
	//查询用户
	connection.query('select * from user where tel='+tokenObj.tel+'',function(error,results){
		//用户id
		let userId=results[0].id;
		connection.query('select * from store_order where user_id='+userId+' and order_id='+orderId+'',function(error,result){
			//订单的数据库id
			let id=result[0].id;
			//修改订单状态
			connection.query('update store_order set order_status=2 where id='+id+'',function(){
				//删除购物车数据
				// shopArr.forEach(v=>{
				// 	connection.query('delete from goods_cart where id='+v.id+'',function(){
				// 		res.send({
				// 			data:{
				// 				status:true,
				// 			}
				// 		})
				// 	})
				// })
				res.send({
					data:{
						status:true,
					}
				})
			})
		})
	})
})

//生成订单
router.post('/api/addOrder',function(req,res,next){
	let token = req.headers.token;
	//解析token
	let tokenObj=jwt.decode(token);
	
	let goodsArr=req.body.arr;
	
	//生成订单号order_id，规则：时间戳+6位随机数
	function setTimeDateFmt(s){
		return s<10?'0'+s:s
	}
	function randomNumber(){
		const now=new Date();
		let month=now.getMonth()+1;
		let day=now.getDate();
		let hour=now.getHours();
		let minutes=now.getMinutes();
		let seconds=now.getSeconds();
		// console.log(month,day,hour,minutes,seconds);
		month=setTimeDateFmt(month);
		day=setTimeDateFmt(day);
		hour=setTimeDateFmt(hour);
		minutes=setTimeDateFmt(minutes);
		seconds=setTimeDateFmt(seconds);
		// console.log(month,day,hour,minutes,seconds);
		let orderCode=now.getFullYear().toString()+month.toString()+day+hour+minutes+seconds+(Math.round( Math.random()*1000000)).toString();
	    
		return orderCode;
	}
	// console.log(randomNumber());
	//未支付：1 待支付：2 支付成功：3 支付失败：4|0
	
	let goodsName=[];//商品名称
	let goodsPrice=0;//商品价格
	let goodsNum=0;//商品数量
	
	goodsArr.forEach(v=>{
		goodsName.push(v.goods_name);
		goodsPrice += v.goods_price*v.goods_num;
		goodsNum += parseInt(v.goods_num);
	})
	//订单号
	let orderNum=randomNumber();
	
	connection.query('select * from user where tel='+tokenObj.tel+'',function(error,results){
		//用户id
		let userId=results[0].id;
			
		connection.query('insert into store_order (order_id,goods_name,goods_price,goods_num,order_status,user_id) values (\''+orderNum+'\',\''+goodsName+'\',\''+goodsPrice+'\',\''+goodsNum+'\',1,'+userId+')',function(){
			connection.query('select * from store_order where user_id ='+userId+' and order_id='+orderNum+'',function(error,result){
				res.send({
					data:{
						data:result,
						msg:"success",
						status:true,
					}
				})
			})
		})
	})
})

//订单中获取商品数据
router.post('/api/orderItem',function(req,res,next){
	let idArr=req.body.id;
	let Arr=[];
    function queryAndAddToArr(id) {
    connection.query('select * from goods_cart where id='+id+'', function(error, results) {
        // 将查询结果添加到 Arr 数组中
        Arr.push(results[0]);
        // 判断是否已经处理完所有的 id
        if (Arr.length === idArr.length) {
          console.log(Arr);
          res.send({
            data: {
               Arr:Arr
            }
          });
        }
    });
  }
  // 循环遍历 idArr，执行查询操作
  idArr.forEach((id) => {
    queryAndAddToArr(id);
  });
})

//删除地址
router.post('/api/deleteAdd',function(req,res,next){
	let id=req.body.id;
	connection.query('delete from user_address where id='+id+'',function(error,results){
		res.send({
			data:{
				status:true,
				msg:'Delete Successfully'
			}
		})
	})
})

//获取地址数据
router.post('/api/address',function(req,res,next){
	let token = req.headers.token;
	//解析token
	let tokenObj=jwt.decode(token);
	//查询用户
	connection.query('select * from user where tel='+tokenObj.tel+'',function(error,results){
		//用户id
		let userId=results[0].id;
		connection.query('select * from user_address where user_id=?',[userId],function(error,result){
			res.send({
				data:{
					code:200,
					status:true,
					data:result
				}
			})
		})
	})
})

//添加或编辑地址
router.post('/api/addAddress',function(req,res,next){
	let[name,tel,address,isDefault] = [req.body.name,req.body.tel,req.body.address,req.body.isDefault];
	let status=req.body.status;
	let id=req.body.id;
	let token = req.headers.token;
	//解析token
	let tokenObj=jwt.decode(token);
	
		//查询用户
		connection.query('select * from user where tel='+tokenObj.tel+'',function(error,results){
			//用户id
			let userId=results[0].id;
			//执行添加操作
			if(status){
				if(isDefault==1){
					connection.query('insert into user_address (name,tel,address,isDefault,user_id) values (\''+name+'\',\''+tel+'\',\''+address+'\','+isDefault+',\''+userId+'\')',function(error,result){
						res.send({
							data:{
								status:true,
								msg:'Add Successfully'
							}
						})
					})
				}else{
					connection.query('select * from user_address where user_id='+userId+' and isDefault= 0 ',function(error,result){
						let addressId=result[0].id;
						connection.query('update user_address set isDefault = 1 where id='+addressId+'',function(){
							connection.query('insert into user_address (name,tel,address,isDefault,user_id) values (\''+name+'\',\''+tel+'\',\''+address+'\','+isDefault+',\''+userId+'\')',function(e,r){
								res.send({
									data:{
										status:true,
										msg:'Add Successfully'
									}
								})
							})
						})
					})
				}
			}else{//执行编辑操作
				if(isDefault==1){
					//编辑为非默认
						connection.query('update user_address set name=\''+name+'\',tel=\''+tel+'\',address=\''+address+'\',isDefault = 1 where id='+id+'',function(e,r){
							res.send({
								data:{
									status:true,
									msg:'Edit Successfully'
								}
							})
						})
					}else{
						//编辑为默认
						connection.query('select * from user_address where user_id='+userId+' and isDefault= 0 ',function(error,result){
							let addressId=result[0].id;//找到其他为默认值的id号
							//更新其他记录的默认值
							connection.query('update user_address set isDefault = 1 where id='+addressId+'',function(){
								connection.query('update user_address set name=\''+name+'\',tel=\''+tel+'\',address=\''+address+'\',isDefault = 0 where id='+id+'',function(e,r){
									res.send({
										data:{
											status:true,
											msg:'Edit Successfully'
										}
									})
								})
							})
						})
					}
					
				}
			})
		
			
		})

//修改购物车中商品的数量
router.post('/api/updateNum',function(req,res,next){
	console.log(111111);
	let id=req.body.id;
	let changedNum=req.body.changedNum;
	console.log(id,changedNum);
	connection.query('update goods_cart set goods_num='+changedNum+' where id='+id+'',function(error,results){
		res.send({
			data:{
				code:200,
				status:true
			}
		})
	})
})

//删除购物车中的数据
router.post('/api/deleteCart', function(req, res, next){
	let id=req.body.id;
	connection.query('DELETE FROM goods_cart WHERE id = ?', [id],function(error,result){
		res.send({
			data:{
				code:200,
				status:true,
				msg:'Delete Successfully',
			}
		})
	})
})


//查询购物车
router.post('/api/selectCart', function(req, res, next){
	let token = req.headers.token;
	//解析token
	let tokenObj=jwt.decode(token);
	console.log(token);
	console.log(tokenObj);
	//查询用户
	connection.query('select * from user where tel='+tokenObj.tel+'',function(error,results){
		 //用户id
		 let userId=results[0].id;
		 //查询购物车
		 connection.query('select * from goods_cart where user_id='+userId+'',function(error,result){
			 if(result.length==0){
				 //用户购物车为空
				 res.send({
					 data:{
						 status:false,
						 data:result
					 }
				 })
				
			 }else{
				 //不为空
				 res.send({
				 				 code:200,
				 				 data:{
				 					 status:true,
				 					 data:result
				 				 }
				 })
			 }
		 })
	})
})

//加入购物车
router.post('/api/addCart', function(req, res, next){
	let goodsId=req.body.goodsId;
	let token = req.headers.token;
	//解析token
	let tokenObj=jwt.decode(token);
	//查询用户
	connection.query('select * from user where tel='+tokenObj.tel+'',function(error,results){
		//用户id
		let userId=results[0].id;
		//查询商品
		connection.query('select * from goods_list where id='+goodsId+'',function(error,result){
			let goodsName=result[0].name;
			let goodsPrice=result[0].price;
			let goodsImgUrl=result[0].imgUrl;
			//添加商品进入购物车
			connection.query('insert into goods_cart (user_id,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values (\''+userId+'\',\'' + goodsId + '\',\''+goodsName+'\',\''+goodsPrice+'\',"1",\''+goodsImgUrl+'\')',function(e,r){
				res.send({
					code:200,
					data:{
						msg:"success",
						status:true
					}
				})
			})
		})
	})
	
	
})

//用户注册
router.post('/api/register', function(req, res, next){
	//后端接收前端传递过来的值
	let params={
		userTel:req.body.userTel,
		userPwd:req.body.userPwd,
		conPwd:req.body.conPwd,
	}
	//查询用户手机号
	connection.query(user.queryUserTel(params),function(error,results){
		//手机号已经存在
		if(results.length>0){
			res.send({
				code:301,
				data:{
					status:false,
					msg:'The account already exists!',
				}
			})

		//手机号不存在	
		}else{
			if(params.userPwd==params.conPwd){
				connection.query(user.insertUser(params),function(error,result){
					if(error) throw error;
					//输入的两次密码一致
					res.send({
						code:200,
						data:{
							status:true,
							msg:'Registration is successful !',
						}
					})
				})
			}else{
				//两次输入的密码不一致
				res.send({
					code:302,
					data:{
						status:false,
						msg:'The entered passwords do not match !',
					}
				})
			}
		}
	})
	
})

//发送短信验证码
router.post('/api/code', function(req, res, next){
	let tel=req.body.phone;
	
	// 短信应用SDK AppID
	var appid = 1400009099;  // SDK AppID是1400开头
	
	// 短信应用SDK AppKey
	var appkey = "9ff91d87c2cd7cd0ea762f141975d1df37481d48700d70ac37470aefc60f9bad";
	
	// 需要发送短信的手机号码
	var phoneNumbers = [tel];
	
	// 短信模板ID，需要在短信应用中申请
	var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
	
	// 签名
	var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
	
	// 实例化QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
	function callback(err, ress, resData) {
	    if (err) {
	        console.log("err: ", err);
	    } else {
	        console.log("request data: ", ress.req);
	        console.log("response data: ", resData);
	    }
	}
	
	var ssender = qcloudsms.SmsSingleSender();
	var params = [Math.floor(Math.random()*(9999-1000))+1000];
	ssender.sendWithParam(86, phoneNumbers[0], templateId,
	  params, smsSign, "", "", callback);  // 签名参数不能为空串
})

//用户登录
router.post('/api/login', function(req, res, next){
	//后端接收前端传递过来的值
	let params={
		userTel:req.body.userTel,
		userPwd:req.body.userPwd,
	}
	//查询用户手机号
	connection.query(user.queryUserTel(params),function(error,results){
		//手机号存在
		if(results.length>0){
			//查询密码
			connection.query(user.queryUserPwd(params),function(error,result){
				    //密码和手机号都对
				if(result.length>0){
					res.send({
						code:200,
						data:{
							status:true,
							data:result[0],
							msg:'Login Successful!'
						}
					})
				}else{
					//密码不存在
					res.send({
						code:302,
						data:{
							status:false,
							msg:'Pwd does not exit !'
						}
					})
				}
			})
		//手机号不存在	
		}else{
			res.send({
				code:301,
				data:{
					status:false,
					msg:'Tel does not exit !',
				}
			})
		}
	})
	
})

//查询商品id的数据
router.get('/api/goods/id', function(req, res, next) {
  let id=req.query.id;
  connection.query('select * from goods_list where id='+id+'',function(error,results){
	  if(error) throw error;
	  res.json({
		  code:0,
		  data:results[0]
	  })
  })
});

//首页数据
router.get('/api/home', function(req, res, next) {
  res.send({
	 code:0,
	 data:{
		 data:[
			 //this is the data of Swiper
			 {
				 id:0,
				 type:"swiperList",
				 data:[
					 {id:0,imgUrl:"./images/swiper1.png"},
					 {id:1,imgUrl:"./images/swiper2.png"},
					 {id:2,imgUrl:"./images/swiper3.png"},
					 {id:3,imgUrl:"./images/swiper4.png"},
				 ]
			 },
			 //Icons
			 {
				 id:1,
				 type:"iconsList",
				 data:[
				 		{
				 		  id: 1,
				 		  title: "Fashion",
				 		  imgUrl: "./images/clothes.png",
				 		},
				 		{
				 		  id: 2,
				 		  title: "Digital Devices",
				 		  imgUrl: "./images/shopping.png",
				 		},
				 		{
				 		  id: 3,
				 		  title: "School Season",
				 		  imgUrl: "./images/ecommerce.png",
				 		},
				 		{
				 		  id: 4,
				 		  title: "Finance",
				 		  imgUrl: "./images/delivery.png",
				 		}
				 ]
			 },
			 //Recommend
			 {
				 id:2,
				 type:"recommendList",
				 data:[
					 {
					   id: 1,
					   name: "VonHaus Large Sideboard",
					   imgUrl: "./images/recommend1.jpg",
					   content: "Wide Storage Cabinet White",
					   price: "179",
					 },
					 {
					   id: 2,
					   name: "Dog Storage Basket",
					   imgUrl: "./images/recommend2.jpg",
					   content:
					     "Personalised Dog Storage Basket ssssssssssssssssssssssssssssssss",
					   price: "14.5",
					 },
					 {
					   id: 3,
					   name: "VonHaus Large Sideboard",
					   imgUrl: "./images/recommend1.jpg",
					   content: "Wide Storage Cabinet Whitesssssssssssss",
					   price: "170",
					 }
				 ]
			 },
			 //Like
			 {
				 id:3,
				 type:"likeList",
				 data:[
					 {
					   id: 1,
					   name: "jellycat orange",
					   imgUrl: "/images/goods1.jpg",
					   price: "22",
					 },
					 {
					   id: 2,
					   name: "bag for women",
					   imgUrl: "/images/goods2.jpg",
					   price: "229",
					 },
					 {
					   id: 3,
					   name: "shoes",
					   imgUrl: "/images/goods3.jpg",
					   price: "32",
					 },
					 {
					   id: 4,
					   name: "masks",
					   imgUrl: "/images/goods4.jpg",
					   price: "10",
					 }
				 ]
			 },
		 ]
	 }
  })
});

//查询商品数据接口
router.get('/api/goods/shopList',function(req,res,next){
	// let searchName=req.query.searchName;
	// let val=req.query.price;
	// let val2=req.query.sales;
	let [searchName,orderName]=Object.keys(req.query);
	let [name,order]=Object.values(req.query);
	console.log(orderName,order);
	// console.log("here11111",searchName,val,val2);
	connection.query(`select * from goods_list where name like "%${name}%" order by ${orderName} ${order}`,function(error,results){
		res.send({
			code:0,
			data:results
		})
	})
})

//分类的接口
router.get('/api/goods/list',function(req,res,next){
	res.send({
		code:0,
		data:[
			{
				//一级
				id:0,
				name:"Books",
				data:[
					{
						//二级
						id:0,
						name:"Books",
						list:[
							//三级
							{
								id:0,
								name:"Fiction",
								imgUrl:"/images/category/book1.png"
							},
							{
								id:1,
								name:"Science-fiction",
								imgUrl:"/images/category/book2.png"
							},
							{
								id:2,
								name:"Thriller",
								imgUrl:"/images/category/book3.png"
							},
							{
								id:3,
								name:"History",
								imgUrl:"/images/category/book4.png"
							},
							{
								id:4,
								name:"Biograph",
								imgUrl:"/images/category/book5.png"
							},
							{
								id:5,
								name:"Personal Development",
								imgUrl:"/images/category/book6.png"
							},
						]
					}
				]
			},
			{
				//一级
				id:1,
				name:"Childen",
				data:[
					{
						//二级
						id:0,
						name:"Books",
						list:[
							//三级
							{
								id:0,
								name:"Fiction",
								imgUrl:"/images/category/book1.png"
							},
							{
								id:1,
								name:"Science-fiction",
								imgUrl:"/images/category/book2.png"
							},
							{
								id:2,
								name:"Thriller",
								imgUrl:"/images/category/book3.png"
							},
							{
								id:3,
								name:"History",
								imgUrl:"/images/category/book4.png"
							},
							{
								id:4,
								name:"Biograph",
								imgUrl:"/images/category/book5.png"
							},
							{
								id:5,
								name:"Personal Development",
								imgUrl:"/images/category/book6.png"
							},
						]
					}
				]
			},
			{
				//一级
				id:2,
				name:"Beauty",
				data:[
					{
						//二级
						id:0,
						name:"Books",
						list:[
							//三级
							{
								id:0,
								name:"Fiction",
								imgUrl:"/images/category/book1.png"
							},
							{
								id:1,
								name:"Science-fiction",
								imgUrl:"/images/category/book2.png"
							},
							{
								id:2,
								name:"Thriller",
								imgUrl:"/images/category/book3.png"
							},
							{
								id:3,
								name:"History",
								imgUrl:"/images/category/book4.png"
							},
							{
								id:4,
								name:"Biograph",
								imgUrl:"/images/category/book5.png"
							},
							{
								id:5,
								name:"Personal Development",
								imgUrl:"/images/category/book6.png"
							},
						]
					}
				]
			},
			{
				//一级
				id:3,
				name:"Fashion",
				data:[
					{
						//二级
						id:0,
						name:"Books",
						list:[
							//三级
							{
								id:0,
								name:"Fiction",
								imgUrl:"/images/category/book1.png"
							},
							{
								id:1,
								name:"Science-fiction",
								imgUrl:"/images/category/book2.png"
							},
							{
								id:2,
								name:"Thriller",
								imgUrl:"/images/category/book3.png"
							},
							{
								id:3,
								name:"History",
								imgUrl:"/images/category/book4.png"
							},
							{
								id:4,
								name:"Biograph",
								imgUrl:"/images/category/book5.png"
							},
							{
								id:5,
								name:"Personal Development",
								imgUrl:"/images/category/book6.png"
							},
						]
					}
				]
			},
			{
				//一级
				id:4,
				name:"Outdoors",
				data:[
					{
						//二级
						id:0,
						name:"Books",
						list:[
							//三级
							{
								id:0,
								name:"Fiction",
								imgUrl:"/images/category/book1.png"
							},
							{
								id:1,
								name:"Science-fiction",
								imgUrl:"/images/category/book2.png"
							},
							{
								id:2,
								name:"Thriller",
								imgUrl:"/images/category/book3.png"
							},
							{
								id:3,
								name:"History",
								imgUrl:"/images/category/book4.png"
							},
							{
								id:4,
								name:"Biograph",
								imgUrl:"/images/category/book5.png"
							},
							{
								id:5,
								name:"Personal Development",
								imgUrl:"/images/category/book6.png"
							},
						]
					}
				]
			},
			{
				//一级
				id:5,
				name:"Electronics",
				data:[
					{
						//二级
						id:0,
						name:"Books",
						list:[
							//三级
							{
								id:0,
								name:"Fiction",
								imgUrl:"/images/category/book1.png"
							},
							{
								id:1,
								name:"Science-fiction",
								imgUrl:"/images/category/book2.png"
							},
							{
								id:2,
								name:"Thriller",
								imgUrl:"/images/category/book3.png"
							},
							{
								id:3,
								name:"History",
								imgUrl:"/images/category/book4.png"
							},
							{
								id:4,
								name:"Biograph",
								imgUrl:"/images/category/book5.png"
							},
							{
								id:5,
								name:"Personal Development",
								imgUrl:"/images/category/book6.png"
							},
						]
					}
				]
			},
		]
	});
});

module.exports = router;
