const path = require('path')

const EmailTemplate = require('email-templates').EmailTemplate
const _ = require('lodash')
const Handlebars = require('handlebars')

var Mailer = function() {}

Mailer.prototype.resolvePath = function(filename) {
  return path.resolve('templates', filename)
}

Mailer.prototype.render = function(filename, query) {
  const template = new EmailTemplate(this.resolvePath(filename), {
    juiceOptions: {
      preserveMediaQueries: true,
      removeStyleTags: true
    }
  })
  return template.render(query)
}

Mailer.prototype.html = function(filename, query, cb) {
  this.render(filename, query)
    .then(function(results) {
      cb(null, results.html)
    })
}

Mailer.prototype.text = function(filename, query, cb) {
  this.render(filename, query)
    .then(function(results) {
      cb(null, results.text)
    })
}

module.exports = function() {
  return new Mailer();
}