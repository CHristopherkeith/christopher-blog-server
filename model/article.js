const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const ObjectId = mongoose.Schema.Types.ObjectId;
// 文章模型
const articleSchema = new mongoose.Schema({
	// 文章标题
	title: { type: String, required: true},

	// 作者
	author: { type: ObjectId, required: true, ref: 'User'},

	// 文章内容
	content: { type: String, default: ''},

	// 文章类型 => 1: 普通文章，2: 介绍
	type: { type: Number, required: true},

	// 文章发布状态 => 1 草稿，2 已发布
	state: { type: Number, required: true},

	// 文章标签
	tag: { type: ObjectId, ref: 'Tag', required: true },

	// comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }],

	// 阅读量
	reading_vol: {type: Number, default: 0},

	// 创建日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now },
});

// 自增 ID 插件配置
articleSchema.plugin(autoIncrement.plugin, {
	model: 'Article',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
const Article = mongoose.model('Article', articleSchema);
// 验证数据
Article.validateData = function(params){
	let result = {success: true, msg: ''};
	let fields = ['title', 'author', 'type', 'state', 'tag'];
	for(let i = 0;i<fields.length;i++){
		let fieldName = fields[i];
		if(!params[fieldName]){
			result = {success: false, msg: `${fieldName}不能为空`};
			break;
		}
	}
	return result;
}
// 创建文章
Article.createArticle = async function({title, author, content, type, state, tag}){
	let result = {success: true, msg: ''};
	result = this.validateData({title, author, type, state, tag})
	if(!result.success){
		return result
	}
	await this.create({title, author, type, state, tag}).then((data)=>{
		console.log(data, '[data]')
		result = {...result, data: {_id: data._id}}
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '创建文章失败'}
	})
	return result;
}
// 获取文章列表
Article.getArticlesList = async function({skip, limit}){
	let result = {success: true, msg: ''};
	await this.find({}, null, {skip: parseInt(skip), limit: parseInt(limit)})
	.populate({ path: 'author', select: {name: 1} })
	.populate({ path: 'tag', select: {name: 1} })
	.exec().then((data)=>{
		console.log(data, '[data]')
		result = {...result, data: data}
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '获取文章列表失败'}
	})
	return result;
}
// 删除文章
Article.deleteArticle = async function({_id}){
	let result = {success: true, msg: ''};
	await this.deleteOne({_id}).then((data)=>{
		console.log(data, '[data]')
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '删除文章失败'}
	})
	return result;
}
// 编辑文章
Article.editArticle = async function({title, author, content, type, state, tag, _id}){
	let result = {success: true, msg: ''};
	result = this.validateData({title, author, type, state, tag})
	if(!result.success){
		return result
	}
	await this.update({_id}, {title, author, content, type, state, tag}).then((data)=>{
		console.log(data, '[data]')
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '更新文章失败'}
	})
	return result;
}
module.exports = Article;