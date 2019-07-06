const {Article} = require('../model')
const controller = {};
controller.create = (req, res)=>{
	console.log('[article create controller]')
}
controller.delete = (req, res)=>{
	console.log('[article delete controller]')
}
module.exports = controller