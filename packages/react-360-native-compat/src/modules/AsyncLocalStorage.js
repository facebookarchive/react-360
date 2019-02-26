/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

type Row = [string, ?string];
type Rows = Array<Row>;

/**
 * Implementation of React Native's AsyncLocalStorage API, built on top of
 * IndexedDB
 */
export default class AsyncLocalStorage {
  // Cache the database handle once it has been opened
  _db: IDBDatabase | null;

  constructor() {
    this._db = null;
  }

  /**
   * Open the IndexedDB where we are persisting our store.
   * The schema we use allows us to implement a simple key-value store with
   * IndexedDB's row-based semantics. We create a table called 'pairs' which
   * contains objects of the form:
   *   {key: string, value: any}
   * The field called 'key' is uniquely indexed and used as our lookup value.
   * _prepareDB() initializes this database if it has not yet been created,
   * and returns a Promise that resolves with the database handle.
   */
  _prepareDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this._db) {
        return resolve(this._db);
      }
      // Open the database called 'AsyncStorage'
      const request = window.indexedDB.open('AsyncStorage', 1);
      request.onerror = event => {
        reject({
          message: 'Error opening database',
        });
      };
      request.onupgradeneeded = event => {
        const db = event.target.result;
        // If the database has not been created yet, create an object store
        // called 'pairs', with an index called 'key'
        db.createObjectStore('pairs', {keyPath: 'key'});
      };
      request.onsuccess = event => {
        const db = event.target.result;
        this._db = db;
        resolve(db);
      };
    });
  }

  /**
   * _getRow is a Promise wrapper around IndexedDb's get function.
   * If the get succeeds, it resolves the Promise with the retrieved value.
   * Attempting to get a row that does not exist should succeed, returning
   * a value of undefined.
   * If the get fails, it rejects the Promise with the error and the key.
   */
  _getRow(objectStore: IDBObjectStore, key: string): Promise<Row> {
    return new Promise((resolve, reject) => {
      const request = objectStore.get(key);
      request.onerror = event => {
        reject({
          message: event.target.error.name,
          key: key,
        });
      };
      request.onsuccess = event => {
        const row = event.target.result;
        if (!row) {
          resolve([key, undefined]);
        } else {
          resolve([row.key, row.value]);
        }
      };
    });
  }

  /**
   * _putRow is a Promise wrapper around IndexedDb's put function.
   * A put replaces a row if it previously existed, so it provides the behavior
   * we need for setting a value in a key-value store.
   * If the put succeeds, it resolves the Promise.
   * If the put fails, it rejects the Promise with the error and the key.
   */
  _putRow(objectStore: IDBObjectStore, row: {[key: string]: string}): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = objectStore.put(row);
      request.onerror = event => {
        reject({
          message: event.target.error.name,
          key: row.key,
        });
      };
      request.onsuccess = () => {
        resolve();
      };
    });
  }

  /**
   * _deleteRow is a Promise wrapper around IndexedDb's delete function.
   * A delete should succeed even if the row does not exist.
   * If the delete succeeds, it resolves the Promise.
   * If the delete fails, it rejects the Promise with the error and the key.
   */
  _deleteRow(objectStore: IDBObjectStore, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = objectStore.delete(key);
      request.onerror = event => {
        reject({
          message: event.target.error.name,
          key: key,
        });
      };
      request.onsuccess = () => {
        resolve();
      };
    });
  }

  /**
   * multiGet is a public API that fetches the values associated with a set of
   * keys. Once they have been retrieved, the callback will be called with
   * an array containing pairs of the form:
   *   [key, value]
   * arranged in the same order that the keys were.
   * If one of the get operations fails, it will pass an error to the callback
   * with the key that failed.
   */
  multiGet(keys: Array<string>, cb: (?Error, ?Rows) => void): void {
    this._prepareDB()
      .then(db => {
        const transaction = db.transaction(['pairs']);
        const objectStore = transaction.objectStore('pairs');
        const gets = [];
        keys.forEach(key => gets.push(this._getRow(objectStore, key)));
        return Promise.all(gets);
      })
      .then(rows => cb(undefined, rows), err => cb(err));
  }

  /**
   * multiSet is a public API that places key-value pairs into the database.
   * It takes these pairs as an array of values in the form:
   *   [key, value]
   * If one of the set operations fails, it will pass an error to the callback
   * with the key that failed.
   */
  multiSet(pairs: Array<[string, string]>, cb: (?Error) => void): void {
    this._prepareDB()
      .then(db => {
        const transaction = db.transaction(['pairs'], 'readwrite');
        const objectStore = transaction.objectStore('pairs');
        const puts = [];
        pairs.forEach(pair => {
          const row = {key: pair[0], value: pair[1]};
          puts.push(this._putRow(objectStore, row));
        });
        return Promise.all(puts);
      })
      .then(() => cb(), err => cb(err));
  }

  /**
   * multiRemove is a public API that removes entries from the database.
   * If one of the remove operations fails, it will pass an error to the
   * callback with the key that failed.
   */
  multiRemove(keys: Array<string>, cb: (?Error) => void): void {
    this._prepareDB()
      .then(db => {
        const transaction = db.transaction(['pairs'], 'readwrite');
        const objectStore = transaction.objectStore('pairs');
        const deletes = [];
        keys.forEach(key => deletes.push(this._deleteRow(objectStore, key)));
        return Promise.all(deletes);
      })
      .then(() => cb(), err => cb(err));
  }

  /**
   * clear removes all rows from the database. It calls into IndexedDB's clear
   * operation. Once it has completed, it calls the callback. If an error
   * occurs, it will be passed to the callback.
   */
  clear(cb: (?Error) => void): void {
    this._prepareDB()
      .then(db => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['pairs'], 'readwrite');
          const objectStore = transaction.objectStore('pairs');
          const request = objectStore.clear();
          request.onerror = event => {
            reject(event.target.error);
          };
          request.onsuccess = () => {
            resolve();
          };
        });
      })
      .then(() => cb(), err => cb(err));
  }

  /**
   * getAllKeys retrieves all keys currently stored in the database.
   * It uses an IndexedDB cursor to iterate through the entire table, without
   * needing to allocate space for all of the values as well.
   * When all keys have been fetched, they are passed to the callback.
   * If an error occurs, it is passed to the callback.
   */
  getAllKeys(cb: (?Error, ?Array<string>) => void): void {
    this._prepareDB()
      .then(db => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['pairs']);
          const objectStore = transaction.objectStore('pairs');
          const request = objectStore.openCursor();
          const keys = [];
          request.onerror = event => {
            reject(event.target.error);
          };
          request.onsuccess = event => {
            const cursor = event.target.result;
            if (cursor) {
              keys.push(cursor.key);
              cursor.continue();
            } else {
              resolve(keys);
            }
          };
        });
      })
      .then(keys => cb(undefined, keys), err => cb(err));
  }
}
