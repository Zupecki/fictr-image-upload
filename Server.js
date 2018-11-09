// Your Node.js code here
const express = require('express')
const app = express()
const port = 3000

//app.get('/', (req, res) => res.send('Hello World!'))
//app.get('/ddsfa', (req, res) => res.send('ddsfa endpoint!'))
app.use('/', express.static('dist'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
