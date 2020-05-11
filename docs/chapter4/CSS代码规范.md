# CSS 编码规范

## 命名规范（遵循BEM）

使用小写字母，以中划线分隔; less/scss 中的变量、函数、混合、placeholder 采用驼峰式命名

```css
/* class */
.element-content {
  ...;
}

/* id */
#myDialog {
  ...;
}

/* 变量 */
$colorBlack: #000;

/* 函数 */
@function pxToRem($px) {
  ...;
}

/* 混合 */
@mixin centerBlock {
  ...;
}

/* placeholder */
%myDialog {
  ...;
}
```

BEM规范命名eg:

```css
.block { /* styles */ }
.block__element { /* styles */ } 
.block--modifier { /* styles */ }
```
其中的BEM分别对应block ， element 和 modifier。

### 什么是块?

在规范中，块表示一个组件的意思，这样看上去有点抽象，我们可以通过例子来学习，假设你要写一个按钮的组件。我们只需要设置了一个 .button 类的按钮，然后可以在任何\<button>按钮上使用该类，就可以生成该组件的传统样式。使用.button而不是用button的原因是因为类允许无限的可重用性，而即使是最基本的元素也可能改变样式。但是在实际的项目使用中，我们会发现一个按钮可能是大按钮，可能是小按钮，也可能是红色的，或者黄色的。于是就引申出了BEM的modifier。


### 什么是元素

元素是块的子节点。为了表明某个东西是一个元素，你需要在块名后添加 __element。所以，如果你看到一个像那样的名字，比如 form__row ，你将立即知道 .form 块中有一个 row 元素。

```html
<style>
    .form__row { /* styles */ }
</style>
<form class="form" action="">
   <div class="form__row"> 
  </div> 
</form> 
```

### 什么是修饰符?

修饰符是改变某个块的外观的标志。要使用修饰符，可以将 --modifier 添加到块中。
假如我们要添加一个默认按钮，一个主要按钮，一个大按钮，一个小按钮，一个主要的小按钮。
我们可以这样:
```html
 <button class=".button .button--default"></button>  
 <button class=".button .button--primary"></button>
 <button class=".button .button--large"></button>   
 <button class=".button .button--small"></button> 
 <button class=".button .button--primary .button--small"></button> 
```


BEM 元素有两个优点 ：

- 你可以让 CSS 的优先级保持相对扁平。
- 你能立即知道哪些东西是一个子元素。

### 总结

以上就是简单的BEM规范和使用方法的简单介绍。基本的BEM规范的使用可以解决之前提到的一些问题：

class 的数量必须尽可能少 ，防止了css的优先级竞争。
立即知道一个 class 放在这个伟大工程中的什么地方，以防止大脑过载。
但是还有在实际应用中还有一些问题没有解决。

我必须 立即知道组件是否使用 JavaScript 。
我必须 立即知道编辑一个 class 是否安全,会不会干扰其他 CSS。
剩下的问题，我们就需要命名空间配合BEM来解决。

## 缩进

使用 soft tab（4 个空格）。

```css
.element {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
}
```

## 分号

每个属性声明末尾都要加分号。

```css
.element {
  width: 20px;
  height: 20px;

  background-color: red;
}
```

## 空格

以下几种情况不需要空格：

- 属性名后
- 多个规则的分隔符','前
- !important '!'后
- 属性值中'('后和')'前
- 行末不要有多余的空格

以下几种情况需要空格：

- 属性值前
- 选择器'>', '+', '~'前后
- '{'前
- !important '!'前
- @else 前后
- 属性值中的','后
- 注释'/\*'后和'\*/'前

```css
/* not good */
.element {
  color: red !important;
  background-color: rgba(0, 0, 0, 0.5);
}

/* good */
.element {
  color: red !important;
  background-color: rgba(0, 0, 0, 0.5);
}

/* not good */
.element,
.dialog {
  ...;
}

/* good */
.element,
.dialog {
}

/* not good */
.element > .dialog {
  ...;
}

/* good */
.element > .dialog {
  ...;
}

/* not good */
.element {
  ...;
}

/* good */
.element {
  ...;
}

/* not good */
@if{
  ...;
} @else {
  ...;
}

/* good */
@if{
  ...;
} @else {
  ...;
}
```

## 空行

以下几种情况需要空行：

文件最后保留一个空行
'}'后最好跟一个空行，包括 scss 中嵌套的规则
属性之间需要适当的空行，具体见属性声明顺序

```css
/* not good */
.element {
  ...;
}
.dialog {
  color: red;
  &:after {
    ...;
  }
}

/* good */
.element {
  ...;
}

.dialog {
  color: red;

  &:after {
    ...;
  }
}
```

## 换行

以下几种情况不需要换行：

'{'前
以下几种情况需要换行：

'{'后和'}'前
每个属性独占一行
多个规则的分隔符','后

```css
/* not good */
// .element { color: red;  background-color: black; }

/* good */
.element {
  color: red;
  background-color: black;
}

/* not good */
//.element,.dialog {
  ...;
}

/* good */
.element,
.dialog {
  ...;
}
```

## !important

不允许使用!important。

## 注释

注释统一用'/\* \*/'（scss 中也不要用'//'），具体参照右边的写法；

缩进与下一行代码保持一致；

可位于一个代码行的末尾，与代码间隔一个空格。

```css
/* Modal header */
.modal-header {
  ...;
}

/*
 * Modal header
 */
.modal-header {
  ...;
}

.modal-header {
  /* 50px */
  width: 50px;

  color: red; /* color red */
}
```

## 引号

