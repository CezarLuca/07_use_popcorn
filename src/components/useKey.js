import { useEffect } from "react";

export function useKey(pressedKey, callbackAction) {
    useEffect(() => {
        const callback = (e) => {
            if (e.code.toLowerCase() === pressedKey.toLowerCase()) {
                callbackAction();
            }
        };

        document.addEventListener("keydown", callback);

        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [callbackAction, pressedKey]);
}
