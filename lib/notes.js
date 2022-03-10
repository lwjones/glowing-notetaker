const PATH_TO_DATABASE = ('../db/db.json');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');


/**
 * Creates a new note object assigning it a unique identifier.
 * @param {object} noteData Data for a new note. noteData should have a title,
 * and text. If an id already exists, the id is unchanged.
 * @returns new note object
 */
function createNote(noteData) {
  if (!noteData.id) noteData.id = uniqid.process();
  return noteData;
}


/**
 * Finds the index of a note by a given id.
 * @param {*} targetId Unique identifier of note
 * @param {*} database JSON formatted dataset
 * @returns  Index of found note, or `-1` for not found
 */
function findNoteByIndex(targetId, database) {
  const index = database.findIndex(note => note.id === targetId);
  return index;
}


/**
 * Writes given json to a specified file and path. If data already exists
 * in the file, it is overwritten with the new data.
 * @param {json} database JSON formatted dataset
 * @param {string} pathToDatabase Path to database/json file
 */
function writeChanges(database) {
  fs.writeFileSync(
    path.join(__dirname, PATH_TO_DATABASE),
    JSON.stringify(database, null, 2)
  );
}


module.exports = {
  createNote,
  findNoteByIndex,
  writeChanges
}