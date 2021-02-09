import React from 'react';
import classNames from 'classnames'

import style from './style.module.scss'

export const PageOverlay = ({ children, className, isFlex, justifyEnd }) => {
    return (
        <div className={classNames(style.pageOverlay, className, {[style.flexPageOverlay]: isFlex, [style.justifyEnd]: justifyEnd})}>{ children }</div>
    );
}

export const SectionWrapper = ({ children, className}) => {
    return (
        <div className={classNames(style.blockOverlay, className)}>{ children }</div>
    );
}