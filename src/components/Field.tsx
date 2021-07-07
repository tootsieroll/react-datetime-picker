import React from 'react';
import classNames from 'classnames';

const Field: React.FC<any> = ({ meta, placeholder, value, pickerType, ...props }) => {
    let options: any;
    switch (pickerType) {
        case 'date':
            options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            };
            break;
        case 'time':
            options = {
                hour: 'numeric',
                minute: 'numeric',
            };
            break;
        case 'datetime':
            options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            };
            break;
    }
    const [val, setVal] = React.useState(value ? new Date(value).toLocaleDateString('ru', options) : '');
    const [state, setState] = React.useState({ hasLabel: !!value?.length, touched: false });
    React.useEffect(() => {
        console.log(value);
        setVal(value ? new Date(value).toLocaleDateString('ru', options) : '');
        if (typeof value !== undefined && value && !!value === !state.hasLabel) {
            setState({ hasLabel: !!value, touched: true });
        }
        if ((typeof value === undefined || !value) && state.hasLabel) {
            setState({hasLabel: false, touched: true});
        }
    }, [value, state.hasLabel]);
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
                value={val}
                type={'text'}
                readOnly={true}
                className={'dp-input'}
                onFocus={() => setState({ hasLabel: true, touched: false })}
                onBlur={(e) => setState({ hasLabel: !!e.target.value?.length, touched: true })}
            />
            <label htmlFor={props.name} className={'dp-input-label'}>
                {placeholder}
            </label>
            {meta && meta.error && state.touched && <div className={'dp-input-error'}>{meta.error}</div>}
        </div>
    );
};
export default Field;
