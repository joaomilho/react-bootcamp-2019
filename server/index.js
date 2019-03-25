const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const { findIndex } = require('ramda')

const withDB = (fn, { readOnly = false } = {}) => {
  const db = require('./db.json')
  const newDB = fn(db)
  if (!readOnly)
    fs.writeFileSync(
      path.resolve(__dirname, 'db.json'),
      JSON.stringify(newDB, null, 2),
      'utf8'
    )
}

app.use(express.json())

app.get('/notes', (req, res) => res.sendFile('./db.json', { root: __dirname }))

app.post('/notes', (req, res) => {
  withDB(db => {
    const id = Math.max(...db.map(i => i.id)) + 1
    db.push({
      id,
      created: new Date().toISOString(),
      title: req.body.title,
      desc: req.body.desc
    })
    res.json({ id })

    return db
  })
})

app.get('/notes/:id', (req, res) => {
  withDB(
    db => {
      const note = db.find(i => i.id === parseInt(req.params.id))
      if (!note) {
        return res.status(404).end()
      }

      res.json(note)
    },
    { readOnly: true }
  )
})

app.put('/notes/:id', (req, res) => {
  withDB(db => {
    const { id } = req.params
    const note = db.find(i => i.id === parseInt(id))
    if (!note) {
      return res.status(404).end()
    }

    db = db.filter(i => i.id !== parseInt(id))
    db.push({ ...note, ...req.body })

    res.status(204).end()
    return db
  })
})

app.delete('/notes/:id', (req, res) => {
  withDB(db => {
    const { id } = req.params
    const note = db.find(i => i.id === parseInt(id))
    if (!note) {
      return res.status(404).end()
    }

    db = db.filter(i => i.id !== parseInt(id))

    res.status(204).end()
    return db
  })
})

app.listen(3123, () => console.log(`Example app listening on port 3123!`))
