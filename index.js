const express = require('express')      // require express
const mongoose = require('mongoose')    // require mongoose
const app = express()      // store express in variable
const PORT = 5500   // defined port no
const path = require('path')  //  require path 
const methodOverride = require('method-override')

// access EJS file
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

try {
    mongoose.connect('mongodb://127.0.0.1:27017/studenRecord')
    console.log("Database connected")
} catch (error) {
    console.log('Connection failed')
}
const records = require('./models/schema')        //  require schema file
const exp = require('constants')

// show all data apis
app.get('/records', async (req, res) => {
    let data = await records.find()
    res.render('index', { data })
})

// get data of new studendt apis
app.get('/records/new', (req, res) => {
    res.render('new')
})

// save data apis
app.post('/records', async (req, res) => {
    let record = new records({ name, fname, email, classn, roll, dob, phone, gen, blood, add } = req.body)
    const newRecord = await records.findOne({ email, phone })
    if (newRecord) {
        console.log('Data save already')
    }
    record.save()
        .then((res) => {
            console.log('Id saved')
        }).catch((err) => {
            console.log(err)
        })
    res.redirect('/records')
})

// view data apis
app.get('/records/:id', async (req, res) => {
    let { id } = req.params
    let data = await records.findById(id)
    res.render('view', { data })
})

// get data or update apis
app.get('/records/:id/edit', async (req, res) => {
    let { id } = req.params
    let data = await records.findById(id)
    res.render('edit', { data })
})

// update data apis
app.put('/records/:id/', async (req, res) => {
    let { id } = req.params
    let getData = { email, classn, roll, phone, add } = req.body
    let data = await records.findByIdAndUpdate(
        id, getData, { runValidators: true, new: true }
    )
    console.log('Id updated')
    res.redirect('/records')
})

// delete data apis
app.delete('/records/:id', async (req, res) => {
    let { id } = req.params
    let data = await records.findByIdAndDelete(id)
    console.log('Id deleted')
    res.redirect('/records')
})

app.get('/', (req, res) => {        // server responced check
    res.send('Working Well : <a href="/records"> localhost:5500/records</a>')
})

app.listen(PORT, (req, res) => {        // server listen query
    console.log(`Server has started on : ${PORT}`)
})