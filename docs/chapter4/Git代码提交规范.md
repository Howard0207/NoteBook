## 代码提交操作规范

- 添加到版本库
  ```git
  git add (files)
  ```

- 提交代码<span style="color:red;margin-left:10px;font-size: 16px;">*</span>
  ```git
  yarn commit
  ```

- 拉取代码
  ```git
  git pull --rebase
  ```

- 推送代码
  ```git
  git push (origin branch)
  ```

- 版本回退
  ```git
  git reset --hard (commitId/head^n)
  ```


>Note: 这里使用commitizen进行代码提交，主要是希望规范提交信息。而commitizen可以更加方便实现。

### commit message 的意义？

- 提供更多的历史信息，方便快速浏览

  比如，下面的命令显示上次发布后的变动，每个commit占据一行。你只看行首，就知道某次 commit 的目的。
  ```git
  git log <last tag> HEAD --pretty=format:%s
  ```
- 可以过滤某些commit（比如文档改动），便于快速查找信息。

  比如，下面的命令仅仅显示本次发布新增加的功能。
  ```git
  git log <last release> HEAD --grep feature
  ```
- 可以直接从commit生成Change log。

### commit message 结构

Commit message 都包括三个部分：Header，Body 和 Footer。本项目不做过多要求，只关注Header部分即可。

#### Header

Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

- type

  type用于说明 commit 的类别，只允许使用下面7个标识。

  - feat：新功能（feature）
  - fix：修补bug
  - docs：文档（documentation）
  - style： 格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  - test：增加测试
  - chore：构建过程或辅助工具的变动
  
  如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

- scope

  scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

- subject

  subject是 commit 目的的简短描述，不超过50个字符。

以动词开头，使用第一人称现在时，比如change，而不是changed或changes第一个字母小写，结尾不加句号（.）

关于更多commitizen信息,前往以下地址寻求答案

[【阮一峰博客】](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

[【你可能会忽略的 Git 提交规范】](http://jartto.wang/2018/07/08/git-commit/)

