
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => {
    console.log('this is note.id', note.id)
    console.log('this is the noteId', noteId)
    return note.id === parseInt(noteId)
  })

export const getNotesForFolder = (notes = [], folderId) => {
  console.log('this is the folderId', folderId)
  return (!folderId)
    ? notes
    : notes.filter(note => note.folder_id === folderId)}


export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folder_id === folderId).length
