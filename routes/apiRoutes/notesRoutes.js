const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const router = require('express').Router();
const db = require('../../db/db.json');
const { createNote, filterOutById, writeChanges } = require('../../lib/notes')


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
  // identify the note and filter it out
  const newNotesDB = filterOutById(req.params.id, db);

  // report 400 if no changes
  if (newNotesDB.length === db.length) {
    res.status(400).send(`Note with ID ${deleteNoteId} not found. Check id of target.`);
    return;
  }

  // write changes to database
  writeChanges(newNotesDB)

  // return all notes
  res.json(newNotesDB);
});


module.exports = router;
