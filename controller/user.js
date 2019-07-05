const {User} = require('../model')
console.log(User, '[user2333333]')
const controller = {};
controller.create = (req, res)=>{
	console.log('[user create controller]')
	let rs = User.create({
		name: 'root',
		password: 'admin'
	},function(err){
		if(err){
			console.log(err, '[err]')
		}
	})
	console.log(rs, '[rsrs]')
	res.status(200).json({success:true, msg: 'ok'});
}
controller.delete = (req, res)=>{
	console.log('[user delete controller]')
}
module.exports = controller