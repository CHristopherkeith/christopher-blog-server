const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const ObjectId = mongoose.Schema.Types.ObjectId;
// 文章模型
const articleSchema = new mongoose.Schema({
	// 文章标题
	title: { type: String, required: true, validate: /\S+/ },

	// 作者
	author: { type: ObjectId, required: true, ref: 'User', validate: /\S+/ },

	// 文章内容
	content: { type: String, required: true, validate: /\S+/ },

	// 文章类型 => 1: 普通文章，2: 介绍
	type: { type: Number, default: 1 },

	// 文章发布状态 => 0 草稿，1 已发布
	state: { type: Number, default: 1 },

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
module.exports = Article;