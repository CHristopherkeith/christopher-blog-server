const {Tag} = require('../model')
const {responseClient} = require('../lib')
const controller = {};
controller.createTag = async (req, res)=>{
	let {name, desc} = req.body;
	let rs = await Tag.createTag({name, desc});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.deleteTag = async (req, res)=>{
	let {_id} = req.body;
	let rs = await Tag.deleteTag({_id});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.editTag = async (req, res)=>{
	let {name, desc, _id} = req.body;
	let rs = await Tag.editTag({name, desc, _id});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.getTagsList = async (req, res)=>{
	let {skip=0, limit=100} = req.query;
	let rs = await Tag.getTagsList({skip, limit});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
module.exports = controller