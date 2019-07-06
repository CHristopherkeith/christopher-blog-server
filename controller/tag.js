const {Tag} = require('../model')
const controller = {};
controller.create = (req, res)=>{
	console.log('[tag create controller]')

}
controller.delete = (req, res)=>{
	console.log('[tag delete controller]')
	res.status(200).json({success:true, msg: 'okok'});
}
module.exports = controller