# M·V·VM

> 这个文件夹中的代码，是 <https://readonly.link> 这个项目的前端源代码。

| VM (View Model)             | V (View)                   |
| --------------------------- | -------------------------- |
| `articles/article-state.ts` | `articles/ArticleRoot.vue` |
| `books/book-state.ts`       | `books/BookRoot.vue`       |

主组件创建 `state` 实例，作为 prop 传递给所有的子组件。

比如说，`BookRoot.vue` 是主组件，它创建了 `BookState` 的实例。

作为 prop 传递给所有子组件：

```vue
<BookContents :state="state" />
<BookPage :state="state" />
<BookTitlePage :state="state" />
```

子组件不需要再创建 `state`，只需读写（get/set） `state` 中的数据（reactive 的），或调用 `state` 中的函数。

业务逻辑尽量抽到 `BookState` 这个 class 中，保持 .vue 文件简单。

- .vue 文件一般 60 到 100 行左右，200 行大概就需要 refactor 了。

优点：

- 代表 View Model 的 class 可以被独立测试（不依赖 vue）。
- 不需要依赖 vuex 等特殊的状态管理 API。
- View Model 是简单的 JavaScript class，方便用面向对象的技术来做进一步的 refactor。
