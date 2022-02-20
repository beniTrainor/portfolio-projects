(function () {

const debug_console_log = function (...args) {
    const DEBUG = true; 
    if (DEBUG) {
        console.log(...args);
    }
}

const Converter = (function () {

    const converter = {};

    converter.convert_heading = function(string) {

        const match = string.match("^#* ");
        if (match === null) {
            return string;
        }

        const level = match[0].length - 1;
        string = string.slice(level + 1,);

        return "<h" + level + ">" + string + "</h" + level + ">";
    }

    converter.convert_links = function(string) {
        const matches = string.match(/\[[^\]]*\]\([^\)]*\)/g);
        if (matches === null) {
            return string;
        }

        matches.forEach(function (match) {
            const link_text = match.match("\\[.*\\]")[0].slice(1, -1);
            const link_url = match.match("\\(.*\\)")[0].slice(1, -1);

            string = string.replace(match, `<a href="${link_url}">${link_text}</a>`);
        });

        return string;
    }

    converter.convert_inline_image_links = function(string) {
        const matches = string.match(/!\[[^\]]*\]\([^\)]*\)/g);
        if (matches === null) {
            return string;
        }

        matches.forEach(function (match) {
            const alt_text = match.match("\\[.*\\]")[0].slice(1, -1);
            const img_url = match.match("\\(.*\\)")[0].slice(1, -1);

            string = string.replace(match, `<img alt="${alt_text}" src="${img_url}">`);
        });

        return string;

    }

    converter.convert_bold = function(string) {

        const matches = [];

        const asterisk_matches = string.match(/\*\*[^\*]*\*\*/g);
        if (asterisk_matches !== null) {
            matches.push(...asterisk_matches);
        }

        const underscore_matches = string.match(/__[^_]*__/g);
        if (underscore_matches !== null) {
            matches.push(...underscore_matches);
        }

        if (matches.length === 0) {
            return string;
        }

        matches.forEach(function (match) {
            const text = match.slice(2, -2);
            string = string.replace(match, `<strong>${text}</strong>`);
        });

        return string;
    }

    converter.convert_emphasis = function(string) {

        const matches = [];

        const asterisk_matches = string.match(/\*[^\*]*\*/g);
        if (asterisk_matches !== null) {
            matches.push(...asterisk_matches);
        }

        const underscore_matches = string.match(/_[^_]*_/g);
        if (underscore_matches !== null) {
            matches.push(...underscore_matches);
        }

        if (matches.length === 0) {
            return string;
        }

        matches.forEach(function (match) {
            const text = match.slice(1, -1);
            string = string.replace(match, `<em>${text}</em>`);
        });

        return string;
    }

    converter.convert_strikethrough = function(string) {

        const matches = string.match(/~~[^~]+~~/g);
        if (matches === null) {
            return string;
        }

        matches.forEach(function (match) {
            const text = match.slice(2, -2);
            string = string.replace(match, `<strike>${text}</strike>`);
        });

        return string;
    }


    converter.convert_horizontal_rule = function(lines) {

        if (lines.length < 3) {
            return lines;
        }

        const converted_lines = [lines[0]];

        for (let i = 1; i < lines.length; i +=1) {
            const [prev, curr, next] = lines.slice(i - 1, i + 2);
            const is_curr_horizontal_rule = (
                /^-{3,}$/.test(curr) ||
                /^_{3,}$/.test(curr) ||
                /^\*{3,}$/.test(curr)
            );
            if (prev == "" && is_curr_horizontal_rule && next == "") {
                converted_lines.push("<hr>");
            } else {
                converted_lines.push(curr);
            }
        }

        return converted_lines;
    }

    converter.convert_inline_code = function(string) {
        const matches = string.match(/`[^`]*`/g);
        if (matches === null) {
            return string;
        }

        matches.forEach(function (match) {
            const text = match.slice(1, -1);
            string = string.replace(match, `<code>${text}</code>`);
        });

        return string;
    }

    converter.convert_blockquotes = function(lines) {

        const converted_lines = [];

        let is_blockquote_open = false;
        const blockquote_lines = [];

        lines.forEach(function (line) {

            if (line.startsWith("> ")) {
                is_blockquote_open = true;
                blockquote_lines.push(line.slice(2, ));
            } else {
                if (is_blockquote_open) {
                    is_blockquote_open = false;
                    converted_lines.push([
                        "<blockquote>",
                        ...blockquote_lines,
                        "</blockquote>"].join("\n"));

                    // Clear the queue
                    blockquote_lines.splice(0, blockquote_lines.length);

                    converted_lines.push(line);
                } else {
                    converted_lines.push(line);
                }
            }
        });

        if (blockquote_lines.length > 0) {
            converted_lines.push([
                "<blockquote>",
                ...blockquote_lines,
                "</blockquote>"].join("\n"));
        }

        return converted_lines;

    }

    converter.convert_code_blocks = function(lines) {

        const converted_lines = [];

        let is_codeblock_open = false;
        const codeblock_lines = [];

        lines.forEach(function (line) {

            if (line.startsWith("```")) {
                if (is_codeblock_open) {
                    is_codeblock_open = false;

                    converted_lines.push(["<pre>", ...codeblock_lines, "</pre>"].join("\n"));

                    // Clear the queue
                    codeblock_lines.splice(0, codeblock_lines.length);

                } else {
                    is_codeblock_open = true;
                }
            } else {
                if (is_codeblock_open) {
                    codeblock_lines.push(line);
                } else {
                    converted_lines.push(line);
                }
            }
        });

        if (codeblock_lines.length > 0) {
            converted_lines.push(["<pre>", ...codeblock_lines, "</pre>"].join("\n"));
        }

        return converted_lines;
    }


    converter.convert_ordered_lists = function (lines) {

// TODO: remove trailining new line characters from "</ol>". Not necessary

        const converted_lines = [];

        let has_ordered_list_started = false;
        const list_lines = [];

        lines.forEach(function (line) {

            const matches = line.match(/[0-9]+\.\s/);
            if (matches !== null) {
                has_ordered_list_started = true;
                list_lines.push(line.slice(matches[0].length, ));
            } else {
                if (has_ordered_list_started) {

                    let list_string = "<ol>\n";
                    list_lines.forEach(function (line) {
                        list_string += `<li>${line}</li>\n`;
                    });
                    list_string += "</ol>\n";

                    converted_lines.push(list_string);

                    // Clear the queue
                    list_lines.splice(0, converted_lines.length);

                    has_ordered_list_started = false;
                } else {
                    converted_lines.push(line);
                }
            }

        });

        if (list_lines.length > 0) {
            let list_string = "<ol>\n";
            list_lines.forEach(function (line) {
                list_string += `<li>${line}</li>\n`;
            });
            list_string += "</ol>\n";

            converted_lines.push(list_string);
        }

        return converted_lines;
    }


    converter.convert_unordered_lists = function (lines) {

        const converted_lines = [];

        let has_unordered_list_started = false;
        let last_list_symbol = "";
        const list_lines = [];

        lines.forEach(function (line) {

            debug_console_log({line});

            let matched_symbol = "";
            if (line.match(/^\*\s/)) {
                matched_symbol = "*";
            } else if (line.match(/^-\s/)) {
                matched_symbol = "-";
            } else if (line.match(/^\+\s/)) {
                matched_symbol = "+";
            }
            debug_console_log({matched_symbol});

            if (matched_symbol === "") {
                if (has_unordered_list_started) {
                    let list_string = "<ul>\n";
                    list_lines.forEach(function (line) {
                        list_string += `<li>${line}</li>\n`;
                    });
                    list_string += "</ul>";

                    converted_lines.push(list_string);

                    // Clear the queue
                    list_lines.splice(0, converted_lines.length);

                    has_unordered_list_started = false;
                    last_list_symbol = "";
                }
                converted_lines.push(line);

                return line;
            } else if (matched_symbol === last_list_symbol){
                list_lines.push(line.slice(2, ));
            } else {
                if (has_unordered_list_started) {
                    let list_string = "<ul>\n";
                    list_lines.forEach(function (line) {
                        list_string += `<li>${line}</li>\n`;
                    });
                    list_string += "</ul>";

                    converted_lines.push(list_string);

                    // Clear the queue
                    list_lines.splice(0, converted_lines.length);
                } else {
                    has_unordered_list_started = true;
                }
                last_list_symbol = matched_symbol;
                list_lines.push(line.slice(2, ));
            }

        });


        if (list_lines.length > 0) {
            let list_string = "<ul>\n";
            list_lines.forEach(function (line) {
                list_string += `<li>${line}</li>\n`;
            });
            list_string += "</ul>";

            converted_lines.push(list_string);
        }

        return converted_lines;
    }



    return Object.freeze(converter);
}());

// Use a workaround to both support Node.js and the browser
// Reference: https://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = Converter;
} else {
    window.MARKDOWN_CONVERTER = Converter;
}

}());
