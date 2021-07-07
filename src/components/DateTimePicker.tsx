import React from 'react';
import Field from './Field';
import Picker from './Picker';
import Icon from "./Icon";
import calendar from '/src/images/calendar.svg';
import close from '/src/images/close.svg';

const DateTimePicker: React.FC<any> = ({ value, pickerType = 'datetime', ...props }) => {
    const [val, setVal] = React.useState(value);
    const [isOpen, setOpen] = React.useState(false);
    return (
        <div className={'dt'}>
            <div className={'dt-input-box'} onClick={() => setOpen(true)}>
                <Field {...props} value={val} pickerType={pickerType}/>
                <div className={'dp-input-icon'}>
                    <Icon id={calendar.id} viewBox={calendar.viewBox} />
                </div>
            </div>
            {isOpen && <div className={'dt-picker-box'}>
                <div className={'dt-picker-box__header'}>
                    <div className={'dt-picker-close dp-input-icon'} onClick={() => setOpen(false)}>
                        <Icon id={close.id} viewBox={close.viewBox} name={'small'}/>
                    </div>
                    <div className={'dt-picker-title'}>{props.placeholder}</div>
                </div>
                <div className={'dt-picker-box__content'}>
                    {['date', 'time'].map((item: string) => (
                        <Picker key={item} type={item} timestamp={val} onChange={(res: number) => setVal(res)}/>
                    ))}
                </div>
                <div className={'dt-picker-box__footer'}>
                    <div className={'dt-picker-box__footer_left'}>
                        <button className={'dt-picker-button'} onClick={() => setVal(new Date().getTime())}>Сегодня
                        </button>
                    </div>
                    <div className={'dt-picker-box__footer_right'}>
                        <button className={'dt-picker-button'} onClick={() => setVal(value)}>Сбросить</button>
                        <button className={'dt-picker-button dt-picker-button--green'}
                                onClick={() => setOpen(false)}>Закрыть
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    );
};
export default DateTimePicker;
