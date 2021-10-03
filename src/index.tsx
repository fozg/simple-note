import React from "react";
import ReactDOM from "react-dom";
import Preview from "./sdks/index";
import Root from "./Root";
const LiveTitle = () => (
    <div style={{ height: "100%", background: "#eee" }}>To be implement</div>
);

if (process.env.NODE_ENV !== "production") {
    ReactDOM.render(
        <Preview root={<Root />} liveTitle={<LiveTitle />} />,
        document.getElementById("demo")
    );
} else {
    (function (AppManager) {
        AppManager.register({
            appId: process.env.REACT_APP_MICRO_APP_NAME,
            root: true,
            renderRoot: (elementId: string) => {
                ReactDOM.render(<Root />, document.getElementById(elementId));
            },
            renderLiveTitle: (elementId: string) => {
                ReactDOM.render(
                    <LiveTitle />,
                    document.getElementById(elementId)
                );
            },
        });
    })((window as any).AppManager);
}
