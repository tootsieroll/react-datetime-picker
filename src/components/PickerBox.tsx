import React from 'react';
import Icon from './Icon';
import close from '../images/close.svg';
import Picker from './Picker';

interface PickerBoxProps {
    value?: number;
    pickerType: 'date' | 'time' | 'datetime';
    placeholder?: string;
    startYear?: number | 'current';
    endYear?: number | 'current';
    handleChange: (v: number) => void;
    handleClose: (v?: boolean) => void;
    handleReset: () => void;
}

const PickerBox: React.FC<PickerBoxProps> = ({
    handleClose,
    handleChange,
    handleReset,
    placeholder,
    pickerType,
    startYear,
    endYear,
    value,
}) => {
    const pickers: Array<'date' | 'time'> = pickerType === 'datetime' ? ['date', 'time'] : [pickerType];
    const start = startYear === 'current' ? new Date().getFullYear() : startYear;
    const end = endYear === 'current' ? new Date().getFullYear() : endYear;
    const timestamp = React.useMemo(() => {
        let result: number;
        const nowDate = value ? value : new Date().getTime();
        const nowYear = new Date(nowDate).getFullYear();
        result = nowDate;
        if (startYear && startYear !== 'current' && startYear > nowYear)
            result = new Date(nowDate).setFullYear(startYear);
        if (endYear && endYear !== 'current' && endYear < nowYear) result = new Date(nowDate).setFullYear(endYear);
        return result;
    }, [startYear, endYear, value]);
    return (
        <div className={'dt-picker-box'}>
            <div className={'dt-picker-box__header'}>
                <div className={'dt-picker-close dt-input-icon'} onClick={() => handleClose(false)}>
                    <Icon id={close.id} viewBox={close.viewBox} name={'small'} />
                </div>
                <div className={'dt-picker-title'}>{placeholder}</div>
            </div>
            <div className={'dt-picker-box__content'}>
                {pickers.map((item) => (
                    <Picker
                        key={item}
                        type={item}
                        timestamp={timestamp}
                        onChange={handleChange}
                        startYear={start}
                        endYear={end}
                    />
                ))}
            </div>
            <div className={'dt-picker-box__footer'}>
                <div className={'dt-picker-box__footer_left'}>
                    {(!endYear || endYear === 'current' || endYear >= new Date().getFullYear()) && (
                        <button className={'dt-picker-button'} onClick={() => handleChange(new Date().getTime())}>
                            {pickerType === 'time' ? 'Сейчас' : 'Сегодня'}
                        </button>
                    )}
                </div>
                <div className={'dt-picker-box__footer_right'}>
                    <button className={'dt-picker-button'} onClick={handleReset}>
                        Сбросить
                    </button>
                    <button className={'dt-picker-button dt-picker-button--blue'} onClick={() => handleClose(true)}>
                        Готово
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PickerBox;
