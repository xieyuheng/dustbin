import { ActivityData } from "../../datatypes/activity"

function linkCard(link: string): string {
  let s = ""
  s += "```link-card" + "\n"
  s += `pathname: ${link}` + "\n"
  s += "```" + "\n"
  return s
}

export const activities: Array<ActivityData> = [
  {
    name: "Xie Yuheng",
    username: "xieyuheng",
    content: `\
V.V. is a Fields Medalist.
From this talk about foundations of mathematics,
one can experience the journey of our world's top level mathematicians.

${linkCard(
  "/articles/xieyuheng/xieyuheng/-/persons/vladimir-voevodsky/how-i-became-interested-in-foundations-of-mathematics.md"
)}
`,
    created_at: new Date("2022-01-16"),
  },

  {
    name: "Xie Yuheng",
    username: "xieyuheng",
    content: `\
V.V. 是 2002 年的北京的菲尔兹奖得主。
从这个关于数学基础的演讲中，
读者可以体会到一位世界顶级数学家的心路历程。

${linkCard(
  "/articles/xieyuheng/xieyuheng/-/translations/zh/how-i-became-interested-in-foundations-of-mathematics.md"
)}
`,
    created_at: new Date("2022-01-16"),
  },

  {
    name: "谢宇恒",
    username: "xieyuheng",
    content: `\
《Minoko Novel》是 [夜坂雅](https://github.com/ShadowRZ) 的连载小说。
由「女神异闻录」中的虚构角色，与真实的 #archlinux-cn 社区成员，一一对应而展开故事。
多角色、多视角、多条叙事线索并行，并且每个角色之间都有一些交集。

${linkCard("/books/ShadowRZ/minoko-novel")}
`,
    created_at: new Date("2022-01-16"),
  },

  {
    name: "谢宇恒",
    username: "xieyuheng",
    content: `\
这本书讲的是程序员如何创业。
作者署名 37signals，代表创造了 Ruby on Rails 的知名的网络应用公司。
而译者 Olivia Han，是知名优质中文社区 [V2EX](https://www.v2ex.com/?r=xieyuheng) 的创始人。
[附：译者谈 V2EX](https://www.ifanr.com/22202)

${linkCard("/books/xieyuheng/rework")}
`,
    created_at: new Date("2022-01-16"),
  },

  {
    name: "谢宇恒",
    username: "xieyuheng",
    content: `\
*Cicada Language Manual* is the author's manual for a language he designed,
-- both a *dependently typed programming language*
and an *interactive theorem prover*.

${linkCard("/manuals/cicada-lang/cicada")}
`,
    created_at: new Date("2022-01-15"),
  },

  {
    name: "谢宇恒",
    username: "xieyuheng",
    content: `\
《蝉语手册》是蝉语的作者为他设计的程序语言所写的手册。

这个语言的特点是，人们可以用它来证明数学定理。

由于作者是数学系的学生，并且非常喜欢数学，
所以这个能够连接数学与编程的，像两个世界的桥梁一般的项目一直是他的梦想。

《蝉语手册》目前只有英文版。

${linkCard("/manuals/cicada-lang/cicada")}
`,
    created_at: new Date("2022-01-15"),
  },

  {
    name: "谢宇恒",
    username: "xieyuheng",
    content: `\
《蝉语独白》介绍蝉语的小册子，其风格模仿了 Dan Friedman 的「小小书」系列。
作者计划在自己生日那天发布这个手册，来庆祝自己的生日。

${linkCard("/books/xieyuheng/cicada-monologues")}
`,
    created_at: new Date("2022-01-15"),
  },

  {
    name: "谢宇恒",
    username: "xieyuheng",
    content: `\
*Readonly.Link Manual* is a guide for using [Readonly.Link](https://readonly.link)
to render all kinds of documents, such as Article, Book and Manual.

${linkCard("/manuals/readonlylink/readonlylink-manual")}
`,
    created_at: new Date("2022-01-15"),
  },

  {
    name: "谢宇恒",
    username: "xieyuheng",
    content: `\
《只读链接手册》介绍了如何用 Readonly.Link 来渲染各式各样的文档。
比如，可以渲染类型有 Article、Book 和 Manual。

${linkCard("/manuals/readonlylink/readonlylink-manual")}
`,
    created_at: new Date("2022-01-15"),
  },
]
