const controller = require('../controller/tag')
module.exports = (app)=>{
	app.post('/createTag', controller.create);
	app.post('/deleteTag', controller.delete);
}