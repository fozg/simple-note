import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import { useStore, notesSelector } from "./state";

export default function () {
    const notes = useStore(notesSelector);
    return (
        <BrowserRouter
            basename={
                process.env.NODE_ENV === "production" ? "/simple-note/" : "/"
            }
        >
            <Layout>
                <Left>
                    <Sidebar notes={notes} />
                </Left>
                <Right>
                    <Switch>
                        <Route path="/new" component={Editor} />
                        <Route path="/:id" component={Editor} />
                    </Switch>
                </Right>
            </Layout>
        </BrowserRouter>
    );
}

const Layout = styled.div`
    display: flex;
    height: 100%;
    background: #f9f9f9;
`;
const Left = styled.div`
    border-right: 1px solid #ececec;
    width: 300px;
`;
const Right = styled.div`
    padding: 20px;
    height: 100%;
`;
