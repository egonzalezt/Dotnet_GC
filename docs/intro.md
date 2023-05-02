---
sidebar_position: 1
---

# What is GC

Garbage collector is a tool used to manage the memory, which means that manages the allocation and release of memory for an application. This helps to avoid developers to control how managed code will release memory this is an automated process that can eliminate common problems such as forgetting to free an object and causing a memory leak or attempting to access freed memory for an object that's already been freed.

## Benefits

* Managed code will be managed by GC, developers don't need to worry about it

* Allocates objects on the managed heap efficiently.

* Reclaims objects that are no longer being used, clears their memory, and keeps the memory available for future allocations. Managed objects automatically get clean content to start with, so their constructors don't have to initialize every data field.

* Provides memory safety by making sure that an object can't use for itself the memory allocated for another object.

## [Fundamentals of memory](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals#fundamentals-of-memory)

* Visit [Virtual Memory](/Memory/VirtualMemory.md)

* Each process has its own, separate virtual address space. All processes on the same computer share the same physical memory and the page file, if there's one.

* By default, on 32-bit computers, each process has a 2-GB user-mode virtual address space.

*   As an application developer, you work only with virtual address space and never manipulate physical memory directly. The garbage collector allocates and frees virtual memory for you on the managed heap.

* Virtual memory can be in three states:

    * Free: The block of memory has no references to it and is available for allocation.
    * Reserved: The block of memory is available for your use and can't be used for any other allocation request. However, you can't store data to this memory block until it's committed.
    * Committed: The block of memory is assigned to physical storage.

* You can run out of memory if there isn't enough virtual address space to reserve or physical space to commit.

* Virtual address space can get fragmented, which means that there are free blocks known as holes in the address space. When a virtual memory allocation is requested, the virtual memory manager has to find a single free block that is large enough to satisfy the allocation request. Even if you have 2 GB of free space, an allocation that requires 2 GB will be unsuccessful unless all of that free space is in a single address block.

Virtual memory is important for the GC because it allows the GC to allocate and free up memory as needed, even if the physical memory on the computer is limited. This means that the GC can continue to manage memory efficiently, even if the application is running on a computer with limited physical memory.

## When and how the GC is activated

Garbage collection occurs when one of the following conditions is true:

* The system has low physical memory. The memory size is detected by either the low memory notification from the operating system or low memory as indicated by the host.

* The memory that's used by allocated objects on the managed heap surpasses an acceptable threshold. This threshold is continuously adjusted as the process runs.

* Is possible to force the GC to collect memory

    You can force the GC calling this functions
    ```csharp
    GC.WaitForPendingFinalizers();
    GC.Collect();
    GC.WaitForPendingFinalizers();
    ```
:::danger
This process can impact the performance of the application for that reason this is option is not recommended on production applications. It is only recommended only for testing reasons.
:::

## Managed heap

