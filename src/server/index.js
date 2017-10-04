require('dotenv').config()
const express = require('express');
const rp = require('request-promise-native');
const cors = require('cors');
const geolib = require('geolib');
const path = require('path');

const app = express();
const baseQueryURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GOOGLE_KEY}`

app.use(cors());

app.use(express.static(path.join(__dirname, '../../public')));

const port = process.env.PORT || 8000;

app.get('/api/getPage/:page', (req, res) => {
  rp(`${baseQueryURL}&pagetoken=${req.params.page}`)
    .then(html => res.json(JSON.parse(html)))
})

app.get('/api/findREAs', (req, res) => {
  let results = [];
  const {lat, lng} = req.query
  rp(`${baseQueryURL}&type=real_estate_agency&location=${lat},${lng}&rankby=distance`)
    .then(html => res.json(JSON.parse(html)))
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});