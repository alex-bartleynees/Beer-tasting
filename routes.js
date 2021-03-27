
const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const router = express.Router()

router.get('/beer', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) return res.status(500)
    const parsedData = JSON.parse(data)

  res.render('beer', parsedData)

  })

})

router.post('/beer', (req, res) => {

  var newBeer;
  var uploadPath;
  console.log(req.files)

  if (req.files) {

    newBeer = req.files.beerPhoto;
    uploadPath = newBeer.name;
    console.log(newBeer)

    newBeer.mv(__dirname + "/public/images/" + uploadPath, function (err) {
      if (err) {
        console.log(err);

      }


    })
  }

  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) return res.status(500)
    const parsedData = JSON.parse(data)
   

  upload = {
    "tasting-notes": req.body["tasting-notes"],
    "rating": req.body.rating,
    "name": req.body.submittedby,
    "image": "/images/" + newBeer.name
  
  }

  parsedData.beers.push(upload);

  let toString = JSON.stringify( parsedData)

  fs.writeFile('./data.json', toString, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  })
  res.redirect('beer')

})
})

module.exports = router