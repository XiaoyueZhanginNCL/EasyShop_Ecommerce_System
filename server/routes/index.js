var express = require('express');
var router = express.Router();
var connection=require('../db/sql.js');
var user =require('../db/userSql.js');
var QcloudSms = require("qcloudsms_js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
				//输入的两次密码一致
				res.send({
					code:200,
					data:{
						status:true,
						msg:'Registration is successful !',
					}
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
							data:result,
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
