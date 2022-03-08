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

  // write changes to db
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(db, null, 2)
  );

  res.json(db);
});


module.exports = router;
