import React, { useState } from "react";
import styled from "styled-components";
import marked from "./marked/marked";

export default function () {
    const [md, setMd] = useState("");
    const onInput = (e: any) => {
        const html = e.target.value;
        const plantText = html.replace(/\n\n/g, "\n").replace(/  /g, " ");
        setMd(plantText);
    };
    return (
        <Overflow>
            <Editor>
                <Input
                    style={{
                        padding: 20,
                        fontFamily: "consolas",
                        fontSize: 16,
                    }}
                    spellCheck={false}
                    onInput={onInput}
                    value={md}
                ></Input>
                <Display
                    style={{
                        width: 500,

                        fontFamily: "consolas",
                        padding: 20,
                        fontSize: 16,
                        margin: "auto",
                    }}
                    spellCheck={false}
                    dangerouslySetInnerHTML={{
                        __html: marked(md.replace(/\n/g, "\n\n")),
                    }}
                ></Display>
            </Editor>
        </Overflow>
    );
}

const Overflow = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: 500px;
    width: 500px;
    margin: auto;
`;
const Editor = styled.div`
    position: relative;
    width: 500px;
    height: 100%;
    margin: auto;
    span {
        color: #ff572282;
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
    color: rgba(0, 0, 0, 0);
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
    position: relative;
    z-index: 9;
`;
