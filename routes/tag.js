const controller = require('../controller/tag')
module.exports = (app)=>{
	app.post('/createTag', controller.createTag);
	app.post('/deleteTag', controller.deleteTag);
	app.post('/editTag', controller.editTag);
	app.get('/getTagsList', controller.getTagsList);
}