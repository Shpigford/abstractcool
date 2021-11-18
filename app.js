const trianglify = require('trianglify');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/:seed.png', (req, res) => {
  res.set('Content-Type', 'image/png');

  variance = req.query.variance == null ? 1 : req.query.variance;

  trianglify({
    width: parseInt(req.query.width) || 500,
    height: parseInt(req.query.height) || 500,
    cellSize: parseInt(req.query.cellSize) || 100,
    variance: Number(parseFloat(variance)).toFixed(2) || 1.0,
    seed: req.params.seed
  })
    .toCanvas()
    .createPNGStream()
    .pipe(res);
});

app.listen(port);