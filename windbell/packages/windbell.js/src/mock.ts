import type { FileEntry, Sign } from "./types"

export const fileEntries: Array<FileEntry> = [
  { name: "book", path: "book", type: "directory", depth: 0 },
  { name: "semiosis.md", path: "semiosis.md", type: "file", depth: 1 },
  { name: "windbell.md", path: "windbell.md", type: "file", depth: 1 },
  { name: "literate.md", path: "literate.md", type: "file", depth: 1 },
  { name: "notes", path: "notes", type: "directory", depth: 0 },
  { name: "interface.md", path: "notes/interface.md", type: "file", depth: 1 },
  { name: "semiotics.md", path: "notes/semiotics.md", type: "file", depth: 1 },
]

const semiosis = [
  "# 风铃与符号过程",
  "",
  "思想不是封闭的内在过程，而是符号的连续解释过程。",
  "",
  "风经过风铃时，声音并不是风本身，而是风与风铃共同产生的新符号。",
  "",
  "## 一页书斋",
  "",
  "> 每一个思想都是一个符号，它指向另一个符号，如此无限延伸。",
  "",
  "```ts",
  "function interpret(sign: Sign): Sign {",
  "  return sign.interpret()",
  "}",
  "```",
  "",
  "## 文学式编程",
  "",
  "代码不是文档的附庸，文档也不是代码的包装。",
  "它们在同一条解释之链上彼此照亮。",
].join("\n")

const windbell = [
  "# Windbell",
  "",
  "A quiet local web IDE for literate programming.",
  "",
  "## 界面原则",
  "",
  "- 轻：大量留白，少边框",
  "- 静：低饱和色，不抢内容",
  "- 明：靠字阶和间距建立层级",
  "- 透：玻璃、细线、半透明面板",
  "- 响：事件发生时，有一声很轻的风铃",
].join("\n")

const literate = [
  "# 文学式编程",
  "",
  "> 程序应当像一篇写给人的文章。",
  "",
  "## 代码块与正文",
  "",
  "风铃不解释风，它只是把风翻译成声音。",
  "",
  "```md",
  "# 一个文档",
  "",
  "```ts",
  "const sign = interpret(wind)",
  "```",
  "```",
  "",
  "## 批注",
  "",
  "agent 的解释可以停在页边，像一条安静的批注。",
].join("\n")

const interfaceDoc = [
  "# 界面",
  "",
  "## 书斋里的玻璃风铃",
  "",
  "纸张、墨水、玻璃、铜，以及一点点风。",
  "",
  "## 三个区域",
  "",
  "1. 文件树：书稿",
  "2. 编辑器：书写",
  "3. Semiosis：解释",
].join("\n")

const semiotics = [
  "# Semiotics",
  "",
  "Peirce 的符号过程包含：",
  "",
  "- Representamen",
  "- Object",
  "- Interpretant",
  "",
  "解释不是终点，而是下一个符号的起点。",
].join("\n")

export const mockDocuments: Record<string, string> = {
  "semiosis.md": semiosis,
  "windbell.md": windbell,
  "literate.md": literate,
  "notes/interface.md": interfaceDoc,
  "notes/semiotics.md": semiotics,
}

export const initialSigns: Array<Sign> = [
  {
    id: "sign-user-1",
    kind: "user",
    title: "你",
    body: "请解释这段风铃的比喻，并帮我补一个例子。",
    time: "刚刚",
  },
  {
    id: "sign-assistant-1",
    kind: "assistant",
    title: "风铃作为符号",
    body: "风本身不可见，它必须经过风铃才能被听见。\n\n同样，思想也必须经过符号，才能成为可解释的对象。",
    time: "刚刚",
  },
  {
    id: "sign-tool-1",
    kind: "tool",
    title: "read_file",
    body: "读完 semiosis.md，共 25 行。",
    tool: "semiosis.md",
    time: "刚刚",
  },
  {
    id: "sign-assistant-2",
    kind: "assistant",
    title: "我建议补一个例子",
    body: "可以在“文学式编程”一节后，加入代码与正文互相解释的例子。",
    diff: "+ 代码块是人的思想的另一种风铃。",
    time: "刚刚",
  },
  {
    id: "sign-approval-1",
    kind: "approval",
    title: "等待批准",
    body: "是否将这条建议写入 semiosis.md？",
    state: "pending",
    time: "刚刚",
  },
]
