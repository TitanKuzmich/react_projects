import React, {useRef, useEffect} from 'react';
import classNames from 'classnames';
import {TimelineLite} from "gsap";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router";

import style from './style.module.scss'

import {changePageAnimation} from "../../redux/actions/changePage"

export const PageAnimationWrapper = ({ children, className, destination, event}) => {

    const dispatch = useDispatch();
    const isChanging = useSelector(({changePage}) => changePage.changingPage)

    const currentPageRef = useRef(null);
    const routeAnimFirstRef = useRef(null);
    const routeAnimSecondRef = useRef(null);
    const routeAnimThirdRef = useRef(null);
    const routeAnimFourthRef = useRef(null);

    const routeTimeline = new TimelineLite();

    const routeAnim = (e) => {
        e.preventDefault();
        dispatch(changePageAnimation(true));
        routeTimeline
            .to(routeAnimFirstRef.current, {duration: .7, ease: "power3.easeOut", right: "-9%"}, 0)
            .to(routeAnimSecondRef.current, {duration: .6, ease: "power3.easeOut", right: "25%"}, 0.2)
            .to(routeAnimThirdRef.current, {duration: .5, ease: "power3.easeOut", right: "60%"}, 0.4)
            .to(routeAnimFourthRef.current, {duration: .4, ease: "power3.easeOut", right: "94%"}, 0.5)
            .to(currentPageRef.current, {duration: .3, ease:"power3.easeInOut", opacity: 0})
            .call(() => {
                dispatch(changePageAnimation(false));
                dispatch(push(e.target.pathname));
            })
    }

    useEffect(() => {
        return console.log("component will unmount")
    }, [])

    const clonedChildren = React.cloneElement(children, {routeAnim})

    return (
        <div ref={currentPageRef} className={classNames(className)}>
            { clonedChildren }

            <div ref={routeAnimFirstRef} className={style.pageCurtain}> </div>
            <div ref={routeAnimSecondRef} className={style.pageCurtain}> </div>
            <div ref={routeAnimThirdRef} className={style.pageCurtain}> </div>
            <div ref={routeAnimFourthRef} className={style.pageCurtain}> </div>
        </div>
    );
}