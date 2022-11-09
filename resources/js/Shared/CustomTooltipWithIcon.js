import React from 'react';
import CustomTooltip from './CustomTooltip';

const CustomTooltipWithIcon = ({ icon = "fas fa-exclamation-circle", content, tagName = "span", className = "target", direction = "right" }) => {
    return (
        <CustomTooltip
            content={content}
            direction={direction}
            tagName={tagName}
            className={className}
        >
            <i className={`ms-2 fs-7 ${icon}`}></i>
        </CustomTooltip>
    )
};

export default CustomTooltipWithIcon;