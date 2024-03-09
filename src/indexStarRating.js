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
        <StarRating
            maxRating={10}
            color="blue"
            className="test"
            defaultRating={5}
        />
        <StarRating maxRating={3} messages={["bad", "okay", "good"]} />
        <Test />
    </React.StrictMode>
);

function Test() {
    const [movieRating, setMovieRating] = React.useState(0);
    return (
        <div>
            <StarRating
                color="green"
                maxRating={10}
                onSetRating={setMovieRating}
            />
            <p>This Movie was Rated {movieRating} Stars</p>
        </div>
    );
}
