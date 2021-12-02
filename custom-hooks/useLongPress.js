import { useCallback, useRef} from "react";

const useLongPress = (onLongPress,delay = 500) => {

    const timeout = useRef();

    const start = useCallback(() => {
        timeout.current = setTimeout(() => {onLongPress()}, delay);
    },[onLongPress, delay]);

    const clear = useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
    },[]);

    return {
        onMouseDown: e => start(),
        onMouseUp: e => clear(),
        onMouseLeave: e => clear(),
    };
};

export default useLongPress;