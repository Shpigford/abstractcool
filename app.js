const trianglify = require('trianglify');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/:seed.png', (req, res) => {
  res.set('Content-Type', 'image/png');

  trianglify({
    width: 1000,
    height: 1000,
    cellSize: 200,
    variance: 1,
    seed: req.params.seed
  })
    .toCanvas()
    .createPNGStream()
    .pipe(res);
});

app.listen(port);