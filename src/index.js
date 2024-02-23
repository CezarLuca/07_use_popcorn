import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <StarRating maxRating={5} />
        <StarRating />
        <StarRating maxRating={5} color="red" size="1rem" />
        <StarRating maxRating={10} color="blue" className="test" />
        <StarRating maxRating={3} messages={["bad", "okay", "good"]} />
    </React.StrictMode>
);
