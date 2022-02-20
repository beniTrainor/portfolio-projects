const assert = require('assert');
const converter = require("../converter.js");


describe('Whole line conversions', function() {

    describe("convert heading", function () {

        it("should not convert a string if it does not start with the heading symbol", function () {
            const original = "Some sample text";
            const expected = "Some sample text";

            assert.equal(converter.convert_heading(original), expected);
        });

        it("should convert an h1 heading", function () {

            const original = "# Heading level 1";
            const expected = "<h1>Heading level 1</h1>";

            assert.equal(converter.convert_heading(original), expected);
        });

        it("should convert an h2 heading", function () {

            const original = "## Heading level 2";
            const expected = "<h2>Heading level 2</h2>";

            assert.equal(converter.convert_heading(original), expected);
        });

        it("should convert an h3 heading", function () {

            const original = "### Heading level 3";
            const expected = "<h3>Heading level 3</h3>";

            assert.equal(converter.convert_heading(original), expected);
        });

        it("should convert an h4 heading", function () {

            const original = "#### Heading level 4";
            const expected = "<h4>Heading level 4</h4>";

            assert.equal(converter.convert_heading(original), expected);
        });

        it("should convert an h5 heading", function () {

            const original = "##### Heading level 5";
            const expected = "<h5>Heading level 5</h5>";

            assert.equal(converter.convert_heading(original), expected);
        });

        it("should convert an h6 heading", function () {

            const original = "###### Heading level 6";
            const expected = "<h6>Heading level 6</h6>";

            assert.equal(converter.convert_heading(original), expected);
        });

    });


    describe("convert a horizontal rule", function () {

        it("should not convert a horizontal rule if not well formatted", function () {
            const original = [
                "-*- This should not be formatted",
                "Another line"
            ];
            const expected = [
                "-*- This should not be formatted",
                "Another line"
            ];

            const result = converter.convert_horizontal_rule(original);
            const result_lines = result.join("\n");

            assert.equal(typeof result, typeof expected);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert a horizontal rule if formatted correctly with `-`", function () {
            const original = [
                "The following horizontal rule should be formatted",
                "",
                "---",
                "",
                "Some more text here"
            ];
            const expected = [
                "The following horizontal rule should be formatted",
                "",
                "<hr>",
                "",
                "Some more text here"
            ];

            const result = converter.convert_horizontal_rule(original);
            const result_lines = result.join("\n");

            assert.equal(typeof result, typeof expected);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert a horizontal rule if formatted correctly with `_`", function () {
            const original = [
                "The following horizontal rule should be formatted",
                "",
                "___",
                "",
                "Some more text here"
            ];
            const expected = [
                "The following horizontal rule should be formatted",
                "",
                "<hr>",
                "",
                "Some more text here"
            ];

            const result = converter.convert_horizontal_rule(original);
            const result_lines = result.join("\n");

            assert.equal(typeof result, typeof expected);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert a horizontal rule if formatted correctly with `*`", function () {
            const original = [
                "The following horizontal rule should be formatted",
                "",
                "***",
                "",
                "Some more text here"
            ];
            const expected = [
                "The following horizontal rule should be formatted",
                "",
                "<hr>",
                "",
                "Some more text here"
            ];

            const result = converter.convert_horizontal_rule(original);
            const result_lines = result.join("\n");

            assert.equal(typeof result, typeof expected);
            assert.equal(result_lines, expected.join("\n"));
        });

    });

    describe("convert a blockquote", function () {

        it("should not convert a blockquote if not well formatted", function () {
            const original = [
                "These lines",
                "should not",
                "be formatted"
            ];
            const expected = [
                "These lines",
                "should not",
                "be formatted"
            ];

            const result = converter.convert_blockquotes(original);
            original.forEach(function (original_line, index) {
                assert.equal(original_line, result[index]);
            });

            assert.equal(typeof original, typeof result);
        });

        it("should convert a blockquote if well formatted", function () {
            const original = [
                "> These lines",
                "> should not",
                "> be formatted"
            ];
            const expected = [
                "<blockquote>",
                "These lines",
                "should not",
                "be formatted",
                "</blockquote>"
            ];

            const result = converter.convert_blockquotes(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<blockquote>"), true);
            assert.equal(result_lines.includes("</blockquote>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert a blockquote with space above and below", function () {
            const original = [
                "The following lines should be formatted:",
                "> These lines",
                "> should",
                "> be formatted",
                "But not this one."
            ];
            const expected = [
                "The following lines should be formatted:",
                "<blockquote>",
                "These lines",
                "should",
                "be formatted",
                "</blockquote>",
                "But not this one."
            ];

            const result = converter.convert_blockquotes(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<blockquote>"), true);
            assert.equal(result_lines.includes("</blockquote>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert multiple blockquotes", function () {
            const original = [
                "First blockquote:",
                "> These lines",
                "> should",
                "> be formatted",
                "Second blockquote:",
                "> These lines",
                "> should also",
                "> be formatted",
                "but not this one."
            ];
            const expected = [
                "First blockquote:",
                "<blockquote>",
                "These lines",
                "should",
                "be formatted",
                "</blockquote>",
                "Second blockquote:",
                "<blockquote>",
                "These lines",
                "should also",
                "be formatted",
                "</blockquote>",
                "but not this one."
            ];

            const result = converter.convert_blockquotes(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<blockquote>"), true);
            assert.equal(result_lines.includes("</blockquote>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

    });


    describe("convert a code block", function() {

        it("should not convert a code block if not well formatted", function () {
            const original = [
                "These lines",
                "should not",
                "be formatted"
            ];
            const expected = [
                "These lines",
                "should not",
                "be formatted"
            ];

            const result = converter.convert_code_blocks(original);
            assert.equal(typeof original, typeof result);
            assert.equal(result.join("\n"), expected.join("\n"));
        });


        it("should convert a blockquote if well formatted", function () {
            const original = [
                "```js",
                "const age = 32",
                "console.log(age);",
                "```"
            ];
            const expected = [
                "<pre>",
                "const age = 32",
                "console.log(age);",
                "</pre>"
            ];

            const result = converter.convert_code_blocks(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<pre>"), true);
            assert.equal(result_lines.includes("</pre>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });


        it("should convert a code block with space above and below", function () {
            const original = [
                "The following lines should be formatted:",
                "```js",
                "const age = 32",
                "console.log(age);",
                "```",
                "But not this one."
            ];
            const expected = [
                "The following lines should be formatted:",
                "<pre>",
                "const age = 32",
                "console.log(age);",
                "</pre>",
                "But not this one."
            ];

            const result = converter.convert_code_blocks(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<pre>"), true);
            assert.equal(result_lines.includes("</pre>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });


        it("should convert multiple code blocks", function () {
            const original = [
                "First code block:",
                "```js",
                "const age = 32",
                "console.log(age);",
                "```",
                "Second code block:",
                "```",
                "<div>",
                "HTML snippet without specifying code block type.",
                "</div>",
                "```",
                "but not this one."
            ];
            const expected = [
                "First code block:",
                "<pre>",
                "const age = 32",
                "console.log(age);",
                "</pre>",
                "Second code block:",
                "<pre>",
                "<div>",
                "HTML snippet without specifying code block type.",
                "</div>",
                "</pre>",
                "but not this one."
            ];

            const result = converter.convert_code_blocks(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<pre>"), true);
            assert.equal(result_lines.includes("</pre>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

    });

    describe("convert an ordered list", function () {

        it("should convert an ordered list if well formatted", function () {
            const original = [
                "1. First item",
                "2. Second item",
            ];
            const expected = [
                "<ol>",
                "<li>First item</li>",
                "<li>Second item</li>",
                "</ol>",
            ];

            const result = converter.convert_ordered_lists(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<ol>"), true);
            assert.equal(result_lines.includes("</ol>"), true);
            assert.equal(result_lines, expected.join("\n") + "\n");
        });

        it("should convert an ordered list with space above and below", function () {
            const original = [
                "Some text here",
                "",
                "1. First item",
                "2. Second item",
                "",
                "Some more text here"
            ];
            const expected = [
                "Some text here",
                "",
                "<ol>",
                "<li>First item</li>",
                "<li>Second item</li>",
                "</ol>",
                "",
                "Some more text here"
            ];

            const result = converter.convert_ordered_lists(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<ol>"), true);
            assert.equal(result_lines.includes("</ol>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert multiple ordered lists", function () {
            const original = [
                "First ordered list:",
                "",
                "1. First item of the first list",
                "2. Second item of the first list",
                "",
                "Second ordered list:",
                "",
                "1. First item of the second list",
                "2. Second item of the second list",
                ""
            ];
            const expected = [
                "First ordered list:",
                "",
                "<ol>",
                "<li>First item of the first list</li>",
                "<li>Second item of the first list</li>",
                "</ol>",
                "",
                "Second ordered list:",
                "",
                "<ol>",
                "<li>First item of the second list</li>",
                "<li>Second item of the second list</li>",
                "</ol>",
                ""
            ];

            const result = converter.convert_ordered_lists(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<ol>"), true);
            assert.equal(result_lines.includes("</ol>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });


    });


    describe("convert an unordered list", function () {

        it("should convert an unordered list if well formatted", function () {
            const original = [
                "* First item",
                "* Second item",
            ];
            const expected = [
                "<ul>",
                "<li>First item</li>",
                "<li>Second item</li>",
                "</ul>",
            ];

            const result = converter.convert_unordered_lists(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<ul>"), true);
            assert.equal(result_lines.includes("</ul>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert an unordered list with space above and below", function () {
            const original = [
                "Some text here",
                "",
                "* First item",
                "* Second item",
                "",
                "And some more text here",
            ];
            const expected = [
                "Some text here",
                "",
                "<ul>",
                "<li>First item</li>",
                "<li>Second item</li>",
                "</ul>",
                "",
                "And some more text here"
            ];

            const result = converter.convert_unordered_lists(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<ul>"), true);
            assert.equal(result_lines.includes("</ul>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });


        it("should convert unordered lists with different formatting symbols", function () {
            const original = [
                "* First item of first list",
                "- First item of second list",
            ];
            const expected = [
                "<ul>",
                "<li>First item of first list</li>",
                "</ul>",
                "<ul>",
                "<li>First item of second list</li>",
                "</ul>"
            ];

            const result = converter.convert_unordered_lists(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<ul>"), true);
            assert.equal(result_lines.includes("</ul>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

        it("should convert multiple unordered lists", function () {
            const original = [
                "First unordered list:",
                "* First item of first list",
                "* Second item of first list",
                "Second unordered list:",
                "- First item of second list",
                "- Second item of second list"
            ];
            const expected = [
                "First unordered list:",
                "<ul>",
                "<li>First item of first list</li>",
                "<li>Second item of first list</li>",
                "</ul>",
                "Second unordered list:",
                "<ul>",
                "<li>First item of second list</li>",
                "<li>Second item of second list</li>",
                "</ul>",
            ];

            const result = converter.convert_unordered_lists(original);
            const result_lines = result.join("\n");

            assert.equal(typeof original, typeof result);
            assert.equal(result_lines.includes("<ul>"), true);
            assert.equal(result_lines.includes("</ul>"), true);
            assert.equal(result_lines, expected.join("\n"));
        });

    });

});
