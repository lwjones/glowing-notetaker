const router = require('express').Router();
const db = require('../../db/db.json');
const { createNote, findNoteByIndex, writeChanges } = require('../../lib/notes')


router.get('/notes', (req, res) => {
  res.json(db);
});


router.post('/notes', (req, res) => {
  // get note info from body and give it a unique id
  let newNote = createNote(req.body);

  // add note to db array
  db.push(newNote);

  // write changes to database
  writeChanges(db);

  // return all notes
  res.json(db);
});


router.delete('/notes/:id', (req, res) => {
  // identify the note
  const noteIndex = findNoteByIndex(req.params.id, db);

  // report 400 if not found
  if (noteIndex < 0) {
    res.status(400).send(`Note with ID ${req.params.id} not found. Check id of target.`);
    return;
  }

  // remove note from database
  db.splice(noteIndex, 1);

  // write changes to database
  writeChanges(db);

  // return all notes
  res.json(db);
});


module.exports = router;
