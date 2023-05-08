# Performance 

There are different methods to test and check if your .Net applications have a potential memory leak

## Examples

[Introduction to C# Memory Leak](https://www.educba.com/c-sharp-memory-leak/)

* Not disposing of disposable objects: 

    If you create an object that implements the IDisposable interface, you need to ensure that you call the Dispose method on that object when you are finished with it. Failing to do so can result in a memory leak. For example, consider the following code:

    ```csharp
    public void CreateFile()
    {
        var fileStream = new FileStream("file.txt",     FileMode.Create);
        // do some work with the file
        // ...
    }
    ```
    In this code, a FileStream object is created but is never disposed of. This can result in a memory leak because the file stream will hold onto resources until it is disposed of. To fix this, you can add a using statement to ensure that the file stream is disposed of when it is no longer needed:

    ```csharp
    public void CreateFile()
    {
        using var fileStream = new FileStream("file.    txt", FileMode.Create);
        // do some work with the file
        // ...
    }
    ```

* Holding onto references to objects that are no longer needed: 

    If you hold onto a reference to an object that is no longer needed, it can prevent the garbage collector from freeing up memory. For example, consider the following code:

    ```csharp
    public void CreateBigObject()
    {
        var bigObject = new byte[100000000]; //allocate a large byte array
        // do some work with the big object
        // ...
        // forget to set bigObject to null or dispose it
    }
    ```

    In this code, a large byte array is allocated but is never released. This can result in a memory leak because the array will hold onto memory until the garbage collector runs and identifies it as no longer being used. To fix this, you can set the `bigObject` variable to null or dispose of it when it is no longer needed:

    ```csharp
    public void CreateBigObject()
    {
        var bigObject = new byte[100000000]; // allocate a large byte array
        // do some work with the big object
        // ...
        bigObject = null; // set bigObject to null to release the memory
    }
    ```

* Using event handlers without removing them: 

    If you subscribe to an event in .NET but do not unsubscribe from it, it can result in a memory leak. For example, consider the following code:

    ```csharp
    public class Example
    {
        private readonly Timer _timer;
        private int _count;

        public Example()
        {
            _timer = new Timer(1000);
            _timer.Elapsed += OnTimerElapsed;
            _timer.Start();
        }

        private void OnTimerElapsed(object sender, ElapsedEventArgs e)
        {
            _count++;
            // do some work
        }
    }
    ```

    In this code, an event handler is added to a timer object but is never removed. This can result in a memory leak because the event handler will hold onto a reference to the Example object and prevent it from being garbage collected. To fix this, you can unsubscribe from the event when it is no longer needed:

    ```csharp
    public class Example
    {
        private readonly Timer _timer;
        private int _count;

        public Example()
        {
            _timer = new Timer(1000);
            _timer.Elapsed += OnTimerElapsed;
            _timer.Start();
        }

        private void OnTimerElapsed(object sender, ElapsedEventArgs e)
        {
            _count++;
            // do some work
        }

        public void Stop()
        {
            _timer.Stop();
            _timer.Elapsed -= OnTimerElapsed; // unsubscribe from the event
        }
    }
    ```

* [Managed memory leaks in .NET by DeLeaker](https://www.deleaker.com/blog/2022/04/12/managed-memory-leaks-in-net/#wpf-leaks)

* [Unmanaged memory leaks in .NET by DeLeaker](https://www.deleaker.com/blog/2021/03/19/unmanaged-memory-leaks-in-dotnet/)

## Tips

Please refer to this doc made by [Maoni0](https://github.com/Maoni0/mem-doc/blob/master/doc/.NETMemoryPerformanceAnalysis.md)

## Tools

* [Visual Studio Diagnostic Tools](https://visualstudio.microsoft.com/vs/features/debugging-and-diagnostics/): Visual Studio has built-in diagnostic tools that can be used to detect memory leaks in .NET applications. These tools include a memory profiler that can help identify memory leaks and other performance issues.

* [ANTS Memory Profiler](https://www.red-gate.com/products/dotnet-development/ants-memory-profiler/): ANTS Memory Profiler is another third-party memory profiling tool for .NET applications. It provides detailed information about memory usage and can help identify memory leaks and other memory-related issues.

* [dotMemory](https://www.jetbrains.com/dotmemory/): dotMemory is a memory profiling tool from JetBrains that can help identify memory leaks and other performance issues in .NET applications. It provides detailed information about memory usage and can help pinpoint the source of memory leaks.

* [SciTech .NET Memory Profiler](https://memprofiler.com/): SciTech .NET Memory Profiler is a comprehensive memory profiling tool that can help detect memory leaks, memory fragmentation, and other memory-related issues in .NET applications. It provides advanced profiling capabilities and detailed reports about memory usage.

* [MemoryDumpAnalyzer](https://devblogs.microsoft.com/visualstudio/managed-memory-dump-analyzers/): MemoryDumpAnalyzer is a free tool from Microsoft that can help analyze memory dumps and identify memory leaks and other memory-related issues in .NET applications. It provides a graphical user interface for analyzing memory dumps and identifying memory-related issues.

These tools can help developers identify memory leaks and other memory-related issues in .NET applications and can aid in optimizing application performance and reducing memory usage.
