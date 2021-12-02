import { useCallback, useRef} from "react";

const useLongPress = (onLongPress,delay = 300) => {

    const timeout = useRef();

    const start = useCallback(event => {
        timeout.current = setTimeout(() => {onLongPress(event)}, delay);
    },[onLongPress, delay]);

    const clear = useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
    },[]);

    return {
        onMouseDown: e => start(e),
        onMouseUp: e => clear(e),
        onMouseLeave: e => clear(e),
    };
};

export default useLongPress;