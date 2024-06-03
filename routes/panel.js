var express = require('express');
const formidable = require("formidable");
const fs = require("fs");
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
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        let category_name = fields.category;
        let title = fields.title;
        let description = fields.description;
        let url = fields.url;
        var data = fs.readFileSync('public/articles.json');
        var articles = JSON.parse(data)
        for (const category of articles.categories)
        {
            if (category_name == category.name)
            {
                let article= {};
                article.title = title[0];
                article.url = url[0];
                article.description = description[0];
                category.articles.push(article);
            }
        }
        fs.writeFileSync('public/articles.json', JSON.stringify(articles, null, 4), 'utf8');
        res.redirect('/');
    });
});

module.exports = router;