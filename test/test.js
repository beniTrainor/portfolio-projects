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


    describe("convert a line break", function () {

        it("should not convert a line break if not well formatted", function () {
            const original = "-*- This not should be formatted";
            const expected = "-*- This not should be formatted";
    
            assert.equal(converter.convert_horizontal_rule(original), expected);
        });

        it("should convert a horizontal rule if formatted correctly", function () {
            const original = "---";
            const expected = "<hr>";
    
            assert.equal(converter.convert_horizontal_rule(original), expected);
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


            console.log(result_lines);
            console.log("---");
            console.log(expected.join("\n"));
            console.log("---");

            assert.equal(result_lines, expected.join("\n"));
        });

        
    });

});

describe("Inline conversions", function () {

    describe("convert links", function() {
    
        it("should return the same string if it has no links", function () {
            assert.equal(converter.convert_links("string"), "string");
        });
    
    
        it("should convert a single link", function() {
    
            const original = "The following markdown was copied from the [Markdown Here Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).";
            const expected = "The following markdown was copied from the <a href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\">Markdown Here Cheatsheet</a>.";
    
            assert.equal(converter.convert_links(original), expected);
        });
    
        it("should convert multiple links", function() {
    
            const original = "[one link](example.com), [and another](google.com).";
            const expected = "<a href=\"example.com\">one link</a>, <a href=\"google.com\">and another</a>.";
    
            assert.equal(converter.convert_links(original), expected);
        });
  
    });


    describe("convert emphasized text", function () {

        it("should return the same strings if it's not marked up as emphasis", function () {
            const original = "These words should be emphasized.";
            const expected = "These words should be emphasized.";
    
            assert.equal(converter.convert_emphasis(original), expected);
        });

        it("should convert a string marked up using '*'", function () {
            const original = "*These words* should be emphasized.";
            const expected = "<em>These words</em> should be emphasized.";
    
            assert.equal(converter.convert_emphasis(original), expected);
        });

        it("should convert a string marked up using '_'", function () {
            const original = "_These words_ should be emphasized.";
            const expected = "<em>These words</em> should be emphasized.";
    
            assert.equal(converter.convert_emphasis(original), expected);
        });

    });


    describe("convert inline code", function () {

        it("should not convert a line break if not well formatted", function () {
            const original = "This should not be formatted";
            const expected = "This should not be formatted";
    
            assert.equal(converter.convert_horizontal_rule(original), expected);
        });

        it("should convert a single formatted code string", function() {
    
            const original = "The `~/Downloads` directory.";
            const expected = "The <code>~/Downloads</code> directory.";
    
            assert.equal(converter.convert_inline_code(original), expected);
        });
    
        it("should convert multiple formatted code strings", function() {
    
            const original = "The `/bin` and `/tmp` directories.";
            const expected = "The <code>/bin</code> and <code>/tmp</code> directories.";
    
            assert.equal(converter.convert_inline_code(original), expected);
        });
         
    });

});
