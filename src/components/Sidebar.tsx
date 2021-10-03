import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { add, Note, deteteNote } from "../state";

export default ({
    notes,
    onSelect = () => {},
}: {
    notes: Note[];
    onSelect?: (_id: string) => void;
}) => {
    const history = useHistory();
    return (
        <div>
            <ButtonNew
                onClick={() => {
                    const id = add();
                    setTimeout(() => {
                        history.push("/" + id);
                    }, 100);
                }}
            >
                New
            </ButtonNew>
            {notes.map((note) => (
                <Item key={note._id} to={`/${note._id}`}>
                    {note.title}
                    <X
                        onClick={() => {
                            if (window.confirm("Are you sure")) {
                                deteteNote(note._id!);
                            }
                        }}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
                        </svg>
                    </X>
                </Item>
            ))}
        </div>
    );
};

const ButtonNew = styled.div`
    display: block;
    font-weight: 600;
    color: #000;
    text-decoration: none;
    font-size: 12px;
    background: #f6f6f6;
    cursor: pointer;
    text-align: center;
    padding: 5px;
`;
const Item = styled(Link)`
    padding: 10px;
    font-family: consolas;
    display: block;
    text-decoration: none;
    color: #555;
    cursor: pointer;
    border-top: 1px solid #ececec;
    display: flex;
    justify-content: space-between;
    :last-of-type {
        border-bottom: 1px solid #ececec;
    }
    :hover {
        background: #f5f5f5;
    }
`;
const X = styled.div`
    border-radius: 5px;
    font-size: 18px;
    opacity: 0.3;
    :hover {
        opacity: 1;
        color: #000;
        background: #ccc;
    }
`;
