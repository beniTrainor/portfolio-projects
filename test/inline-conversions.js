const assert = require('assert');
const converter = require("../converter.js");

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


    describe("convert inline image links", function () {

        it("should return the same string if it has no links", function () {
            assert.equal(converter.convert_inline_image_links("string"), "string");
        });

        it("should convert a single inline image link", function() {

            const original = "Inline-style: ![Markdown Here Logo](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)";
            const expected = "Inline-style: <img alt=\"Markdown Here Logo\" src=\"https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png\">";

            assert.equal(converter.convert_inline_image_links(original), expected);
        });

        it("should convert multiple inline image links", function() {

            const original = "![First image](https://example.com/image-1.png) ![Second image](https://example.com/image-2.png)";
            const expected = "<img alt=\"First image\" src=\"https://example.com/image-1.png\"> <img alt=\"Second image\" src=\"https://example.com/image-2.png\">" ;

            assert.equal(converter.convert_inline_image_links(original), expected);
        });


    });


    describe("convert bolded text", function () {

        it("should return the same strings if it's not marked up as bold", function () {
            const original = "These words should not be bolded.";
            const expected = "These words should not be bolded.";

            assert.equal(converter.convert_bold(original), expected);
        });

        it("should convert a string marked up using '**'", function () {
            const original = "**These words** should be bolded.";
            const expected = "<strong>These words</strong> should be bolded.";

            assert.equal(converter.convert_bold(original), expected);
        });

        it("should convert a string marked up using '__'", function () {
            const original = "__These words__ should be bolded.";
            const expected = "<strong>These words</strong> should be bolded.";

            assert.equal(converter.convert_bold(original), expected);
        });

    });



    describe("convert emphasized text", function () {

        it("should return the same strings if it's not marked up as emphasis", function () {
            const original = "These words should not be emphasized.";
            const expected = "These words should not be emphasized.";

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

    describe("convert bolded and emphasized text", function () {

        it("should convert a bolded and emphasized string", function () {
            const original = "Combined emphasis with **asterisks and _underscores_**.";
            const expected = "Combined emphasis with <strong>asterisks and <em>underscores</em></strong>.";

            let result = converter.convert_bold(original);
            result = converter.convert_emphasis(result);

            assert.equal(result, expected);
        });

    })

    describe("convert strikethroughed text", function () {

        it("should return the same strings if it's not marked up as strikethrough", function () {
            const original = "These words should not be strikethroughed.";
            const expected = "These words should not be strikethroughed.";

            assert.equal(converter.convert_strikethrough(original), expected);
        });

        it("should convert a string marked up using '~~'", function () {
            const original = "~~These words~~ should be strikethroughed.";
            const expected = "<strike>These words</strike> should be strikethroughed.";

            assert.equal(converter.convert_strikethrough(original), expected);
        });

    });



    describe("convert inline code", function () {

        it("should not convert a inline code if not well formatted", function () {
            const original = "This should not be formatted";
            const expected = "This should not be formatted";

            assert.equal(converter.convert_inline_code(original), expected);
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
