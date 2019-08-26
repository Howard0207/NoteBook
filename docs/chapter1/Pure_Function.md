# 纯函数

## 纯函数的定义

:::tip
如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。该函数不会产生任何可观察的副作用。在数学领域中，纯函数也叫做映射函数。
:::

结合以下两张图片，我们回忆一下8年级数学知识。

![纯函数](/relation-function.gif '纯函数')

上图生动的展示了一个合法的从 x 到 y 的函数关系；每个输入都只会有一个输出，但不同的输入却可以有相同的输出。
相反，下面这张图表展示的就不是一种函数关系，因为输入值 5 指向了多个输出：

![非纯函数](/relation-not-function.gif '非纯函数')



回到我们的js中，举个简单的小例子：

```js
let arr = [1,2,3,4,5];
// 纯函数
let pure = index => arr[index]

// 非纯函数
let unpure = index => arr[Math.round(Math.random()*index)]
```

## 纯函数的特点

1. 函数的返回结果只依赖于它的参数。
2. 函数执行过程里面没有副作用。


```js
let arr = [1,2,3,4,5];
// 纯函数
let pure = index => arr[index]
```

还是里用上面这个函数来做一个解释，对于pure函数来讲， 给定输入index 就会得到一个确定的返回值， 返回值只跟index输入有关。另外这个函数不对函数外部任何功能、变量、对象等产生影响，这里我们对这种影响叫作副作用。那么什么是副作用呢。我们继续往下看。


## 什么是可观察的副作用
一个可以被观察的副作用是在函数内部与其外部的任意交互。这可能是在函数内修改外部的变量，或者在函数里调用另外一个函数等。
注: 如果纯函数调用纯函数，则不产生副作用依旧是纯函数。
副作用来自，但不限于：

- 进行一个 HTTP 请求
- Mutating data
- 输出数据到屏幕或者控制台
- DOM 查询/操作
- Math.random()
- 获取的当前时间
- 修改函数作用域之外的变量
- 更改文件系统
- 往数据库插入记录
- 获取用户输入
- 访问系统状态

## Examples

## 追求“纯”的理由

- ### 可缓存性（Cacheable）
    首先，纯函数总能够根据输入来做缓存。实现缓存的一种典型方式是 memoize 技术：
    ```js
        let squareNumber  = param => param * param;
        squeareNumber(2)
        // => 4
        squeareNumber(2)
        // => 4
    ```
    
    这是一个简单的计算数值平方的函数，每次执行该函数的时候都要进行一次计算。下面我们对他进行一个小小的优化。
    
    ```js
        let memoize = fn => {
            let cache = {}
            return function () {
                let arg_str = JSON.stringify(arguments)
                cache[arg_str] = cache[arg_str] || fn.apply(fn, arguments)
                return cache[arg_str]
            }
        }

        let squareNumber  = memoize(param => param * param)

        squeareNumber(2)
        // => 4 经过计算获得输出
        squeareNumber(2)
        // => 4 从缓存中获得输出
    ```

    通过延迟执行的方式把不纯的函数转换为纯函数：
    ```JS
    let pureHttpCall = memoize(function(url, params){
        return () => $.getJSON(url, params)
    })
    ```
    这个例子关键之处是我们并没有真正发送 http 请求，只是返回了一个函数，当调用它的时候才会发请求。这个函数之所以有资格成为纯函数，是因为它总是会根据相同的输入返回相同的输出：给定了 url 和 params 之后，它就只会返回同一个发送 http 请求的函数。

    这个例子的重点是我们可以缓存任意一个函数，不管它们看起来多么具有破坏性，当我们将它和函数的柯里化联系起来就会发现它的意义。

- ### 可移植性／自文档化（Portable / Self-Documenting）

- ### 可测试性（Testable）


- ### 合理性（Reasonable）

- ### 并行代码

## 总结

到这里，你已经对 TypeScript 有了一个大致的印象，那么下一章让我们来一起学习 TypeScript 的一些常用语法吧。




