const controller = require('../controller/user')
module.exports = (app)=>{
	app.post('/login', controller.login);
	app.post('/register', controller.register);
	app.post('/editUser', controller.editUser);
	app.post('/deleteUser', controller.deleteUser);
}