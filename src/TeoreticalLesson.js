// ---------------------------------------------------------
/* 9. The useEffect Dependency Array

    - The Dependency Array:
        - By default, effects run after every render. We can 
        prevent that by passing a dependency array;
        - Without the dependency array, React doenst know when
        to re-run the effect;
        - Each time one of the dependencies changes, the effect
        will run again;
        - Every state variable and prop used inside the effect
        must be included in the dependency array (otherwise, 
        we get a "stale closure" bug);
    - The Mechanics of Effects:
        - useEffect is like an event listener

*/
