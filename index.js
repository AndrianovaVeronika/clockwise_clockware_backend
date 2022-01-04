const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const db = require('./queries')
const {getOrders} = require("./queries");
const port = 3000

app.use(cors())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Clockwise Clockware backend API' })
})

app.get('/orders', db.getOrders)
app.get('/orders/:id', db.getOrderById)
app.post('/orders', db.createOrder)
// app.put('/orders/:id', db.updateOrder)
// app.delete('/orders/:id', db.deleteOrder)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})