const {User} = require('../model')
const {responseClient} = require('../lib')
const controller = {};
controller.login = async (req, res)=>{
	let {name, password} = req.body;
	let rs = await User.login({name, password});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.register = async (req, res)=>{
	let {name, phone, email, password, type=1} = req.body;
	let rs = await User.register({name, phone, email, password, type});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.editUser = async (req, res)=>{
	let {_id, type, phone, email, password} = req.body;
	let rs = await User.editUser({_id, type, phone, email, password});
	console.log(rs, '[rs]')
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.deleteUser = async (req, res)=>{
	let {_id} = req.body;
	let rs = await User.deleteUser({_id});
	if(rs.success){
		resData = {res}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData);
}
controller.getUsersList = async (req, res)=>{
	let {skip=0, limit=100} = req.query;
	let rs = await User.getUsersList({skip, limit});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
module.exports = controller