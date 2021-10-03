// const { default } = require('./defaults.js');
import { defaults } from "./defaults";

import { cleanUrl, escape } from "./helpers";

/**
 * Renderer
 */
export default class Renderer {
    constructor(options) {
        this.options = options || defaults;
    }

    code(code, infostring, escaped) {
        const lang = (infostring || "").match(/\S*/)[0];
        if (this.options.highlight) {
            const out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }

        // code = code.replace(/\n$/, '') + '\n';

        if (!lang) {
            return (
                "<span>```</span><pre><code>" +
                (escaped ? code : escape(code, true)) +
                "</code></pre>\n"
            );
        }

        return (
            '<pre><code class="' +
            this.options.langPrefix +
            escape(lang, true) +
            '">```' +
            (escaped ? code : escape(code, true)) +
            "```</code></pre>\n"
        );
    }

    blockquote(quote) {
        return "<blockquote>\n" + quote + "</blockquote>\n";
    }

    html(html) {
        return html;
    }

    heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
            return (
                "<h" +
                level +
                ' id="' +
                this.options.headerPrefix +
                slugger.slug(raw) +
                '"><span>' +
                Array(level)
                    .fill(0)
                    .map((i) => "#")
                    .join("") +
                "</span> " +
                text +
                "</h" +
                level +
                ">"
            );
        }
        // ignore IDs
        return "<h" + level + ">" + text + "</h" + level + ">\n";
    }

    hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
    }

    list(body, ordered, start) {
        const type = ordered ? "ol" : "ul",
            startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
        return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
    }

    listitem(text) {
        return "<li><span>-</span> " + text + "</li>";
    }

    checkbox(checked) {
        return checked
            ? '<span class="cb">[<b>x</b>]</span> '
            : '<span class="cb">[ ]</span> ';
    }

    paragraph(text) {
        return "<div>" + text + "</div>";
    }

    table(header, body) {
        if (body) body = "<tbody>" + body + "</tbody>";

        return (
            "<table>\n" +
            "<thead>\n" +
            header +
            "</thead>\n" +
            body +
            "</table>\n"
        );
    }

    tablerow(content) {
        return "<tr>\n" + content + "</tr>\n";
    }

    tablecell(content, flags) {
        const type = flags.header ? "th" : "td";
        const tag = flags.align
            ? "<" + type + ' align="' + flags.align + '">'
            : "<" + type + ">";
        return tag + content + "</" + type + ">\n";
    }

    // span level renderer
    strong(text) {
        return "<span>**</span><strong>" + text + "</strong><span>**</span>";
    }

    em(text) {
        return "<span>*</span><em>" + text + "</em><span>*</span>";
    }

    codespan(text) {
        return (
            '<span class="code">`</span><code>' +
            text +
            '</code><span class="code">`</span>'
        );
    }

    br() {
        return this.options.xhtml ? "<br/>" : "<br>";
    }

    del(text) {
        return "<del>" + text + "</del>";
    }

    link(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return text;
        }
        let out = '<a href="' + escape(href) + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += ">" + text + "</a>";
        return out;
    }

    image(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return text;
        }

        let out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? "/>" : ">";
        return out;
    }

    text(text) {
        return text;
    }
}
