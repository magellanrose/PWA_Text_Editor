import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const editTextDb = await openDB('jate', 1);
    const text = editTextDb.transaction('jate', 'readwrite');
    const storeText = text.objectStore('jate');
    const requestTxt = storeText.put({
      value: content,
      id: 1
    })
    const output = await requestTxt;
    console.log('Data added to DB', output)
  } catch (error) {
    console.error('putDb not implemented')
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const editTextDb = await openDB('jate', 1);
    const text = editTextDb.transaction('jate', 'readonly');
    const storeText = text.objectStore('jate');
    const requestTxt = storeText.get(1);
    const output = await requestTxt;
    console.log('output.value', output)
    return output?.value;
  } catch (err) {
    console.err('getDb not implemented')
  }
};


initdb();
