# 📝 GitHub-Flavored Markdown (GFM) Tutorial

Markdown is a lightweight markup language for formatting plain text. GitHub supports an extended version called **GitHub-Flavored Markdown (GFM)**.

_Last updated: 22 May 2025_

---

## 📚 Table of Contents
- [Headings](#headings)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
- [Links and Images](#links-and-images)
- [Tables](#tables)
- [Code](#code)
- [Blockquotes](#blockquotes)
- [Task Lists](#task-lists)
- [Horizontal Rules](#horizontal-rules)
- [Emoji](#emoji)
- [Inline HTML](#inline-html)

---

## 🔠 Headings

Use `#` for headings:

```markdown
# H1
## H2
### H3
```

# H1  
## H2  
### H3  

---

## ✍️ Text Formatting

```markdown
*italic* or _italic_  
**bold** or __bold__  
~~strikethrough~~  
`inline code`
```

*italic*  
**bold**  
~~strikethrough~~  
`inline code`

---

## 📋 Lists

### Unordered List:

```markdown
- Item 1
- Item 2
  - Nested Item
```

- Item 1  
- Item 2  
  - Nested Item

### Ordered List:

```markdown
1. First
2. Second
   1. Sub
```

1. First  
2. Second  
   1. Sub

---

## 🔗 Links and Images

### Link:

```markdown
[GitHub](https://github.com)
```

[GitHub](https://github.com)

### Image:

```markdown
![Alt text](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

---

## 📊 Tables

```markdown
| Name     | Role     |
|----------|----------|
| Alice    | Developer|
| Bob      | Designer |
```

| Name     | Role      |
|----------|-----------|
| Alice    | Developer |
| Bob      | Designer  |

---

## 💻 Code

### Inline:

```markdown
Use `npm install` to install.
```

Use `npm install` to install.

### Block:

```js
function hello() {
  console.log("Hello, world!");
}
```

---

## 💬 Blockquotes

```markdown
> This is a quote.
>> Nested quote.
```

> This is a quote.  
>> Nested quote.

---

## ✅ Task Lists

```markdown
- [x] Set up project
- [ ] Add authentication
- [ ] Write tests
```

- [x] Set up project  
- [ ] Add authentication  
- [ ] Write tests

---

## 📏 Horizontal Rules

```markdown
---
```

---

## 🎉 Emoji

Use `:emoji_name:` (GitHub renders them automatically):

```markdown
:rocket: :tada: :smile:
```

🚀 🎉 😄  
➡️ Full list: [GitHub Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet)

---

## 🌐 Inline HTML (limited support)

```html
<p style="color: green;">This is green text.</p>
```

<p style="color: green;">This is green text.</p>

> ⚠️ Scripts and stylesheets are blocked for security.

---

## 📌 Bonus Tips

- Use `README.md` for your main project page.
- Use relative paths to link between files.
- GitHub supports `.md` in repositories, issues, pull requests, and comments.

---

## 📎 Resources

- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- [CommonMark Spec](https://spec.commonmark.org/)
- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
