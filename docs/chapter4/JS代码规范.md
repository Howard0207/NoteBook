# Javascript编码规范


## 变量命名

- 标准变量采用驼峰式命名（除了对象的属性外，主要是考虑到cgi返回的数据）
- 'ID'在变量名中全大写
- 'URL'在变量名中全大写
- 常量全大写，用下划线连接
- 构造函数，大写第一个字母

```js
var thisIsMyName;

var goodID;

var reportURL;

var AndroidVersion;

var iOSVersion;

var MAX_COUNT = 10;

function Person(name) {
    this.name = name;
}
```

## 变量声明

一个函数作用域中所有的变量声明提到函数首部，除了for (...)里面使用的一次性变量。
  var的数量不做限制，但要统一，一行定义一个变量。

```js
// not good
function doSomethingWithItems(items) {
    var a,
        b;
    var value = 10;
    var result = value + 10;

    for (var i = 0, len = items.length; i < len; i++) {
        result += 10;
    }
}

// good
function doSomethingWithItems(items) {
    var a;
    var b;
    var value = 10;
    var result = value + 10;

    for (var i = 0, len = items.length; i < len; i++) {
        result += 10;
    }
}
```

## localStorage

由于Safari的隐身模式下本地存储会被禁用，如果你尝试往localStorage写数据的话，会报超出使用限制的错误：QuotaExceededError (DOM Exception 22): The quota has been exceeded.而Chrome的隐身窗口不会禁用。而使用Safari的用户可能会开隐身窗口，特别是手机上的。这样就导致代码抛异常了，所以为了兼容Safari，不能直接使用localStorage，要做个兼容：
```js
Data.hasLocalStorage = true;
try{
    window.localStorage.trySetData = 1;
}catch(e){
    Data.hasLocalStorage = false;
}
setLocalData: function(key, value){ 
    if(Data.hasLocalStorage){
        window.localStorage[key] = value;
    }
    else{   
        util.setCookie("_LOCAL_DATA_" + key, value, 1000);
    }
},
getLocalData: function(key){
    if(Data.hasLocalStorage){
        return window.localStorage[key];
    }
    else{
        return util.getCookie("_LOCAL_DATA_" + key);
    }
}
```
上面代码做了个兼容，如果不支持localStorage就使用cookie。要注意cookie一个域名最多只能有4kB，50个key，而本地存储限制为5Mb.


## 常用属性缓存

如下代码，频繁地使用了window.location这个属性
```js
let webLink = window.location.protocol + window.location.hostname;
if(openType === "needtoTouch"){
    webLink += "/admin/lead/list/page" + 
             window.location.search.replace(/openType=needToTouch(&?)/, "") + 
             window.location.hash;
}
```
可以先把它缓存一下，加快变量作用域查找
```js
let location = window.location;
let webLink = location.protocol + location.hostname;
if(openType === "needtoTouch"){
    webLink += "/admin/lead/list/page" +
                location.search.replace(/openType=needToTouch(&?)/, "") +       
                location.hash;
}
```
当把location变成一个局部变量之后，它的查找时间将明显快于全局变量。

## 三元运算

禁止嵌套

## null

- 适用场景：
    - 初始化一个将来可能被赋值为对象的变量
    - 与已经初始化的变量做比较
    - 作为一个参数为对象的函数的调用传参
    - 作为一个返回对象的函数的返回值
- 不适用场景：
    - 不要用null来判断函数调用时有无传参
    - 不要与未初始化的变量做比较

```js
// not good
function test(a, b) {
    if (b === null) {
        // not mean b is not supply
        ...
    }
}

var a;

if (a === null) {
    ...
}

// good
var a = null;

if (a === null) {
    ...
}
```

## undefined
- 永远不要直接使用undefined进行变量判断；
- 使用typeof和字符串'undefined'对变量进行判断。

```js
// not good
if (person === undefined) {
    ...
}

// good
if (typeof person === 'undefined') {
    ...
}
```

## jshint
- 用'===', '!=='代替'==', '!='；

- for-in里一定要有hasOwnProperty的判断；

- 不要在内置对象的原型上添加方法，如Array, Date；

- 不要在内层作用域的代码里声明了变量，之后却访问到了外层作用域的同名变量；

- 变量不要先使用后声明；

- 不要在一句代码中单单使用构造函数，记得将其赋值给某个变量；

