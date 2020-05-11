module.exports = {
  title: "学习日记",
  description: "记录学习的每一个知识点",
  head: [
    [
      "link",
      { rel: "shortcut icon", type: "image/x-icon", href: `/favicon.ico` },
    ],
  ],
  themeConfig: {
    editLinks: false,
    docsDir: "docs",
    nav: [],
    sidebar: [
      {
        title: "函数式编程",
        collapsable: false,
        children: [
          ["chapter1/", "柯里化"],
          "chapter1/Partial_Function",
          "chapter1/Pure_Function",
        ],
      },
      {
        title: "ES6+",
        collapsable: false,
        children: ["chapter2/async"],
      },
      {
        title: "EventLoop",
        collapsable: false,
        children: ["chapter3/EventLoop"],
      },
      {
        title: "前端代码规范",
        collapsable: false,
        children: [
          ["chapter4/项目目录结构", "项目目录结构"],
          ["chapter4/命名规则", "命名规则"],
          "chapter4/HTML代码规范",
          "chapter4/JS代码规范",
          "chapter4/CSS代码规范",
          "chapter4/Git代码提交规范",
        ],
      },
    ],
  },
};
