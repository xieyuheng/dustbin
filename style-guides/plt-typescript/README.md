# PLT Typescript Style Guides

## Notes

This style guide is inspired by
[C Language Style for Scalability](https://rfc.zeromq.org/spec/21) -- a.k.a. CLASS.

We call our style guide CLASS, although it is for Typescript instead of C.

CLASS defines a consistent style and organization
for scalable library and application code.
CLASS aims to collect industry best practice into one reusable standard.

## Goals

CLASS aims to be a complete and reusable style and organization guide for scalable projects.
CLASS collects best practice to solve a set of specific and well-known quality problems with projects.

The specific goals for this Specification are to:

- Give project maintainers and contributors a tool for measuring the quality of patches to a project.
- Give the code the appearance of a single perfect author writing at one moment in time.
- Reduce the number of lines of code and complexity of projects.
- Ensure total consistency of every line of code, across a large number of projects.
  by solving common style problems in a minimal fashion.
- Provide a vehicle to collect best practice over time.

### Quality Aspirations

The goal of CLASS is to help programmers write high-quality code in a consistent fashion.
We define "high quality" primarily thus:

- The code is easy to read and understand even if you know little or nothing about its specific context.
- The code is easy to reuse and remix, in whole or in fragments.
- The code is easy to write correctly, and errors are rapidly clear.
- Our main tool for achieving this is to identify and apply the best patterns and styles.
  The reader can learn these once, and then see them repeatedly across a wide body of code.
  Deviations from familiar patterns can then be taken as a sign of low-quality code
  that is more likely to contain errors and less remixable.

### Common Problems

With this Specification we aim to address a specific set of problems
that hurt the quality, remixability, and economics of many projects:

- If there is no style guide for a project,
  the maintainers must either rewrite contributions by hand (which costs extra work),
  or must abandon any attempt to enforce a consistent "voice" across a project (which hurts code quality and reusability).
  Thus maintainers need a written style guide to which they can point contributors.

- If there is no reusable style guide,
  each project founder will improvise their own ad hoc style.
  This wastes previous experience, and creates unnecessary work for project founders.
  It also means each project will end up with a different style.

- If a set of projects each have a different style,
  they cannot share code easily, which damages the economics of remixing.
  The more projects that use a single style, the lower the cost of code reuse.
  This is especially important in open source
  but also applies to projects built internally in an organization.

- With no vehicle for collecting and sharing best practices,
  most projects will have mediocre structuring and style,
  leading to unnecessary complexity, excess lines of code,
  accumulation of unused code, and other quality problems.

- When project founders create a new project without help,
  they often make mistakes such as forgetting to define a license for their code.
  This can create legal problems.

## General Style

### Definitions

The overall unit of work is a project
that builds as a library
with a set of executable test programs
and supplemental command-line tools.

The project is composed of classes,
where each class covers one area of work
and is implemented as a source file.

Each class implements a series of methods,
where each method performs one task and is implemented as a function.

### Language

The language for all names and comments SHALL be English.

### Naming

Names SHOULD be chosen for ease of readability, and consistency.
Unless otherwise specified, the following style rules apply to all given names:

- Names SHALL be short words that are simple, clear, and obvious to the reader.
- Names SHALL be used consistently for any given semantics.
- Names SHOULD NOT be invented words or acronyms.
- Names MAY be abbreviations if used widely.
- Names SHALL NOT be reserved language keywords.

## Project Style

### Project Focus

The project SHALL focus on one identifiable problem space,
which SHALL be stated explicitly in the project README.

### Project Name

The project SHALL have these short names and abbreviations:

- A project short name used in paths and URLs that identify the project.
  This would be used for instance in the GitHub project name.
  In this Specification we will use `myproject` as the example.

- A project prefix used for output libraries.
  The prefix MAY be an acronym.
  In this Specification we will use `myp` as the example.

These names SHALL be noted in the project README.

### General Layout

The project SHALL contain at least these files and directories:

- A README file that refers to this Specification
  and provides other necessary information about the project.
- A license file (e.g., COPYING or LICENSE)
  that specifies the terms of distribution for the project.
- A src directory for all library source files.
- A lib directory for output js files.
- Scripts or makefiles to build and test the project on at least one platform.

The project MAY contain these files and directories which MUST have these names if present at all:

- An AUTHORS file listing all contributors to the project.
- A doc directory containing documentation.

### Template README File

```
# Project Title

<One-paragraph statement of the goals of the project, and the problems it aims to solve>

## References

* Contribution policy is defined by C4 (http://rfc.zeromq.org/spec:21).
* Project style guide is defined by CLASS (http://rfc.zeromq.org/spec:14).
 * short name: <title>
 * prefix: <prefix>
* Licensed under <license name>, see COPYING
```

## Class Style

## Method Style

## Code Style

## Code Style
