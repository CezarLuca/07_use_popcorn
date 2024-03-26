// ----------------------------------------------------------------------------
// 160 - React Hooks and their Rules

/* 
    1. React Hooks are special built-in functions that allow 
    you to use state and other React features in functional
    components. They allow us to "hook into".
    React internals:
        - Creating and accessing state from Fiber tree;
        - Registring side effects in the Fiber tree;
        - Manual DOM selections;
        - etc.
    2. React Hooks are functions that always start with "use" keyword.
    3. React Hooks enable easy reusing of stateful logic (non-visual 
    logic): we can compose multiple hooks into ouur own custom hooks. 
    4. React Hooks give function components the ability to own state 
    and run side effects at different lifecycle points (before c16.8 
    was only avalible in class components).
    
    Most common React Hooks:
        - useState: to manage state in functional components;
        - useEffect: to manage side effects in functional components;
        - useContext: to consume context in functional components;
        - useRef: to access DOM nodes in functional components;
        - useMemo: to memoize values in functional components;
        - useCallback: to memoize functions in functional components;
        - useReducer: to manage state in functional components with 
        complex state logic;
        - useLayoutEffect: to manage side effects in functional components 
        that require DOM measurements;
        - useImperativeHandle: to customize the instance value that is 
        exposed to parent components when using ref;
        - useDebugValue: to display a label for custom hooks in React DevTools.
        - useTransition: to manage multiple loading states in concurrent mode.
        - useDeferredValue: to defer updating a value in concurrent mode.
        - useId: to generate a unique ID in concurrent mode.
    
    Rules of React Hooks:
        1. Only call hooks at the top level of your functional component.
            - Don't call hooks inside loops, conditions, or nested functions 
            or after an early return statement.
            - This is necessary to ensure that hooks are called in the same
            order each time a component renders, which is important because
            hooks rely on the order in which they are called.
        2. Only call hooks from functional components (from React components).
            - Only call hooks inside a react functional component or a custom
            hook.
            - Don't call hooks from regular JavaScript functions.
        3. These rules are automatically enforced by the React ESLint plugin
*/

// ----------------------------------------------------------------------------
// 169 - Custom Hooks in React - Introduction

/*
    1. Custom Hooks are a way to reuse stateful logic between components. 
    They are JavaScript functions whose names start with "use" and may 
    call other hooks. Custom Hooks are a mechanism to extract component 
    logic into reusable functions. They allow you to reuse stateful logic 
    between components without changing the component hierarchy.
*/
