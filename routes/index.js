const article = require('./article')
const tag = require('./tag')
const user = require('./user')
module.exports = function withRoutes(app){
	article(app);
	tag(app);
	user(app);
}