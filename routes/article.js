const controller = require('../controller/article')
module.exports = (app)=>{
	app.post('/createArticle', controller.create);
	app.post('/deleteArticle', controller.delete);
}