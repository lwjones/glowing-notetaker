const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const router = require('express').Router();
const db = require('../../db/db.json');


router.get('/notes', (req, res) => {
  res.json(db);
});


router.post('/notes', (req, res) => {
  // get note info from body and give it a unique id
  const newNote = req.body;
  if (!newNote.id) newNote.id = uniqid.process();

  // add note to db array
  db.push(newNote);

  // write changes to database
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(db, null, 2)
  );

  // return all notes
  res.json(db);
});


router.delete('/notes/:id', (req, res) => {
  // identify the note and filter it out
  const deleteNoteId = req.params.id;
  const newNotesDB = db.filter(note => note.id !== deleteNoteId);

  // report 400 if no changes
  if (newNotesDB.length === db.length) {
    res.status(400).send(`Note with ID ${deleteNoteId} not found. Check id of target.`);
    return;
  }

  // write changes to database
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(newNotesDB, null, 2)
  );

  // return all notes
  res.json(newNotesDB);
});


module.exports = router;
