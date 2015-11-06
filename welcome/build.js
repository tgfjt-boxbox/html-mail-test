const fs = require('fs')

const mkdirp = require('mkdirp')

const mailer = require('../app/mailer')()

mailer.html('welcome', {
  name: 'Mamma'
}, function(err, html) {
    if (err) console.error(err)

    mkdirp('build/welcome', function(err) {
        if (err) console.error(err)
        else {
          const ws = fs.createWriteStream('build/welcome/mail.html')
          ws.write(html)
          ws.end()
        }
    })
})
