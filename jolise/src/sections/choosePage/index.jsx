import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {Power3, Sine, TimelineLite, TweenLite} from "gsap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Lottie from "react-lottie"
import Particles from "react-particles-js";

import style from "./style.module.scss";

import arrowAnimationData from "../../assets/lotties/blackTripleArrow.json"
import {complexSideConfig, simpleParticles} from "../../assets/particlesConfig";

import {chooseStartAnimation} from "../../redux/actions/choosePage"

function ChoosePage({ routeAnim }) {

    const dispatch = useDispatch();
    const isLoaded = useSelector(({preloader}) => preloader.isLoaded);
    const startAnim = useSelector(({choosePage}) => choosePage.startAnimation);
    const needPreloader = useSelector(({preloader}) => preloader.needPreloader);

    const mainPageRef = useRef(null);
    const titleRef = useRef(null);
    const madeByRef = useRef(null);
    const dividerTopRef = useRef(null);
    const dividerBottomRef = useRef(null);
    const arrowTopRef = useRef(null);
    const arrowBottomRef = useRef(null);
    const simpleTitleRef = useRef(null);
    const complexTitleRef = useRef(null);
    const curtainTopRef = useRef(null);
    const curtainBottomRef = useRef(null);

    const [rotateAnim, setRotateAnim] = useState(false);

    const tl = new TimelineLite();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: arrowAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const rotateOnEnter = () => {
        TweenLite.set([titleRef.current, arrowTopRef.current, arrowBottomRef.current], {transformOrigin:"50% 50%"})
        if(startAnim) {
            tl
                .to([dividerTopRef.current, dividerBottomRef.current], {
                    duration: 0.4,
                    height: "38%",
                    ease: Sine.easeInOut
                }, 0)
                .to(titleRef.current, {duration: 0.6, rotate: "0", ease: Sine.easeInOut}, 0.3)
                .to(arrowTopRef.current, {
                    duration: 0.5,
                    rotate: "135",
                    ease: Sine.easeInOut,
                    top: "36%",
                    left: "39%"
                }, 0.3)
                .to(arrowBottomRef.current, {
                    duration: 0.5,
                    rotate: "-45",
                    ease: Sine.easeInOut,
                    bottom: "36%",
                    left: "59%"
                }, 0.3)
                .to(simpleTitleRef.current, {
                    duration: 0.5,
                    ease: "none",
                    paddingRight: "50%"
                }, 0.3)
                .to(complexTitleRef.current, {
                    duration: 0.5,
                    ease: "none",
                    paddingLeft: "50%"
                }, 0.3)
        }
    }

    const rotateOnLeave = () => {
        TweenLite.set([titleRef.current, arrowTopRef.current, arrowBottomRef.current], {transformOrigin:"50% 50%"})
        if(startAnim) {
            tl
                .to([dividerTopRef.current, dividerBottomRef.current], {
                    duration: 0.4,
                    height: "31%",
                    ease: Sine.easeInOut
                }, 0)
                .to(titleRef.current, {duration: 0.6, rotate: "-90", ease: Sine.easeInOut}, 0.3)
                .to(arrowTopRef.current, {
                    duration: 0.5,
                    rotate: "180",
                    top: "28%",
                    left: "41%",
                    ease: Sine.easeInOut,
                }, 0.3)
                .to(arrowBottomRef.current, {
                    duration: 0.5,
                    rotate: "0",
                    bottom: "28%",
                    left: "56%",
                    ease: "none"
                }, 0.3)
                .to(simpleTitleRef.current, {
                    duration: 0.5,
                    ease: Sine.easeInOut,
                    paddingRight: "53px"
                }, 0.3)
                .to(complexTitleRef.current, {
                    duration: 0.5,
                    ease: "none",
                    paddingLeft: "53px"
                }, 0.3)
        }
    }

    const rotation = () => {
        if(isLoaded) {
            setRotateAnim(!rotateAnim);
            if(rotateAnim){
                rotateOnEnter()
            } else if(!rotateAnim){
                rotateOnLeave();
            }
        }
    }


    useEffect(() => {
        if(needPreloader){
            TweenLite.set(mainPageRef.current, {left: "-100%"})
        }
        if(isLoaded && needPreloader){
            tl
                .to(mainPageRef.current, {duration:2, ease: Power3.easeInOut, left: "0%"})
                .call(() => dispatch(chooseStartAnimation()))
        }
        if(startAnim){
            tl
                .to(arrowTopRef.current, {duration: 0.7, ease: Power3.easeInOut, top: "28%"}, 0)
                .to(arrowBottomRef.current, {duration: 0.7, ease: Power3.easeInOut, bottom: "28%"}, 0)
                .to(simpleTitleRef.current, {duration: 0.7, ease: Power3.easeInOut, top: "5%"},0)
                .to(complexTitleRef.current, {duration: 0.7, ease: Power3.easeInOut, bottom: "5%"}, 0)
                .to(madeByRef.current, {duration: 1.4, ease: "elastic.out(0.9, 0.4)", bottom: "0%", left: "0%"}, 0.2)
                .to(curtainTopRef.current, {duration: 1, ease: Power3.easeOut, scaleY: 0, transformOrigin:"50% 0%"}, 0.5)
                .to(curtainBottomRef.current, {duration: 1, ease: Power3.easeOut, scaleY: 0, transformOrigin:"50% 100%"}, 0.5)
        }
    }, [isLoaded, startAnim]);

    return (
            <div ref={mainPageRef} className={style.choosePage}>
                <div className={style.relativeWrapper}>
                    <div ref={arrowTopRef} className={style.arrowTop}>
                        <Lottie options={defaultOptions}/>
                    </div>
                    <div ref={dividerTopRef} className={style.dividerTop}> </div>
                    <div
                        ref={titleRef}
                        onClick={rotation}
                        className={classNames("pageTitle", style.chooseTitle)}>
                        {/*Выбор за тобой*/}
                        Choose <br/> your side
                    </div>
                    <div ref={dividerBottomRef} className={style.dividerBottom}> </div>
                    <div ref={arrowBottomRef} className={style.arrowBottom}>
                        <Lottie options={defaultOptions}/>
                    </div>

                    <div ref={madeByRef} className={style.madeBy}>
                        <div className={style.madeByWrapper}>
                            Made by TiSai, <br/> with love
                        </div>
                    </div>

                    <div className={style.simpleSide}>
                        <div ref={curtainTopRef} className={style.whiteCurtain}> </div>
                        <Particles className={style.complexParticles}
                                   canvasClassName={style.complexCanvas}
                                   params={simpleParticles}/>
                        <div ref={simpleTitleRef} className={style.simpleSideTitle}>
                            <div className={style.titleWrapper}>
                                <h2>
                                    <a href="/simple" onClick={(e) => {routeAnim(e)}}>
                                        Awesome LIght
                                    </a>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className={style.complexSide}>
                        <div ref={curtainBottomRef} className={style.whiteCurtain}> </div>
                        <Particles className={style.complexParticles}
                                   canvasClassName={style.complexCanvas}
                                   params={complexSideConfig}/>
                        <div ref={complexTitleRef} className={style.complexSideTitle}>
                            <div className={style.titleWrapper}>
                                <h2>
                                    <a href="/creative" onClick={(e) => {routeAnim(e)}}>
                                        Creative Emotional
                                    </a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ChoosePage;