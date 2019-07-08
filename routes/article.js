const controller = require('../controller/article')
module.exports = (app)=>{
	app.post('/createArticle', controller.createArticle);
	app.post('/deleteArticle', controller.deleteArticle);
	app.post('/editArticle', controller.editArticle);
	app.get('/getArticlesList', controller.getArticlesList);
}