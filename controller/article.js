const {Article} = require('../model')
const {responseClient} = require('../lib')
const controller = {};
controller.createArticle = async (req, res)=>{
	let {title, author, content, type, state, tag} = req.body;
	let rs = await Article.createArticle({title, author, content, type, state, tag});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.deleteArticle = async (req, res)=>{
	let {_id} = req.body;
	let rs = await Article.deleteArticle({_id});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.editArticle = async (req, res)=>{
	let {title, author, content, type, state, tag, _id} = req.body;
	let rs = await Article.editArticle({title, author, content, type, state, tag, _id});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
controller.getArticlesList = async (req, res)=>{
	let {skip=0, limit=100} = req.query;
	console.log(skip, limit, '[skip limit]')
	let rs = await Article.getArticlesList({skip, limit});
	let resData = {};
	if(rs.success){
		resData = {res, data: rs.data}
	}else{
		resData = {res, httpCode: 400, msg: rs.msg}
	}
	responseClient(resData)
}
module.exports = controller