The managed heap is a special heap that is used by .NET applications to allocate memory for objects and data storage. It is pre-allocated by the [CLR](https://learn.microsoft.com/en-us/dotnet/standard/clr) in each physical process that hosts .NET. The managed heap is used like traditional operating system heaps to allocate memory for objects and data storage. All instances of classes and arrays are created from a pool of memory known as the managed heap.

When an object is created in .NET, memory is allocated from the managed heap. As more objects are created, the managed heap grows to accommodate the new objects. Conversely, when an object is no longer in use, the memory it was using is deallocated and returned to the managed heap.

Garbage collector is responsible for managing the managed heap. It periodically scans the heap to determine which objects are no longer in use and can be deallocated. This process is called garbage collection.

**The fewer objects allocated on the heap, the less work the garbage collector has to do.** When you allocate objects, don't use rounded-up values that exceed your needs, such as allocating an array of 32 bytes when you need only 15 bytes.

The heap can be considered as the accumulation of two heaps: the large object heap and the small object heap. The large object heap contains objects that are `85,000 bytes` and larger, which are usually arrays. It's rare for an instance object to be extra large.

For that reason is very important to know which kind of [types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) you are gonna use because that will impact on the process of the GC to collect memory.

## Generations 

The GC algorithm is based on several considerations:

* It's faster to compact the memory for a portion of the managed heap than for the entire managed heap.
* Newer objects have shorter lifetimes, and older objects have longer lifetimes.
* Newer objects tend to be related to each other and accessed by the application around the same time.

Garbage collection primarily occurs with the reclamation of short-lived objects. To optimize the performance of the garbage collector, the managed heap is divided into three generations, 0, 1, and 2, so it can handle long-lived and short-lived objects separately. The garbage collector stores new objects in generation 0. Objects created early in the application's lifetime that survive collections are promoted and stored in generations 1 and 2. Because it's faster to compact a portion of the managed heap than the entire heap, this scheme allows the garbage collector to release the memory in a specific generation rather than release the memory for the entire managed heap each time it performs a collection.

## What happens during a garbage collection

A garbage collection has the following phases:

* A marking phase that finds and creates a list of all live objects.

* A relocating phase that updates the references to the objects that will be compacted.

* A compacting phase that reclaims the space occupied by the dead objects and compacts the surviving objects. The compacting phase moves objects that have survived a garbage collection towards the older end of the segment.

    Because generation 2 collections can occupy multiple segments, objects that are promoted into generation 2 can be moved into an older segment. Both generation 1 and generation 2 survivors can be moved to a different segment because they're promoted to generation 2.

    The large object heap (LOH) isn't compacted because copying large objects imposes a performance penalty. 

### How GC determines if objects are live

The garbage collector uses the following information to determine whether objects are live:

* Stack roots: Stack variables provided by the just-in-time (JIT) compiler and stack walker. JIT optimizations can lengthen or shorten regions of code within which stack variables are reported to the garbage collector.

* Garbage collection handles: Handles that point to managed objects and that can be allocated by user code or the common language runtime.

* Static data: Static objects in application domains that could be referencing other objects. Each application domain keeps track of its static objects.

Before a garbage collection starts, all managed threads are suspended except for the thread that triggered the garbage collection.

![HOW GC WORKS](./img/howGCworks.png)

This part is very important to keep in mind because this can affects the execution time of different process of your application and that's why GC should be called when the system determines when is needed to release memory. 

### Forcing GC to collect

Manually forcing the GC to collect memory can have negative performance implications, especially if it is done frequently or inappropriately.

When the GC runs, it scans the managed heap and identifies objects that are no longer being used by the application. It then frees up the memory occupied by these objects, making it available for future use. This process can be computationally expensive, especially for large heaps, and can cause temporary performance degradation as the application waits for the GC to complete.

If you force the GC to run frequently, it can cause unnecessary overhead and performance degradation. This is because the GC may be running when it does not need to, potentially leading to increased CPU usage and longer pauses in the application's execution.

#### When is beneficial calling GC

There are some situations where manually forcing the GC to run can be beneficial. For example, if your application creates a large number of short-lived objects, you can force the GC to run after the objects are no longer in use to free up memory more quickly. Similarly, if your application is about to enter a memory-intensive phase, you can force the GC to run to ensure that there is enough free memory available.

:::caution
Consider this option as the least viable unless it is strictly necessary and you are sure that it will not affect another flow, because if there are applications such as multiple workers or Apis this can negatively affect the application.
:::

## [Unmanaged resources](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals#unmanaged-resources)

The .NET garbage collector can manage the memory of most objects in an application, but for unmanaged resources such as operating system resources, explicit cleanup is required. These unmanaged resources can be encapsulated within a managed object, but the garbage collector does not know how to clean them up. To address this, it is recommended to create a public Dispose method that will release the unmanaged resources when the object is no longer needed. It is important for users of the object to call Dispose as necessary to ensure proper cleanup of unmanaged resources.


## Recommended Blogs or Docs

[Maoni Blog](https://devblogs.microsoft.com/dotnet/author/maoni/)

[Official .NET docs](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/)
