---
sidebar_position: 4
---

# Heaps

Heaps are memory areas allocated to each program. Memory allocated to heaps can be dynamically allocated, unlike memory allocated to stacks.

As a result, the heap segment can be requested and released whenever the program needs it. This memory is also global, which means that it can be accessed and modified from wherever in the program it is allocated instead of being localized by the function in which it is allocated. 

In .NET [generations](/GC/Generations.md) uses heaps to locate the different objects

## Large Object Heap (LOH)

The .NET garbage collector (GC) divides objects into small and large objects. When an object is large, some of its attributes become more significant than if the object is small. For instance, compacting it, and copying it in memory elsewhere on the heap can be expensive. Because of this, the garbage collector places large objects on the large object heap (LOH).

When an object allocation request is for 85,000 or more bytes, the runtime allocates it on the large object heap (LOH), which is sometimes referred to as generation 3. Generation 3 is a physical generation that's logically collected as part of Generation 2. Large objects belong to Generation 2 because they are collected only during a Generation 2 collection. Newly allocated objects form a new generation of objects and are implicitly generation 0 collections. However, if they survive, they get promoted to the next generation. When a garbage collection is triggered, the GC traces through the live objects and compacts them. The GC sweeps the LOH and makes a free list out of dead objects that can be reused later to satisfy large object allocation requests.

## When LOH is collected?
In general, a GC occurs under one of the following three conditions:

Allocation exceeds the generation 0 or large object threshold.

The threshold is a property of a generation. A threshold for a generation is set when the garbage collector allocates objects into it. When the threshold is exceeded, a GC is triggered on that generation. When you allocate small or large objects, you consume generation 0 and the LOH's thresholds, respectively. When the garbage collector allocates into generation 1 and 2, it consumes their thresholds. These thresholds are dynamically tuned as the program runs.

This is the typical case; most GCs happen because of allocations on the managed heap.

The GC.Collect method is called.

If the parameterless GC.Collect() method is called or another overload is passed GC.MaxGeneration as an argument, the LOH is collected along with the rest of the managed heap.

The system is in a low memory situation.

This occurs when the garbage collector receives a high-memory notification from the OS. If the garbage collector thinks that doing a generation 2 GC will be productive, it triggers one.

## LOH performance implications

Allocations on the large object heap impact performance in the following ways.

### Allocation cost.

The CLR makes the guarantee that the memory for every new object it gives out is cleared. This means the allocation cost of a large object is dominated by memory clearing.

### Collection cost.

Because the LOH and generation 2 are collected together, if either one's threshold is exceeded, a generation 2 collection is triggered. If a generation 2 collection is triggered because of the LOH, generation 2 won't necessarily be much smaller after the GC. If there's not much data on generation 2, this has minimal impact. But if generation 2 is large, it can cause performance problems if many generations 2 GCs are triggered.

### Array elements with reference types.

Very large objects on the LOH are usually arrays (it's very rare to have an instance object that's really large). If the elements of an array are reference-rich, it incurs a cost that is not present if the elements are not reference-rich. If the element doesn't contain any references, the garbage collector doesn't need to go through the array at all.
