---
id: async-storage
title: AsyncStorage
sidebar_label: AsyncStorage
---

AsyncStorage is a simple key-value storage system that allows you to persist data between multiple loads of your application. It is stored locally in the browser, so any users of the same browser will see the same data. This also means the data will not follow users from device to device – for that, you need to save objects to a server backend like Firebase.

The `AsyncStorage` JavaScript API is a simple facade that provides a clean Promise API around in-browser storage.

```js
// Persisting data
try {
  await AsyncStorage.setItem('my-storage-key', 'I like to save it.');
} catch (error) {
  // Error saving data
}
```

```js
// Fetching data
try {
  const value = await AsyncStorage.getItem('my-storage-key');
  if (value !== null) {
    // We have data!
    console.log(value);
  }
} catch (error) {
  // Error retrieving data
}
```

## Methods

### `static getItem(key: string): Promise`

Fetches an item for a `key`, returning a `Promise` that is resolved with the retrieved value, or rejected if an error occurs.

### `static setItem(key: string, value: string): Promise`

Sets the value for a `key`, returning a `Promise` that is resolved when the save completes, or rejected if an error occurs.

### `static removeItem(key: string): Promise`

Removes an item for a `key`, returning a `Promise` that is resolved if the remove is successful, or rejected if an error occurs.

### `static getAllKeys(): Promise`

Gets *all* keys known to your app, returning a `Promise` that is resolved with an array of key strings.

### `static multiGet(keys: Array<string>): Promise`

Batches the fetching of items specified in the array of `key` inputs. Returns a `Promise` that is resolved with a matching array of retrieved values, or rejected if any of the fetches fails.

### `static multiSet(keyValuePairs: Array<[string, string]>): Promise`

Batches the storage of multiple key-value pairs. Returns a `Promise` that is resolved if all stores succeed, or rejected if any fail.

### `static multiGet(keys: Array<string>): Promise`

Batches the removal of items specified in the array of `key` inputs. Returns a `Promise` that is resolved if all values are removed, or rejected if any of the deletions fails.