const controller = require('../controller/user')
module.exports = (app)=>{
	app.post('/createUser', controller.create);
	app.post('/deleteUser', controller.delete);
}