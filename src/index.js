const express = require('express')
const mongoose = require('mongoose');
const config = require('./config');


const app = express()
app.use(express.json())
const port = 3000

// add DB
mongoose.connect(config.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })

const Character = mongoose.model('Characters', {
    name: String,
    description: String,
    image_url: String
})

app.get('/', async (req, res) => {
    const characters = await Character.find()
    return res.send(characters)
})

app.post('/', async (req, res) => {
    const character = new Character({
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url
    })

    await character.save();
    return res.send(character);
})

app.put('/:id', async (req, res) => {
    const character = await Character.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url
    }, {
        new: true
    })

    return res.send(character);
})

app.delete('/:id', async (req, res) => {
    const character = await Character.findByIdAndDelete(req.params.id)

    return res.send(character);
})

app.listen(port, () => {
    console.log(`Access success ${port}`)
})