import React from 'react';
import classNames from 'classnames';

interface IconProps {
    id: string;
    viewBox: string;
    className?: string;
    color?: string;
    name?: string;
}
const Icon: React.FC<IconProps> = ({ id, viewBox, ...props }) => {
    return (
        <div
            className={classNames(
                'dt-icon-svg',
                props.name ? 'dt-icon-' + props.name : 'dt-icon-default',
                props.className
            )}
        >
            <svg viewBox={viewBox} fill={'currentColor'}>
                <use xlinkHref={`#${id}`} />Í
            </svg>
        </div>
    );
};

export default Icon;
