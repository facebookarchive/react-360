# RefCountCache - Data structure for managing external resources

RefCountCache is a handy data structure for managing external resources,
especially ones that have significant parse time or are too heavy to maintain
in memory forever. Videos, buffered audio, or WebGL textures are all examples
of objects that are best to keep around in memory as long as they're needed, but
take up significant space.

RefCountCache can be seen as a key-value store that keeps track of which values
are currently referenced in code, and eventually disposes of those that are no
longer used. As long as there is at least one reference to a value, it is
guaranteed to be found in the cache. When the number of external references
drops to zero, it is not immediately deleted, but is placed in line to be
disposed. This helps account for scenarios where an object frequently moves
in and out of use. The queue has some maximum size, and if it grows too large,
the oldest items in the queue will be removed from the cache.

When an item has zero references, it is guaranteed to be in line for disposal.
If it is referenced again before it is removed entirely, it will be removed from
the disposal queue. As long as there is at least one reference to an object, it
will never be removed from the cache.

Your cache instance can be constructed with a custom cleanup method. This is
useful for objects that need to be manually disposed, like WebGL resources. The
cleanup method takes two arguments: the string path used to store / retrieve the
object, and the actual value stored in the cache.

```js
function cleanUpTexture(path, tex) {
  // called when removed from cache
  glContext.deleteTexture(tex);
}

const textureCache = new RefCountCache(cleanUpTexture);

const tex = glContext.createTexture();
textureCache.addEntry('myTexture', tex);
```

## API

The constructor of `RefCountCache` takes two optional arguments. The first is
the cleanup method, described above. A cleanup method takes two arguments: the
path used to store the object, and the actual object stored in the cache. A
`RefCountCache` does not need a cleanup method.

The second argument is an options object used to configure the cache. It
currently supports the following keys:

 - `queueSize`: the maximum size of the ejection queue, defaults to `20`
