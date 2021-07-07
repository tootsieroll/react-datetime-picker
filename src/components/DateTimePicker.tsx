import React from 'react';
import Field from './Field';
import Picker from './Picker';

const DateTimePicker: React.FC<any> = (props) => {
    return (
        <div className={'dt'}>
            <div className={'dt-input-box'}>
                <Field {...props} />
            </div>
            <div className={'dt-picker-box'}>
                {['date', 'time'].map((item: string) => (
                    <Picker key={item} type={item} timestamp={props.value} />
                ))}
            </div>
        </div>
    );
};
export default DateTimePicker;
