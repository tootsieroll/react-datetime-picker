import React from 'react';
import classNames from 'classnames';
import './Icon.sass';

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
                'dp-icon-svg',
                props.name ? 'dp-icon-' + props.name : 'dp-icon-default',
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
