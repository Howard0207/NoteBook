# 宏任务、微任务与事件循环

## JavaScript的单线程机制

在聊事件循环之前，我们有必要聊一下JavaScript的单线程机制。

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript 不能有多个线程呢 ？这样能提高效率啊。

JavaScript 的单线程和他的使用环境息息相关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 同步任务和异步任务

上面讲过了JavaScript是单线程的，JavaScript执行过程就像排队上厕所，需要排队一个一个上厕所，同理JavaScript任务也要一个一个顺序执行。如果一个任务耗时过长，那么后一个任务也必须等着。那么问题来了，前面朋友不出来，后面的朋友就要尿裤子了。基于类似原因，JavaScript将任务分为两类：

- 同步任务
  
  同步任务就是上面所讲的上厕所排队的例子，所有的语句依次执行（前一条语句执行完了才会执行下一条语句）。

- 异步任务

  生活中有很多类似的例子， 餐厅排号吃饭， 银行排号办业务等等（先做一个登记，等轮到你了自然会叫你）。

## 宏任务与微任务

上面讲述了什么是同步任务和什么是异步任务。如果还是不理解，那就忘了他吧。

异步任务又分为：**宏任务** 和 **微任务**。

接下来我们看看有哪些异步任务属于宏任务，哪些任务属于微任务。

### 宏任务

| API                   | 浏览器 | Node |
| --------------------- | :----: | ---: |
| I/O                   |   ✅    |    ✅ |
| setTimeout            |   ✅    |    ✅ |
| setInterval           |   ✅    |    ✅ |
| setImmediate          |   ❌    |    ✅ |
| requestAnimationFrame |   ✅    |    ❌ |


### 微任务

| API                        | 浏览器 | Node |
| -------------------------- | :----: | ---: |
| process.nextTick           |   ❌    |    ✅ |
| MutationObserver           |   ✅    |    ❌ |
| Promise.then catch finally |   ✅    |    ✅ |


<EventLoop></EventLoop>