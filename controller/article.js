const controller = {};
controller.create = (req, res)=>{
	console.log(req, '[article create controller]')
}
controller.delete = (req, res)=>{
	console.log(req, '[article delete controller]')
}
module.exports = controller