最外层统一使用双引号；

url 的内容要用引号；

属性选择器中的属性值需要引号。

```css
.element:after {
  content: "";
  background-image: url("logo.png");
}

li[data-type="single"] {
  ...;
}
```

## 属性声明顺序

相关的属性声明按右边的顺序做分组处理，组之间需要有一个空行。

```css
.declaration-order {
    display: block;
    float: right;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    border: 1px solid #e5e5e5;
    border-radius: 3px;
    width: 100px;
    height: 100px;

    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    text-align: center;

    color: #333;
    background-color: #f5f5f5;

    opacity: 1;
}

// 下面是推荐的属性的顺序
[
    [
        "display",
        "visibility",
        "float",
        "clear",
        "overflow",
        "clip",
        "zoom"
    ],
    [
        "table-layout",
        "empty-cells",
        "caption-side",
        "border-spacing",
        "border-collapse",
        "list-style",
    ],
    [
        "-webkit-box-orient",
        "-webkit-box-direction",
        "-webkit-box-decoration-break",
        "-webkit-box-pack",
        "-webkit-box-align",
        "-webkit-box-flex"
    ],
    [
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index"
    ],
    [
        "margin",
        "box-sizing",
        "border",
        "border-radius",
        "border-image",
        "padding",
        "width",
        "height",
    ],
    [
        "font",
        "line-height",
        "text-align",
        "vertical-align",
        "white-space",
        "text-decoration",
        "text-emphasis",
        "text-indent",
        "text-justify",
        "letter-spacing",
        "word-spacing",
        "-ms-writing-mode",
        "text-outline",
        "text-transform",
        "text-wrap",
        "text-overflow",
        "-ms-word-wrap",
        "word-wrap",
        "word-break"
    ],
    [
        "color",
        "background",
        "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
    ],
    [
        "outline",
        "opacity",
        "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
        "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
        "-ms-interpolation-mode",
        "box-shadow",
        "filter:progid:DXImageTransform.Microsoft.gradient",
        "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
        "text-shadow"
    ],
    [
        "transition",
        "transform",
        "animation",
    ],
    [
        "content",
        "quotes",
        "counter-reset",
        "counter-increment",
        "resize",
        "cursor",
        "user-select",
        "nav-index",
        "nav-up",
        "nav-right",
        "nav-down",
        "nav-left",
        "tab-size",
        "hyphens",
        "pointer-events"
    ]
]
```

## 颜色

颜色 16 进制用小写字母；

颜色 16 进制尽量用简写。

```css
/* not good */
.element {
  color: #abcdef;
  background-color: #001122;
}

/* good */
.element {
  color: #abcdef;
  background-color: #012;
}
```

## 媒体查询

尽量将媒体查询的规则靠近与他们相关的规则，不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部，这样做只会让大家以后更容易忘记他们。

```css
.element {
  ...;
}

.element-avatar {
  ...;
}

@media (min-width: 480px) {
  .element {
    ...;
  }

  .element-avatar {
    ...;
  }
}
```

## LESS/SCSS 相关

提交的代码中不要有 @debug；

声明顺序：

@extend
不包含 @content 的 @include
包含 @content 的 @include
自身属性
嵌套规则
@import 引入的文件不需要开头的'\_'和结尾的'.scss'；

嵌套最多不能超过 4 层；

@extend 中使用 placeholder 选择器；

去掉不必要的父级引用符号'&'。

```css
/* not good */
@import "_dialog.scss";

/* good */
@import "dialog";

/* not good */
.fatal {
  @extend .error;
}

/* good */
.fatal {
  @extend %error;
}

/* not good */
.element {
  & > .dialog {
    ...;
  }
}

/* good */
.element {
  > .dialog {
    ...;
  }
}
```

## 杂项

不允许有空的规则；

元素选择器用小写字母；

去掉小数点前面的 0；

去掉数字中不必要的小数点和末尾的 0；

属性值'0'后面不要加单位；

同个属性不同前缀的写法需要在垂直方向保持对齐，具体参照右边的写法；

无前缀的标准属性应该写在有前缀的属性后面；

不要在同个规则里出现重复的属性，如果重复的属性是连续的则没关系；

不要在一个文件里出现两个相同的规则；

用 border: 0; 代替 border: none;；

选择器不要超过 4 层（在 scss 中如果超过 4 层应该考虑用嵌套的方式来写）；

发布的代码中不要有 @import；

尽量少用'\*'选择器。

```css
/* not good */
.element {
}

/* not good */
LI {
  ...;
}

/* good */
li {
  ...;
}

/* not good */
.element {
  color: rgba(0, 0, 0, 0.5);
}

/* good */
.element {
  color: rgba(0, 0, 0, 0.5);
}

/* not good */
.element {
  width: 50px;
}

/* good */
.element {
  width: 50px;
}

/* not good */
.element {
  width: 0px;
}

/* good */
.element {
  width: 0;
}

/* not good */
.element {
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;

  background: linear-gradient(to bottom, #fff 0, #eee 100%);
  background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
  background: -moz-linear-gradient(top, #fff 0, #eee 100%);
}

/* good */
.element {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;

  background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
  background: -moz-linear-gradient(top, #fff 0, #eee 100%);
  background: linear-gradient(to bottom, #fff 0, #eee 100%);
}

/* not good */
.element {
  color: rgb(0, 0, 0);
  width: 50px;
  color: rgba(0, 0, 0, 0.5);
}

/* good */
.element {
  color: rgb(0, 0, 0);
  color: rgba(0, 0, 0, 0.5);
}
```
