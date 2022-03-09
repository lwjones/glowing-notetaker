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
 * Filters out an object with a given id from an array. If no object is
 * identified, a copy of the original array is returned.
 * @param {string} idToDelete unique id of object to delete
 * @param {array} database Array of objects
 * @returns A new array with identified object removed
 */
function filterOutById(idToDelete, database) {
 return database.filter(item => item.id !== idToDelete);
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
  filterOutById,
  writeChanges
}