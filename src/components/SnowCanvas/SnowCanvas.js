import snow from "./bg.png";
import React, { useEffect } from "react";
import starback from "starback"
import styles from "./snow.module.css"



export default function SnowCanvas () {


    useEffect(() => {
        new starback("#canvas", {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            type: 'dot',
            quantity: 300,
            starSize: [1, 5],
            direction: 20,
            starColor: 'white',
            randomOpacity: [0.7, 1],
            backgroundColor: 'transparent'
        })

        let bg = document.querySelector('.bg img');

        window.addEventListener('mousemove', e => {
            let transform = `scale(1.1) `
            let sensitivity = 0.05
            let translateX = (e.clientX - (window.innerWidth / 2)) * sensitivity
            let translateY = (e.clientY - (window.innerHeight / 2)) * sensitivity
            transform += `translate(${translateX}px, ${translateY}px)`
            bg.style.transform = transform
        })
    }, [])
    return <div className={styles.snow_canvas} >

        <div className={styles.bg}>
            <img src={snow} style={{
                height: '100vh',
                width: '100%',
                transition: 'all 2s cubic- bezier(0.25, 1, 0.5, 1)',
                objectFit: 'cover',
                transform: 'scale(1.1)',
            }} />
        </div>
        <canvas id="canvas"
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: -1,
                inset: 0,
            }}
        ></canvas>
    </div >


}