- 不要在同个作用域下声明同名变量；

- 不要在一些不需要的地方加括号，例：delete(a.b)；

- 不要使用未声明的变量（全局变量需要加到.jshintrc文件的globals属性里面）；

- 不要声明了变量却不使用；

- 不要在应该做比较的地方做赋值；

- debugger不要出现在提交的代码里；

- 数组中不要存在空元素；

- 不要在循环内部声明函数；

- 不要像这样使用构造函数，例：new function () { ... }, new Object；

```js
	
// not good
if (a == 1) {
    a++;
}

// good
if (a === 1) {
    a++;
}

// good
for (key in obj) {
    if (obj.hasOwnProperty(key)) {
        // be sure that obj[key] belongs to the object and was not inherited
        console.log(obj[key]);
    }
}

// not good
Array.prototype.count = function(value) {
    return 4;
};

// not good
var x = 1;

function test() {
    if (true) {
        var x = 0;
    }

    x += 1;
}

// not good
function test() {
    console.log(x);

    var x = 1;
}

// not good
new Person();

// good
var person = new Person();

// not good
delete(obj.attr);

// good
delete obj.attr;

// not good
if (a = 10) {
    a++;
}

// not good
var a = [1, , , 2, 3];

// not good
var nums = [];

for (var i = 0; i < 10; i++) {
    (function(i) {
        nums[i] = function(j) {
            return i + j;
        };
    }(i));
}

// not good
var singleton = new function() {
    var privateVar;

    this.publicMethod = function() {
        privateVar = 1;
    };

    this.publicMethod2 = function() {
        privateVar = 2;
    };
};
```


## 分号

JS里面的表达式是可以不用分号结尾，例如Zepto的源码几乎没看到一个分号，但是我们还是提倡要每个句子后面都要加上分号，这样不容易出错。
在低版本浏览器（如： IE）中如果不加分号可能会报错。

## 括号

下列关键字后必须有大括号（即使代码块的内容只有一行）：if, else, for, while, do, switch, try, catch, finally, with。

```js
// not good
if (condition)
    doSomething();

// good
if (condition) {
    doSomething();
}
```

## 使用简便的转换

- 把字符串转整型可以使用+号
    ```js
    let maxPrice = +form.maxPrice.value;
    +号相当于Number
    let maxPrice = Number(form.maxPrice.value);
    ```
    parseInt和Number有一个很大的区别是parseInt("10px")结果为10，而Number(“10px”)是NaN。

- 把小数去掉尾数转成整型，可以使用 >> 0如果计算某个数字在第几排：
    ```js
    let _row = Math.floor(index / columns);
    let row = parseInt(index / columns);
    都可改成
    let row = index / columns >> 0;
    ```
    这个用位运算的效率会明显高于上面两个。

- 转成boolean值用!!
    ```js
    let mobile = !!ua.match(/iPhone|iPad|Android|iPod|Windows Phone/)
    ```


## 使用正则表达式做字符串处理

正则表达式可以很方便地处理字符串，通常只要一行代码就搞定了。

```js
// 去掉全局的某一个字符，如去掉电话号码的-连接符
phoneNumer = phoneNumber.replace(/\-/g, "");
//或者反过来，把电话号码改成3-3-4的形式：
phoneNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
```

## 函数注释

```js
/**
 * @desc 一个带参数的函数
 * @param {string} a - 参数a
 * @param {number} b=1 - 参数b默认值为1
 * @param {string} c=1 - 参数c有两种支持的取值</br>1—表示x</br>2—表示xx
 * @param {object} d - 参数d为一个对象
 * @param {string} d.e - 参数d的e属性
 * @param {string} d.f - 参数d的f属性
 * @param {object[]} g - 参数g为一个对象数组
 * @param {string} g.h - 参数g数组中一项的h属性
 * @param {string} g.i - 参数g数组中一项的i属性
 * @param {string} [j] - 参数j是一个可选参数
 * @return {string} result
 */
function foo(a, b, c, d, g, j) {
    ...
    return "";
}
```

<br/><br/><br/>
> 以上内容参考：<br/>
> [掘金▪HTML/CSS/JS编码规范](https://juejin.im/post/599ececb5188252423583c27#heading-72)<br/>
> [腾讯IMWEB](http://imweb.github.io/CodeGuide/#js-indentation)<br/>