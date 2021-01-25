import React from 'react';
import classNames from 'classnames'

function Button({className, outline, children, buttonClick}) {
    return (
        <button
            className={classNames('button', className, {
                'button--outline': outline
            })}
            onClick={buttonClick}
        >
            {children}
        </button>
    );
}

export default Button;