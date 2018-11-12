// Your Node.js code here
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(fileUpload({
  //limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true,
}));

//endpoints
app.use('/', express.static('dist'))
app.post('/upload', (req, res) => {
    const file = req.files.file;

    console.log(`File: ${file}`);
    console.log(`Description: ${req.body.description}`);

    //only handling file based on scope, abandoning description
    file.mv(`./dist/uploaded_files/${file.name}`, function(err) {
        if (err)
          return res.status(500).send(err);

        res.status(200).send('File uploaded!');
      });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
