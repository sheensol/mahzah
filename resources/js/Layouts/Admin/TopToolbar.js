import React from "react"

const TopToolbar = ({ children }) => {
    return (
        <div className="toolbar">
            <div className="container-fluid d-flex flex-stack">
                {children}
            </div>
        </div>
    );
}

export default TopToolbar
