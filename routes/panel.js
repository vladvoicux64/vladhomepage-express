var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session.username)
    {
        res.render('panel', { title : 'Admin panel' })
    }
    else
    {
        res.redirect('/login');
    }
});

router.post('/', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;