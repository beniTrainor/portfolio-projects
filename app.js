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

    const parser = new DOMParser("text/html");
    const parsed_html = parser.parseFromString(converted_text, "text/html").body;

    Array.from(parsed_html.children).forEach(function (node) {
        markdown_output.appendChild(node);
    });
    

}

function convert(text) {

    let lines = text.split("\n");

    lines = converter.convert_blockquotes(lines);
    lines = converter.convert_code_blocks(lines);
    lines = converter.convert_horizontal_rule(lines);

    lines = lines.map(function (line) {
        line = converter.convert_heading(line);
        if (line === "" || ! line.match(/^<.+>/)) {
            line = `<p>${line}</p>`;
        }
        line = converter.convert_bold(line);
        line = converter.convert_emphasis(line);
        line = converter.convert_inline_code(line);
        line = converter.convert_inline_image_links(line);
        line = converter.convert_links(line);
        return line;
    });

    console.log({lines});

    return lines.join("\n");
}
