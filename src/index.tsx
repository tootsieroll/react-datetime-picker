import React from 'react';
import Field from './components/Field';
import Picker from './components/Picker';
import Icon from './components/Icon';
import './styles/dt.sass';
import calendar from './images/calendar.svg';
import clock from './images/clock.svg';
import close from './images/close.svg';

const DateTimePicker: React.FC<any> = ({ value, pickerType, placeholder, onChange, ...props }) => {
    const [val, setVal] = React.useState(value);
    const [isOpen, setOpen] = React.useState(false);
    const pickers = pickerType === 'datetime' ? ['date', 'time'] : [pickerType];
    if (!placeholder) {
        switch (pickerType) {
            case 'date':
                placeholder = 'Выберите дату';
                break;
            case 'time':
                placeholder = 'Выберите время';
                break;
            case 'datetime':
                placeholder = 'Выберите дату и время';
                break;
        }
    }
    return (
        <div className={'dt'}>
            <div className={'dt-input-box'} onClick={() => setOpen(true)}>
                <Field {...props} value={val} pickerType={pickerType} placeholder={placeholder} />
                <div className={'dp-input-icon'}>
                    {pickerType === 'time' ? (
                        <Icon id={clock.id} viewBox={clock.viewBox} />
                    ) : (
                        <Icon id={calendar.id} viewBox={calendar.viewBox} />
                    )}
                </div>
            </div>
            {isOpen && (
                <div className={'dt-picker-box'}>
                    <div className={'dt-picker-box__header'}>
                        <div className={'dt-picker-close dp-input-icon'} onClick={() => setOpen(false)}>
                            <Icon id={close.id} viewBox={close.viewBox} name={'small'} />
                        </div>
                        <div className={'dt-picker-title'}>{placeholder}</div>
                    </div>
                    <div className={'dt-picker-box__content'}>
                        {pickers.map((item: string) => (
                            <Picker key={item} type={item} timestamp={val} onChange={(res: number) => setVal(res)} />
                        ))}
                    </div>
                    <div className={'dt-picker-box__footer'}>
                        <div className={'dt-picker-box__footer_left'}>
                            <button className={'dt-picker-button'} onClick={() => setVal(new Date().getTime())}>
                                {pickerType === 'time' ? 'Сейчас' : 'Сегодня'}
                            </button>
                        </div>
                        <div className={'dt-picker-box__footer_right'}>
                            <button
                                className={'dt-picker-button'}
                                onClick={() => {
                                    setVal(value);
                                    setOpen(false);
                                }}
                            >
                                Сбросить
                            </button>
                            <button
                                className={'dt-picker-button dt-picker-button--green'}
                                onClick={() => {
                                    setOpen(false);
                                    onChange(val);
                                }}
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
DateTimePicker.defaultProps = {
    pickerType: 'datetime',
    onChange: (e: any) => console.log(e),
};
export default DateTimePicker;
