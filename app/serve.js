#!/usr/bin/env node

const path = require('path')

const express = require('express')
const helmet = require('helmet')

const mailer = require('./mailer')()

const app = express()


app.use(helmet())

app.get('/html/:template', function(req, res, next) {
    const template = req.params.template
    const query = {
      name: req.query.name || 'NO_NAME'
    }

    mailer.html(template, query, function(err, html) {
        if (err) return next(err)

        res.send(html)
    })
})

app.get('/text/:template', function(req, res, next) {
    const template = req.params.template
    const query = {
      name: req.query.name || 'NO_NAME'
    }

    mailer.text(template, query, function(err, txt) {
        if (err) return next(err)

        res.send('<pre>' + txt + '</pre>')
    })
})

app.listen(3001)