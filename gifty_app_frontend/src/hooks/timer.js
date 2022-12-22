import React, { useEffect, useState } from "react";

export default function useTimer(timeLimit) {
    const [timer, setTimer] = useState(timeLimit);

    useEffect(()=>{
        const timerIntervalId = setInterval(()=>{
            setTimer(timer - 1);
        }, 1000);

        if (timer === 0) {
            clearInterval(timerIntervalId);
        }

        return ()=>{
            clearInterval(timerIntervalId);
        }
    }, [timer]);

    return {
        timer
    };
}
