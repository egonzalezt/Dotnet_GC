---
sidebar_position: 2
---

# Types

.NET GC has different types of GC depending on which kind of application is going to be built

The garbage collector is self-tuning and can work in a wide variety of scenarios. However, you can set the type of garbage collection based on the characteristics of the workload. The CLR provides the following types of garbage collection:

* Workstation garbage collection (GC), which **is designed for client apps.** It's the default GC flavor for standalone apps.

    Workstation garbage collection can be concurrent or non-concurrent. Concurrent (or background) garbage collection enables managed threads to continue operations during a garbage collection.

* Server garbage collection, which is intended for server applications that need high throughput and scalability.

    * In .NET Core, server garbage collection can be non-concurrent or background.

    ![Server GC](./img/gc-server.png)


If you're running hundreds of instances of an application, consider using workstation garbage collection with concurrent garbage collection disabled. This will result in less context switching, which can improve performance.

The workstation GC is designed for single-processor systems and is the default mode for desktop applications. It uses a single thread to perform garbage collection and is optimized for low-latency applications where pause times must be kept to a minimum.

The server GC, on the other hand, is designed for multiprocessor systems and is the default mode for server applications. It uses multiple threads to perform garbage collection in parallel, which can result in faster and more efficient collection of large heaps. The server GC is optimized for throughput-oriented applications where overall performance is more important than low pause times.

By default, the .NET runtime chooses the appropriate GC mode based on the number of processors on the system. If the system has one or two processors, the workstation GC is used, while systems with more than two processors use the server GC. However, the GC mode can be manually configured using application configuration settings.

### Containers

If you are running .NET containerized application the memory limits and CPU limits are based on the config of the container and not the real system specifications where the container is hosted

To learn more about containers please visit:

* [Running with Server GC in a Small Container Scenario Part 0](https://devblogs.microsoft.com/dotnet/running-with-server-gc-in-a-small-container-scenario-part-0/)

* [Running with Server GC in a Small Container Scenario Part 1 – Hard Limit for the GC Heap](https://devblogs.microsoft.com/dotnet/running-with-server-gc-in-a-small-container-scenario-part-1-hard-limit-for-the-gc-heap/)

## Background garbage collection

In background garbage collection (GC), ephemeral generations (0 and 1) are collected as needed while the collection of generation 2 is in progress. Background garbage collection is performed on one or more dedicated threads, depending on whether it's a workstation or server GC, and applies only to generation 2 collections.

In .NET, foreground garbage collection occurs when a collection on ephemeral generations is initiated during background garbage collection. When this happens, all managed threads are suspended as well, and this leads to a UI freeze. This is a "pure" blocking GC. Background garbage collection occurs automatically and runs in a separate thread from the application's main thread. When the background garbage collector detects that enough objects have been allocated in generation 0, it may initiate a foreground garbage collection on generation 0 or generation 1. 

During background garbage collection, the garbage collector thread frequently checks to see if a request for foreground garbage collection has been made. If it has, the background collection suspends itself to allow the foreground garbage collection to occur. Once the foreground garbage collection is complete, the dedicated background garbage collection thread and user threads resume.

Background workstation garbage collection uses one dedicated background garbage collection thread, whereas background server garbage collection uses multiple threads. Typically, there's a dedicated thread for each logical processor.

### Background Server GC 

![Background Server GC](./img/background-server-garbage-collection.png)

### Workstation Server GC 

![Workstation Server GC](./img/background-workstation-garbage-collection.png)
