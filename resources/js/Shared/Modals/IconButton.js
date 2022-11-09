import React from 'react';

export default function IconButton(props) {
    const {
        children,
        onClick = (event) => {},
        className = '',
    } = props;
    return (
        <button
            onClick={onClick}
            className={`btn btn-icon btn-sm btn-active-icon-primary ${className}`}
        >
            {children}
        </button>
    );
}
