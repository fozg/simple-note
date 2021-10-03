import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getContent, updateContent } from "../state";
import marked from "../marked/marked";

export default function () {
    const [md, setMd] = useState("");
    const params = useParams<{ id: string }>();
    const id = params.id;
    useEffect(() => {
        const note = getContent(id);
        setMd(note?.note || "");
    }, [id]);

    const onInput = (e: any) => {
        const html = e.target.value;
        const plantText = html.replace(/\n\n/g, "\n").replace(/  /g, " ");
        setMd(plantText);
        updateContent(id, plantText);
    };
    return (
        <Editor>
            <Input
                autoFocus
                style={{
                    fontFamily: "consolas",
                    fontSize: 16,
                }}
                spellCheck={false}
                onInput={onInput}
                value={md}
            ></Input>
            <Display
                style={{
                    fontFamily: "consolas",
                    fontSize: 16,
                }}
                spellCheck={false}
                dangerouslySetInnerHTML={{
                    __html: marked(md.replace(/\n/g, "\n\n")),
                }}
            ></Display>
        </Editor>
    );
}

const Editor = styled.div`
    position: relative;
    width: 100%;
    min-width: 500px;
    height: 100%;
    margin: auto;
    span {
        color: #ff572282;
    }
    code {
        background: #eee;
        border-radius: 5px;
        color: #f44336;
    }
    pre {
        background: #eee;
        border-radius: 5px;
        margin: 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
        // display: inline;
        font-size: 16px;
        margin: 0;
        padding: 0;
        color: #f34d1a;
        span {
            color: #ff572282;
        }
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    li {
        div {
            display: inline;
        }
        color: #009688;
    }
    span.cb {
        color: #ccc;
        b {
            color: red;
        }
    }
`;
const Input = styled.textarea`
    border: none;
    position: absolute;
    background: transparent;
    outline: none;
    color: transparent;
    caret-color: #000;
    caret-width: 3px;
    z-index: 10;
    left: 0;
    width: 100%;
    resize: none;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;
const Display = styled.div`
    border: 2px solid transparent;
    position: relative;
    z-index: 9;
    width: 100%;
    top: 0;
    left: 0;
`;
