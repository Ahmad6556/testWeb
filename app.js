const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Article = require('./models/Schema')


//ejs files

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))

//auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

//mongoose

const mongoose = require('mongoose');
const { get } = require('http');
const { render } = require('ejs');

mongoose
    .connect("mongodb+srv://Ahmad_RAQ:1w3r5y7i8@cluster0.wrxv6um.mongodb.net/?retryWrites=true&w=majority")
    .then(result => {
        app.listen(port, () => {
            console.log(`Example app http://localhost:${port}/`)
        })
    })
    .catch(err => {
        console.log(err);
    });

//pages

//index

app.get("/", (req, res) => {
    Article.find()
    .sort({ "name": 1 })
        .then((result) => {
            res.render("index", { arrArticle: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/", (req, res) => {
    const article = new Article(req.body);

    console.log(req.body);

    article
        .save()
        .then(result => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete("/", (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then((params) => { res.redirect('/') })
        .catch((err) => { console.log(err) });
})

//add

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    const article = new RAQ(req.body);

    console.log(req.body);

    article
        .save()
        .then(result => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
})


//data

app.get('/data/:id', (req, res) => {

    Article.findById(req.params.id)
        .then((result) => {
            res.render("data", { item: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

app.delete("/data/:id", (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then((params) => { res.redirect('/') })
        .catch((err) => { console.log(err) });
})

//edit

app.get("/edit/:id", (req, res) => {
    Article.findById(req.params.id)
        .then((result) => {
            res.render("edit", { item: result });
        })
        .catch((err) => {
            console.log(err);
        });
})


app.post("/edit/:id", (req, res) => {
    const article = new RAQ(req.body);

    console.log(req.body);

    article
        .save()
        .then(result => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete("/edit/:id", (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then((params) => { res.redirect('/') })
        .catch((err) => { console.log(err) });
})


//profits

app.get('/profits', (req, res) => {
    Article.find()
        .then((result) => {
            res.render("profits", { arrArticle: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

//filter
app.get('/filters', (req, res) => {
    Article.find()
    .sort({ "name": 1 })
        .then((result) => {
            res.render("filters", { arrArticle: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

/*coming soon

app.get('/edit/:id', (req, res) => {
    res.render('soon')
})

*/
//404

app.use((req, res) => {
    res.status(404).redirect('/');
});

