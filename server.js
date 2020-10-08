const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const app = express()
const articleRouter = require('./routes/articles')
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(5000)