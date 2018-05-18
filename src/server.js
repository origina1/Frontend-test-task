var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../build')));
app.use(function(req, res){
	res.sendFile(path.join(__dirname, '../build'));
});

function productCount(){
	return Math.round(Math.random() * 10 + 1);
}

function times(n, callback){
	var list = [];
	for (var i = 0; i < n; ++i) {
		list.push(callback(i));
	}
	return list;
}

var categories = [
	{ id: 1, parentId: null, title: 'Молоко.Яйца.Сыр' },
	{ id: 2, parentId: 1, title: 'Коровье молоко' },
	{ id: 3, parentId: 1, title: 'Козье молоко' },
	{ id: 4, parentId: 1, title: 'Яйца' },
	{ id: 5, parentId: 1, title: 'Сыры' },
	{ id: 6, parentId: null, title: 'Мясо.Птица' },
	{ id: 7, parentId: 6, title: 'Говядина' },
	{ id: 8, parentId: 6, title: 'Баранина' },
	{ id: 9, parentId: 6, title: 'Птица' }
];

var nextProductId = 1;
var products = categories.map(function(category) {
	if (category.parentId) {
		return times(productCount(), function(i) { return { id: nextProductId++, categoryId: category.id, title: category.title + ' #' + i } });
	} else {
		return [];
	}
}).reduce(function(a, b) {
	return a.concat(b);
});

function authChecker(req, res, next) {
	if (sessions[req.headers.sid]) {
        next();
    } else {
       res.redirect("/");
    }
}
var users = {};

app.post('/signup', function (req, res) {
	var login    = req.body.login,
	password = req.body.password;

	if (!(login && password)) {
		res.status(400).json({status: 'error'});
		return;
	}
	users[login] = password;

	res.json({status: 'ok'});
});

var sessions = {};

app.post('/login', function(req, res) {
	var params = req.body;

	if (users[params.login] === params.password) {
		var sid       = Math.floor(Math.random() * 100000);
		sessions[sid] = params.login;

		return res.json({sid: sid });
	} else {
		res.status(403).send('Unathorized').end();
		return;
	}
});

app.get('/categories', authChecker, function(req, res) {
	res.json(categories.filter(function(element) {
		return element.parentId == null;
	}));
});
app.get('/categories/:id', authChecker, function(req, res) {
	res.json(categories.filter(function(element) {
		return element.parentId == req.params.id;
	}));
});

app.get('/products', authChecker, function(req, res) {
	res.json(products);
});

app.get('/products/:category_id', authChecker, function(req, res) {
	res.json(products.filter(function(element) {
		return element.categoryId == req.params.category_id;
	}));
});

app.listen(3030, function() {
	console.log('Server start http://localhost:3030');
});
