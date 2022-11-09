import React from 'react';
import Tooltip from 'react-tooltip-lite';

const CustomTooltip = ({ children, content, tagName = "span", className = "target", direction = "right" }) => {
    return (
        <Tooltip
            content={(
                <div className="max-w-xs py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
                    {content}
                </div>
            )}
            direction={direction}
            tagName={tagName}
            className={className}
        >
            {children}
        </Tooltip>
    )
};

export default CustomTooltip;