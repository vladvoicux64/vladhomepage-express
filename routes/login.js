var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Admin login' });
});

function verify(username, parola)
{
    var data = fs.readFileSync('public/users.json');
    var json = JSON.parse(data)
    for (let key in json)
    {
        user = json[key];
        if (user.username === username[0] && user.password === parola[0])
            return username;
    }
    return false;
}

router.post('/', function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        let user = verify(fields.username, fields.password);
        if (user) {
            req.session.username = user;
            res.redirect('/panel');
            res.end();
        } else {
            req.session.username = false;
            res.redirect('/login');
            res.end();
        }
    });
});

module.exports = router;