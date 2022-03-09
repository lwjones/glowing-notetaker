const {
  createNote,
  filterOutById,
  writeChanges
} = require("../lib/notes");


test('Creates a new note object', () => {
  let newNote = { 'title': 'Test note', 'text': 'Sample text' };
  newNote = createNote(newNote);

  expect(newNote.title).toBe('Test note');
  expect(newNote.text).toBe('Sample text');
  expect(newNote.id).not.toBeUndefined();
});


test('Filters out a note from an id', () => {
  const secondNoteId = '6AC5hp';
  const startingDB = [
    {
      'title': 'First note',
      'text': 'Some text for the first note',
      'id': '6AC5fg'
    },
    {
      'title': 'Second note',
      'text': 'More random text for the second note',
      'id': '6AC5hp'
    },
    {
      'title': 'Third note',
      'text': 'A little bit more text',
      'id': '6AL5Qz'
    }
  ]
  const endingDB = filterOutById(secondNoteId, startingDB);
  const expectedDB = [
    {
      'title': 'First note',
      'text': 'Some text for the first note',
      'id': '6AC5fg'
    },
    {
      'title': 'Third note',
      'text': 'A little bit more text',
      'id': '6AL5Qz'
    }
  ]

  expect(endingDB.length).toBeLessThan(startingDB.length);
  expect(endingDB).toEqual(expectedDB);
});
