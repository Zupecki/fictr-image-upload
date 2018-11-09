// Your Node.js code here
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use('/', express.static('dist'))
app.post('/upload', (req, res) => {
    console.log(req.body);
    res.send();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
