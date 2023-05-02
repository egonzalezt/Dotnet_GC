---
sidebar_position: 1
---

# Garbage Collector

The .NET garbage collector (GC) is responsible for managing the memory allocated by a .NET application. It automatically frees the memory that is no longer being used by the application, preventing memory leaks and other memory-related errors.

The GC works by periodically scanning the heap, which is the area of memory where objects are allocated, to identify objects that are no longer being used. The GC uses a combination of [reference counting](https://en.wikipedia.org/wiki/Reference_counting) and [mark-and-sweep algorithms](https://www.geeksforgeeks.org/mark-and-sweep-garbage-collection-algorithm/) to determine which objects are still in use.

Reference counting is a simple technique that counts the number of references to an object. When an object is created, its reference count is set to one. When a reference to the object is created, the reference count is incremented. When a reference to the object is removed, the reference count is decremented. When the reference count reaches zero, the object is considered to be no longer in use and is eligible for garbage collection.

The mark-and-sweep algorithm is used to find objects that are no longer in use but still have a reference count greater than zero. The algorithm works by starting with all objects in the heap and marking the objects that are still in use. Then, it sweeps through the heap and collects the objects that were not marked.