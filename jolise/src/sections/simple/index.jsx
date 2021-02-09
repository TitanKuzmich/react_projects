import React, {useEffect, useRef, useState} from 'react';
import Lottie from 'react-lottie';
import classNames from 'classnames';
import {Link} from "react-router-dom";
import {gsap, TimelineLite} from "gsap";
import {CSSRulePlugin} from "gsap/CSSRulePlugin";

import style from './style.module.scss';

import headerBg from '../../assets/lotties/simpleHeaderBgY.json';
import arrowDown from '../../assets/lotties/blackTripleArrow.json';

import {SectionWrapper} from "../../components/Wrappers";

gsap.registerPlugin(CSSRulePlugin);

function SimplePage({ routeAnim }) {
    const [openMenu, setOpenMenu] = useState(true);

    const borderWrapperRef = useRef(null);
    const spanWrapperRef = useRef(null);
    const spanFirstRef = useRef(null);
    const spanSecondRef = useRef(null);
    const spanThirdRef = useRef(null);
    const navigationRef = useRef(null);

    const menuTl = new TimelineLite({defaults: {duration:0.3 ,ease: "none"}});

    const menuAnim = () => {
        if(openMenu) {
            menuTl
                .to(spanSecondRef.current, {transformOrigin: "100% 50%", x: "115%"})
                .to(spanFirstRef.current, {backgroundColor:"#fff", transformOrigin: "100% 0", x: -9, y: -9, rotate: -45}, 0.3)
                .to(spanThirdRef.current, {backgroundColor:"#fff", transformOrigin: "100% 100%", x: -9, y: 9, rotate: 45}, 0.3)
                .to(borderWrapperRef.current, {borderColor: "#fff"}, 0.3)
                .to(navigationRef.current, {duration: 0.6, left: 0}, 0);

        }
        if (!openMenu){
            menuTl
                .to(spanSecondRef.current, {transformOrigin: "100% 50%", x: 0}, 0.3)
                .to(spanFirstRef.current, {backgroundColor: "#D09A4E", transformOrigin: "100% 0", x: 0, y: 0, rotate: 0}, 0)
                .to(spanThirdRef.current, {backgroundColor: "#D09A4E", transformOrigin: "100% 100%", x: 0, y: 0, rotate: 0}, 0)
                .to(borderWrapperRef.current, {borderColor:"transparent"}, 0)
                .to(navigationRef.current, {duration: 0.6, left: "-100%"}, 0);
        }
        setOpenMenu(!openMenu)
    }

    const headerBgOptions = {
        loop: true,
        autoplay: true,
        animationData: headerBg,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const arrowDownOptions = {
        loop: true,
        autoplay: true,
        animationData: arrowDown,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <header className={style.header}>

            <div className={style.menuSideTitle}>
                <div className={classNames(style.menuSideTitleText, style.titleBrandyColor)}>
                    SMM агенство

                    <div className={classNames(style.sideTitleDivider, style.dividerChambrayColor)}> </div>
                </div>
            </div>

            {/*<div className={style.sideTitle}>*/}
            {/*    <h1 className={style.sideTitleText}>SMM Агенство</h1>*/}
            {/*    <div className={style.sideDivider}> </div>*/}
            {/*</div>*/}

            <div ref={navigationRef} className={style.navigation}>
                <nav className={style.mainNavigation}>
                    <ul>
                        <li className={style.mainNavigationItem}><a href="#">Немного статистики</a></li>
                        <li className={style.mainNavigationItem}><a href="#">Наши услуги</a></li>
                        <li className={style.mainNavigationItem}><a href="#">Консультация</a></li>
                        <li className={style.mainNavigationItem}><a href="#">Кейсы</a></li>
                        <li className={style.mainNavigationItem}><a href="#">Контакты</a></li>
                        <li className={style.mainNavigationItem}><a href="/" onClick={(e) => {routeAnim(e)}}>На главную</a></li>
                    </ul>

                    <div className={style.menuSideTitle}>
                        <div className={style.menuSideTitleText}>
                            SMM агенство

                            <div className={style.sideTitleDivider}> </div>
                            <div className={classNames(style.sideTitleDivider, style.secondSideTitleDivider)}> </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div onClick={menuAnim} className={style.hamburger}>
                <div ref={borderWrapperRef} className={style.borderWrapper}>
                    <div ref={spanWrapperRef} className={style.spanWrapper}>
                        <span ref={spanFirstRef}> </span>
                        <span ref={spanSecondRef}> </span>
                        <span ref={spanThirdRef}> </span>
                    </div>
                </div>
            </div>

            <SectionWrapper>
                <div className={style.info}>
                    <div className={style.infoWrapper}>
                        <div className={style.infoTextBlock}>
                            <p className={style.infoBigText}>Эффективное продвижение</p>
                            <p className={style.infoSmallText}>в социальных сетях</p>
                        </div>

                        <div className={style.divider}> </div>

                        <div className={style.infoTextBlock}>
                            <p className={style.infoBigText}>Эффектное оформление</p>
                            <p className={style.infoSmallText}>Вашего бизнеса</p>
                        </div>

                        <div className={style.divider}> </div>

                        <div className={style.infoTextBlock}>
                            <p className={style.infoBigText}>Качественный СММ</p>
                            <p className={style.infoSmallText}>это в точности про нас!</p>
                        </div>

                        <div className={classNames(style.arrow, style.arrowHeader)}>
                            <Lottie options={arrowDownOptions}/>
                        </div>
                    </div>

                    <div className={style.lottieWrapper}>
                        <div className={style.headerBg}>
                            <Lottie options={headerBgOptions}/>
                        </div>
                        <Link className={style.sendRequest}>Оставить заявку</Link>
                    </div>
                </div>
            </SectionWrapper>
        </header>
    );
}

export default SimplePage;