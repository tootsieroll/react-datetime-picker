import React from 'react';
import calendar from '/src/images/calendar.svg';
import Icon from './Icon';
import classNames from 'classnames';
import './Field.sass';

const Field: React.FC<any> = ({ meta, placeholder, ...props }) => {
    const [state, setState] = React.useState({ hasLabel: !!props.value?.length, touched: false });
    React.useEffect(() => {
        if (!!props.value?.length && !!props.value?.length === !state.hasLabel) {
            setState({ hasLabel: !!props.value?.length, touched: true });
        }
    }, [props.value, state.hasLabel]);
    return (
        <div
            className={classNames(
                'dp-input-wrapper',
                { 'dp-input-wrapper--filled': state.hasLabel },
                { error: meta && meta.error && state.touched },
                { success: meta && !meta.error && !!props.value.length },
                props.className
            )}
        >
            <input
                type={'text'}
                className={'dp-input'}
                onFocus={() => setState({ hasLabel: true, touched: false })}
                onBlur={(e) => setState({ hasLabel: !!e.target.value?.length, touched: true })}
            />
            <label htmlFor={props.name} className={'dp-input-label'}>
                {placeholder}
            </label>
            <div className={'dp-input-icon'}>
                <Icon id={calendar.id} viewBox={calendar.viewBox} />
            </div>
            {meta && meta.error && state.touched && <div className={'dp-input-error'}>{meta.error}</div>}
        </div>
    );
};
export default Field;
