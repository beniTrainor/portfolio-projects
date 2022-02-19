const markdown_input = document.querySelector("#markdown-input");
const markdown_output = document.querySelector("#markdown-output");

let converter;
if ("MARKDOWN_CONVERTER" in window) {
    converter = window.MARKDOWN_CONVERTER;
} else {
    throw new Error("Markdown converter not found.")
}

// Convert the input right after loading the page.
convert_input();

markdown_input.addEventListener("keyup", function (evt) {

    // Clear the output
    markdown_output.innerText = "";

    convert_input();
});

function convert_input() {

    const converted_text = convert(markdown_input.value);
    console.log(converted_text);
    const parser = new DOMParser("text/html");
    const parsed_html = parser.parseFromString(converted_text, "text/html").body;
    console.log(parsed_html);
//     console.log(parsed_html.innerText);
//     console.log([...parsed_html.children]);
    Array.from(parsed_html.children).forEach(function (node) {
        markdown_output.appendChild(node);
    });
    

}

function convert(text) {

    text = converter.convert_blockquotes(text.split("\n")).join("\n");
    text = converter.convert_code_blocks(text.split("\n")).join("\n");
    text = converter.convert_horizontal_rule(text.split("\n")).join("\n");
//     text = converter.convert_headings(text);
//     text = converter.convert_paragraphs(text);


    text = text.split("\n").map(function (line) {
//         console.log({line});
        line = converter.convert_emphasis(line);
        line = converter.convert_inline_code(line);
        line = converter.convert_inline_image_links(line);
        line = converter.convert_links(line);
        return line;
    }).join("\n");

    return text;
}
