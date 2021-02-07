import React, { useRef, useEffect } from 'react';
import {gsap, TimelineLite, Power1, Power3} from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import {useDispatch} from "react-redux"

import style from './style.module.scss'

import {preloaderFinish, needPreloader} from "../../redux/actions/preloader";

gsap.registerPlugin(TextPlugin);

function Preloader() {
     const textRef = useRef(null);
     const preloaderBlockRef = useRef(null);
     const dispatch = useDispatch();

     const tl = new TimelineLite();

     useEffect(() => {
         tl
             .to(textRef.current, {duration: 2, text: "_Jolise_", ease: Power1.easeInOut, delay: 0.5})
             .call(() => dispatch(preloaderFinish()))
             .to(preloaderBlockRef.current, {duration: 2, ease: Power3.easeInOut, x: "100%",  transformOrigin: "right"})
             .call(() => dispatch(needPreloader()))
     }, [])

    return (
        <div ref={preloaderBlockRef} className={style.preloader}>
            <p  ref={textRef}>--------</p>
        </div>
    );
}

export default Preloader;