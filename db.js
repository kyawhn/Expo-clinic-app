import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('clinic.db');

export function initDB() {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);'
    );
  });
}

export function insertPatient(name, age, cb) {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO patients (name, age) VALUES (?,?)', [name, age], (_, result) => {
      cb(result.insertId);
    });
  });
}

export function fetchPatients(cb) {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM patients', [], (_, { rows }) => {
      cb(rows._array);
    });
  });
}
