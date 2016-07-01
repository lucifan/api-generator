exports.showIndex = function(req, res) {
	res.render('index', { title: '素材代码自动生成' });
};

exports.createCode = function(req, res) {
	console.log("here!");
	// console.log(req);
	// res.send('received!');
	res.json(req.body);
}