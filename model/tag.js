const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const tagSchema = new mongoose.Schema({
	// 标签名称
	name: { type: String, required: true},

	// 标签描述
	desc: {type: String, default: ''},

	// 发布日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now },
});
// 自增ID插件配置
tagSchema.plugin(autoIncrement.plugin, {
	model: 'Tag',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
const Tag = mongoose.model('Tag', tagSchema);
// 验证数据
Tag.validateData = function(params){
	let result = {success: true, msg: ''};
	let fields = ['name'];
	for(let i = 0;i<fields.length;i++){
		let fieldName = fields[i];
		if(!params[fieldName]){
			result = {success: false, msg: `${fieldName}不能为空`};
			break;
		}
	}
	return result;
}
// 创建标签
Tag.createTag = async function({name, desc}){
	let result = {success: true, msg: ''};
	result = this.validateData({name});
	if(!result.success){
		return result;
	}
	// console.log(this.find({name}).exec(), '1111')
	// console.log(this.find({name}), '22222')
	let existRs =  await this.find({name}).exec()
	console.log(existRs, '[existRs]')
	if(existRs.length > 0){
		return {success: false, msg: '同名标签已存在'};
	}
	// console.log(this.create({name, desc}), '333333')
	await this.create({name, desc}).then((data)=>{
		result = {...result, data: {_id: data._id}}
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '创建标签出错'};
	})
	return result;
}
// 删除标签
Tag.deleteTag = async function({_id}){
	let result = {success: true, msg: ''};
	await this.deleteOne({_id}).then((data)=>{
		console.log(data, '[data]')
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '删除标签出错'};
	})
	return result;
}
// 编辑标签
Tag.editTag = async function({name, desc, _id}){
	let result = {success: true, msg: ''};
	result = this.validateData({name});
	if(!result.success){
		return result;
	}
	await this.update({_id}, {name, desc}).then((data)=>{
		console.log(data, '[data]')
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '更新标签出错'};
	})
	return result;
}
// 获取表亲列表
Tag.getTagsList = async function({skip, limit}){
	let result = {success: true, msg: ''};
	await this.find({}, null, {skip: parseInt(skip
		), limit: parseInt(limit) }).exec()
	.then((data)=>{
		result = {...result, data}
	},(err)=>{
		console.log(err, '[err]')
		result = {success: false, msg: '获取标签出错'};
	})
	return result;
}
module.exports = Tag;