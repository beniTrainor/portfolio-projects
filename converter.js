module.exports = {};

module.exports.convert_heading = function(string) {

    const match = string.match("^#* ");
    if (match === null) {
        return string;
    }

    const level = match[0].length - 1;
    string = string.slice(level + 1,);

    return "<h" + level + ">" + string + "</h" + level + ">";
}

module.exports.convert_links = function(string) {
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

module.exports.convert_inline_image_links = function(string) {
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

module.exports.convert_emphasis = function(string) {

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


module.exports.convert_horizontal_rule = function(string) {
    const match = string.match(/^---$/);
    if (match === null) {
        return string;
    }
    return "<hr>";
}

module.exports.convert_inline_code = function(string) {
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

module.exports.convert_blockquotes = function(lines) {

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
                converted_lines.push("<blockquote>");
                converted_lines.push(...blockquote_lines);
                converted_lines.push("</blockquote>");

                // Clear the queue
                blockquote_lines.splice(0, blockquote_lines.length);

                converted_lines.push(line);
            } else {
                converted_lines.push(line);
            }
        }
    });

    if (blockquote_lines.length > 0) {
        converted_lines.push("<blockquote>");
        converted_lines.push(...blockquote_lines);
        converted_lines.push("</blockquote>");
    }

    return converted_lines;

}

module.exports.convert_code_blocks = function(lines) {

    const converted_lines = [];

    let is_codeblock_open = false;
    const codeblock_lines = [];

    lines.forEach(function (line) {

        if (line.startsWith("```")) {
            if (is_codeblock_open) {
                is_codeblock_open = false;

                converted_lines.push("<code>");
                converted_lines.push(...codeblock_lines);
                converted_lines.push("</code>");

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
        converted_lines.push("<code>");
        converted_lines.push(...codeblock_lines);
        converted_lines.push("</code>");
    }

    return converted_lines;
}
