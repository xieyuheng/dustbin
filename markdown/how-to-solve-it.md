---
title: How to Solve it
author: Polya
year: 1945
---

# Our list

[George Pólya](https://en.wikipedia.org/wiki/George_P%C3%B3lya) 是著名匈牙利数学家。

关于「什么是教育？」他的一次演讲中，有一段让人印象深刻的解释：

> Let me put my first point in a question answer form.
>
> > What is teaching?
>
> In my opinion, teaching is giving opportunity to the students
> to discover things by themselves.
>
> Not the teacher should tell the things to the students,
> if they wish to learn it really, they have to discover it.
>
> -- [Polya explains the problem solving technique](https://www.youtube.com/watch?v=h0gbw-Ur_do)

在他的书《怎样解题》中，他给出了一个解题时的「问题列表」。

在解数学题时这个列表很有用，写程序或者解决某些工程问题的时候，
稍微变化一下列表中的问题，也受益匪浅。

## Overview

- [xmind] Our List
  - (1) Understanding the problem
  - (2) Devising a plan
  - (3) Carrying out the plan
  - (4) Looking back

## Details

- [xmind] Our List -- Details
  - Understanding the problem
    - What is the unknown?
    - What are the data?
    - What is the condition?
    - Draw a figure.
    - Introduce suitable notation.
    - ...
  - Devising a plan
    - Have you seen if before?
    - Do you know a related problem?
    - Here is a problem related to yours and solved before.
    - Could you restate the problem?
    - Could you restate it still differently?
    - Go back to the definitions.
    - ...
  - Carrying out the plan
    - Carrying out your plan of the solution, check each step.
    - Can you see clearly that the step is correct?
    - Can you prove that it is correct?
  - Looking back
    - Can you check the result?
    - Can you check the argument?
    - Can you derive the result differently?
    - Can you see it at a glance?
    - Can you use the result, or method, for some other problem?

# 偷偷测试一下 Boundary 和 Summary

Markdown 源代码：

``` markdown
- [xmind] Pure Test
  - A [B1]
  - B [S1, B1]
  - C [B1, S1]
  - D [S1]
  - [B1] E
  - [S1, 1] F
    - G
  - H [1]
```

渲染效果：

- [xmind] Pure Test
  - A [B1]
  - B [S1, B1]
  - C [B1, S1]
  - D [S1]
  - [B1] E
  - [S1, 1] F
    - G
  - H [1]
