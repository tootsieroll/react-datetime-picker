import React, { InputHTMLAttributes } from 'react';
import Field from './components/Field';
import Icon from './components/Icon';
import './styles/dt.sass';
import calendar from './images/calendar.svg';
import clock from './images/clock.svg';
import { getScrollableParent } from './utils';
import PickerBox from './components/PickerBox';

interface DateTimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: number;
    pickerType: 'date' | 'time' | 'datetime';
    placeholder?: string;
    className?: string;
    meta?: { [k: string]: string | null };
    startYear?: number | 'current';
    endYear?: number | 'current';
    onChange: (v: any) => void;
    onClose?: (v: any) => void;
    onOpen?: (v: any) => void;
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
    const [val, setVal] = React.useState<number | undefined>(value);
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);
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
    const handleClose = (applyChanges?: boolean) => {
        setOpen(false);
        if (typeof onClose === 'function') onClose(ref.current);
        if (applyChanges && typeof onChange === 'function') onChange(val);
    };
    const handleOpen = () => {
        setOpen(true);
        if (typeof onOpen === 'function') onOpen(ref.current);
    };
    const handleChange = (newValue: number | undefined) => setVal(newValue);
    const handleReset = () => setVal(value);
    const [locked, setLocked] = React.useState<HTMLElement | null>(null);
    React.useEffect(() => {
        if (ref && ref.current) {
            if (isOpen) {
                const l = getScrollableParent(ref.current.parentNode?.parentNode);
                if (l) l.style.overflow = 'hidden';
                setLocked(l);
            } else {
                if (locked) locked.style.overflow = '';
                setLocked(null);
            }
        }
    }, [isOpen, ref?.current]);
    return (
        <div className={'dt' + (className ? ' ' + className : '')} ref={ref}>
            <div className={'dt-input-box'} onClick={handleOpen}>
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
                <PickerBox
                    startYear={startYear}
                    endYear={endYear}
                    value={val}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    handleReset={handleReset}
                    placeholder={placeholder}
                    pickerType={pickerType}
                />
            )}
        </div>
    );
};
DateTimePicker.defaultProps = {
    pickerType: 'datetime',
    onChange: (e: number) => console.log(e),
};
export default DateTimePicker;
