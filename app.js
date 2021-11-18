const trianglify = require('trianglify');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/:seed.png', (req, res) => {
  res.set('Content-Type', 'image/png');

  trianglify({
    width: parseInt(req.query.width) || 500,
    height: parseInt(req.query.height) || 500,
    cellSize: parseInt(req.query.cellSize) || 100,
    variance: Number(parseFloat(req.query.variance)).toFixed(4) || 1,
    seed: req.params.seed
  })
    .toCanvas()
    .createPNGStream()
    .pipe(res);
});

app.listen(port);