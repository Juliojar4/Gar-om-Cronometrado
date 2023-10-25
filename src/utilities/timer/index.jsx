/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import "./index.scss"

import axios from "axios"

const CountdownTimer = ({ initialMinutes, initialSeconds, food,id }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
                 document.getElementsByClassName('timer')[id].parentElement.classList.add('d-none'); 
                axios({   
                    method: 'post',
                    url: 'https://ntfy.sh/garcon',
                    data: `A porção de ${food} está pronta`,
                })  

            } else {
                if (seconds === 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds(seconds - 1);
                }
            }
        }, 1000);


        return () => clearInterval(interval);
    }, [minutes, seconds]);
    return (
        <div className='timer food'>
            <div className='food-timer-content d-flex flex-column align-items-center text-center'>
                <h1 className='name-food'>{food}</h1>
                <p className='time-food'>Tempo restante: {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}</p>
            </div>
        </div>
    );
};

export default CountdownTimer;
