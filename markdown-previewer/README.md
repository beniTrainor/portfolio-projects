# Markdown Previewer

A [simple web application to preview Markdown text](https://htmlpreview.github.io/?https://github.com/beniTrainor/portfolio-projects/blob/master/markdown-previewer/index.html) on large or medium sized screens (not on mobile devices).

I developed this project from scratch to practice the following:
- [Test-driven development](#test-driven-development)
- [Algorithmic/problem-solving skills](#algorithmic-problem-solving-skills)
- [FlexBox](#flexbox)
- [Semantic HTML5](#semantic-html5)

## Algorithmic/problem-solving skills

I've practiced various algorithmic/problem-solving techniques in order to convert each marked up element from Markdown to HTML. For instance, I've had to use regular expressions to test for certain patterns in the markup. I've also had to implement somewhat complex parsing algorithms in order to convert elements that were delimited over multiple lines. 

In order to convert markdown elements into HTML I've had to make a distinction between elements that spanned over entire lines (e.g., headings, paragraphs, lists) and elements that were part of a line (e.g., bold text, links, etc.). This has allowed me to better understand the functions that needed to be implemented, since they each type had certain similarities.

The actual conversion of Markdown into HTML is done entirely in string format. Only then it gets parsed into DOM elements using a `DOMParser`. This has allowed me to test much more easily each function.


## Test-driven development

Every function that I've used to convert Markdown into HTML has been accompanied by a set of tests which I have written following the test-driven methodology somewhat strictly. I first wrote the tests for the function and then the actual function until the tests passed. This has allowed me to be sure each function produced the output I required before I used it on the main app. 

For this project, I've used a library called [Mocha.js](https://mochajs.org/) to write the tests for each function. They are located in the `tests` directory.

## FlexBox

The web design of the Markdown Previewer uses flex containers to align each section and the components within each section. This allows to very simply center each section and subsections in order to get centered columns.

## Semantic HTML5

I've used semantic markup wherever possible. For example, I've used the `main` and `section` elements to markup the main content of the page and sections of the main content respectively.

## Other notes

In order to keep the project simple enough I've had to leave out Markdown features from being converted. The following have not been implemented:
- Headings with underlines
- Multi-level lists
- Tables
- Task lists
- Footnotes
- Inline HTML
- etc.

The features that *have* been implemented can be found in the `converter.js` module. 

---

I've tried to make the CSS styling as similar as possible to the design used on GitHub. So, I've done a mix of reverse engineering and, in some instances,  copying.
