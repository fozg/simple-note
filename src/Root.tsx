import React, { useState } from "react";
import styled from "styled-components";
import marked from "./marked/marked";

export default function () {
    const [md, setMd] = useState("");
    const onInput = (e: any) => {
        const html = e.target.value;
        console.log(html)
        const plantText = html
            // .replace(/&lt;[^>]*b&gt;/g, "")
            // .replace(/<br>/g, '\n')
            // .replace(/<[^>]*>/g, "");
        console.log(plantText);
        setMd(html);
    };
    return (
        <Editor>
            <Inner
                style={{
                    border: "1px solid #ccc",
                    width: 500,
                    height: 500,
                    margin: "auto",
                    padding: 20,
                    fontFamily: "consolas",
                    fontSize: 16,
                }}
                spellCheck={false}
                onInput={onInput}
            ></Inner>
            <Display
                style={{
                    border: "1px solid #ccc",
                    width: 500,
                    height: 500,
                    fontFamily: "consolas",
                    padding: 20,
                    fontSize: 16,
                    margin: "auto",
                }}
                spellCheck={false}
                dangerouslySetInnerHTML={{ __html: marked(md) }}
            ></Display>
        </Editor>
    );
}

const Editor = styled.div`
    position: relative;
    width: 500px;
    margin: auto;
    span {
        color: #ddd;
    }
    code {
        background: #eee;
        border-radius: 5px;
        color: #f44336;
        margin: 0 -5px;
        padding: 0 5px;
    }
    pre {
        background: #eee;
        border-radius: 5px;
    }
`;
const Inner = styled.textarea`
    position: absolute;
    background: transparent;
    color: rgba(0, 0, 0, 0.1);
    caret-color: #000;
    caret-width: 3px;
    z-index: 10;
    left: 0;
`;
const Display = styled.div`
    position: relative;
    z-index: 9;
`;
