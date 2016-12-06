var express = require('express');
var multer  = require('multer');
var fs = require('fs')
var upload = multer({ dest: 'uploads/' });

var app = express();

app.get('/', function(req, res) {
  res.status(200).send(`
    <html>
      <body>
        <p>Submit file to view its size.</p>
        <form action="/size" method="POST" enctype="multipart/form-data">
          <input type="file" name="file"/>
          <input type="submit"/>
        </form>
      </body>
    </html>
  `);
});

app.post('/size', upload.single('file'), function (req, res, next) {
  var fileSize = req.file.size;
  fs.unlink(req.file.path, function() {
    res.status(200).send({
      'size': fileSize
    });
  });
})

var port = process.env.PORT || 8080;
app.listen(port, function() {
  // running
});
