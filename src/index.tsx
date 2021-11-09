import React, { InputHTMLAttributes } from 'react';
import Field from './components/Field';
import Picker from './components/Picker';
import Icon from './components/Icon';
import './styles/dt.sass';
import calendar from './images/calendar.svg';
import clock from './images/clock.svg';
import close from './images/close.svg';

interface DateTimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: number;
    pickerType: 'date' | 'time' | 'datetime';
    placeholder?: string;
    className?: string;
    meta?: { [k: string]: string | null };
    startYear?: number | 'current';
    endYear?: number | 'current';
    onChange: (v: any) => void;
    onClose?: () => void;
    onOpen?: () => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    value,
    pickerType,
    placeholder,
    onChange,
    onClose,
    onOpen,
    className,
    meta,
    startYear,
    endYear,
    ...props
}) => {
    const [val, setVal] = React.useState<number>(value || new Date().getTime());
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const pickers: Array<'date' | 'time'> = pickerType === 'datetime' ? ['date', 'time'] : [pickerType];
    const start = startYear === 'current' ? new Date().getFullYear() : startYear;
    const end = endYear === 'current' ? new Date().getFullYear() : endYear;
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
    React.useEffect(() => {
        if (startYear && startYear !== 'current' && startYear > new Date().getFullYear()) {
            const date = new Date(val).setFullYear(startYear);
            setVal(date);
        }
        if (endYear && endYear !== 'current' && endYear < new Date().getFullYear()) {
            const date = new Date(val).setFullYear(endYear);
            setVal(date);
        }
    }, [startYear, endYear]);
    return (
        <div className={'dt' + (className ? ' ' + className : '')}>
            <div
                className={'dt-input-box'}
                onClick={() => {
                    setOpen(true);
                    if (typeof onOpen === 'function') onOpen();
                }}
            >
                <Field {...props} meta={meta} value={val} pickerType={pickerType} placeholder={placeholder} />
                <div
                    className={
                        'dt-input-icon' +
                        (meta && meta.error ? ' dt-input-icon--error' : '') +
                        (meta && !meta.error && !!val ? ' dt-input-icon--success' : '')
                    }
                >
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
                        <div
                            className={'dt-picker-close dt-input-icon'}
                            onClick={() => {
                                setOpen(false);
                                if (typeof onClose === 'function') onClose();
                            }}
                        >
                            <Icon id={close.id} viewBox={close.viewBox} name={'small'} />
                        </div>
                        <div className={'dt-picker-title'}>{placeholder}</div>
                    </div>
                    <div className={'dt-picker-box__content'}>
                        {pickers.map((item) => (
                            <Picker
                                key={item}
                                type={item}
                                timestamp={val}
                                onChange={(res: number) => setVal(res)}
                                startYear={start}
                                endYear={end}
                            />
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
                                    setVal(value || new Date().getTime());
                                    setOpen(false);
                                    if (typeof onClose === 'function') onClose();
                                }}
                            >
                                Сбросить
                            </button>
                            <button
                                className={'dt-picker-button dt-picker-button--blue'}
                                onClick={() => {
                                    setOpen(false);
                                    if (typeof onClose === 'function') onClose();
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
    onChange: (e: number) => console.log(e),
};
export default DateTimePicker;
