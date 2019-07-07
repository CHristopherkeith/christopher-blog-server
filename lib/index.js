const responseClient = function({res, httpCode = 200, msg = '请求成功', data = {}}){
	let responseData = {};
	responseData.msg = msg;
	responseData.data = data;
	res.status(httpCode).json(responseData);
}
module.exports = {responseClient}