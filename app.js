//imports
const express = require('express')
const app = express()
const port = 3000


//static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/views', express.static(__dirname + '/views'))

app.get('', (req, res) => {res.sendFile(__dirname + '/views/index.html')})


//listen on port 
app.listen(port, () => console.info(`Listening on port ${port}`))