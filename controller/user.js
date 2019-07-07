const {User} = require('../model')
const {responseClient} = require('../lib')
const controller = {};
controller.login = (req, res)=>{
}
controller.register = async (req, res)=>{
	console.log('[user register controller]')
	let {name, phone, email, password} = req.body;
	// let rs = User.create({
	// 	name: 'root',
	// 	password: 'admin'
	// },function(err){
	// 	if(err){
	// 		console.log(err, '[err]')
	// 	}
	// })
	let rs = await User.register({name, phone, email, password})
	console.log(rs, '[rsrs]')
	// res.status(200).json({success:true, msg: 'ok'});
	let resData = {};
	if(rs.success){
		resData = {res}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.editUser = (req, res)=>{
	console.log('[user editUser controller]')
}
controller.deleteUser = (req, res)=>{
	console.log('[user delete controller]')
}
module.exports = controller