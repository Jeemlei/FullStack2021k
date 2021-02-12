const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => person.id == req.params.id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const newPerson = { ...req.body, id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) }

    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    } else if (persons.find(person => person.name === newPerson.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id != id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})