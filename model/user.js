const crypto = require('crypto');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const MongooseObjectId = mongoose.Types.ObjectId;

mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
  // 名字
  name: { type: String, required: true},

  //用户类型 0：管理员，1：普通用户
  type: { type: Number, required: true},

  // 手机
  phone: { type: String, default: '' },

  // 邮箱
  email: {type: String, default: ''},

  // 密码
  password: {
    type: String,
    required: true,
    // default: crypto
    //   .createHash('md5')
    //   .update('root')
    //   .digest('hex'),
  },

  // 创建日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now },
});

// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});
const User = mongoose.model('User', userSchema);
// 验证数据有效性
User.validateData = function({name, phone, email, password, type}){
  let result = {success: true, msg: ''};
  // 用户名和密码非空
  if(!name || !password){
    result = {success: false, msg: '用户名或密码不能为空'};
    return result;
  }
  // 用户类型非空
  if(typeof type !== "number" && !type){
    result = {success: false, msg: '用户类型不能为空'};
    return result;
  }
  // 邮箱格式
  const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
  if(email && !reg.test(email)){
    result = {success: false, msg: '邮箱格式错误'};
    return result;
  }
  return result;
}
// 注册方法
User.register = async function({name, phone, email, password, type}){
  let result = {success: true, msg: ''};
  // 验证数据
  result = this.validateData({name, phone, email, password, type});
  if(!result.success){
    return result;
  }
  // 用户名是否已存在
  let existRs = await this.find({name}).exec();
  if(existRs.length>0){
    result = {success: false, msg: '用户名已存在'};
    return result;
  }
  // 新建用户
  await this.create({name, phone, email, password, type}).then((data)=>{
    result = {...result, data:{id: data._id}}
  },(err)=>{
    result = {success: false, msg: '新建用户出错'};
  })
  return result
}

// 删除方法
User.deleteUser = async function({_id}){
  let result = {success: true, msg: ''};
  await this.deleteOne({_id}).then((data)=>{
    console.log(data, '[data]')
  },(err)=>{
    console.log(err, '[err]')
    result = {success: false, msg: '删除用户出错'};
  })
  return result;
}

// 编辑
User.editUser = async function({_id, type, phone, email, password}){
  let result = {success: true, msg: ''};
  // 验证数据
  result = this.validateData({name: true, phone, email, password, type});
  if(!result.success){
    return result;
  }
  console.log(type, '[type]')
  await this.update({_id},{phone, email, password, type}, {runValidators: true}).then((data)=>{
    console.log(data, '[data]')
  },(err)=>{
    result = {success: false, msg: '更新用户出错'};
    console.log(err, '[err]')
  })
  console.log(result, '[result]')
  return result;
}

module.exports = User;
