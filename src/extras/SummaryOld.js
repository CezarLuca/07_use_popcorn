// const average = (array) => {
//     if (array.length === 0) return 0;
//     return array
//         .reduce((accumulator, currentVal) => {
//             const value = Number(currentVal);
//             if (isNaN(value)) {
//                 return accumulator;
//             } else {
//                 return accumulator + value / array.length;
//             }
//         }, 0)
//         .toFixed(2);
// };

const average = (array, property) => {
    const values = array
        .map((movie) => movie[property])
        .filter((value) => !isNaN(Number(value)));
    if (values.length === 0) return 0;
    return parseFloat(
        (
            values.reduce(
                (accumulator, currentVal) => accumulator + Number(currentVal),
                0
            ) / values.length
        ).toFixed(2)
    );
};

export default function Summary({ watched }) {
    // const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    // const avgUserRating = average(watched.map((movie) => movie.userRating));
    // const avgRuntime = average(watched.map((movie) => movie.runtime));

    const avgImdbRating = average(watched, "imdbRating");
    const avgUserRating = average(watched, "userRating");
    const avgRuntime = average(watched, "runtime");

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}
