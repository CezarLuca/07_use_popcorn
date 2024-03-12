// ----------------------------------------------------------------
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
        - useEffect is like an event listener that is listening
        for one depencecy to change. Whenvr that dependency 
        changes, it will run the effect again;
        - Effects react to updates to state and props used inside
        the effect (the dependencies). So effects are "reactive" 
        (like state updates re-rendering the UI);
    - Synchronization and lifecycle:
        - We can use the dependency array to run effects when
        the component renders or re-renders;

*/
