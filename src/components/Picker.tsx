import React from 'react';
import PickerGroup from './PickerGroup';
import { getDaysOfMonth, getHoursList, getMinutesList, getMonthList, getYearsList } from '../utils';

interface PickerProps {
    timestamp?: number;
    type?: 'date' | 'time';
    startYear?: number;
    endYear?: number;
    onChange?: (v: any) => void;
}

type GroupItemType = {
    type: string;
    items: string[];
    selected: string;
};

type GroupType = {
    date: GroupItemType[];
    time: GroupItemType[];
};

const Picker: React.FC<PickerProps> = ({
    timestamp = new Date().getTime(),
    type = 'date',
    startYear,
    endYear,
    onChange,
}) => {
    let month: string = new Date(timestamp).toLocaleDateString('ru', { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.substr(1);
    const groups: GroupType = {
        date: [
            {
                type: 'month',
                items: getMonthList(),
                selected: month,
            },
            {
                type: 'days',
                items: getDaysOfMonth(timestamp),
                selected: new Date(timestamp).toLocaleDateString('ru', { day: '2-digit' }),
            },
            {
                type: 'year',
                items: getYearsList(startYear, endYear),
                selected: new Date(timestamp).toLocaleDateString('ru', { year: 'numeric' }),
            },
        ],
        time: [
            {
                type: 'hours',
                items: getHoursList(),
                selected: new Date(timestamp).toLocaleTimeString('ru', { hour: '2-digit' }),
            },
            {
                type: 'minutes',
                items: getMinutesList(),
                selected: new Date(timestamp)
                    .toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
                    .split(':')[1],
            },
        ],
    };
    const handleChange = (result: Array<string | number>) => {
        let returned: number = new Date(timestamp).getTime();
        const [type, value, index] = result;
        if (typeof index === 'number') {
            switch (type) {
                case 'month':
                    returned = new Date(timestamp).setMonth(index, new Date(timestamp).getDate());
                    break;
                case 'year':
                    returned = new Date(timestamp).setFullYear(
                        Number(value),
                        new Date(timestamp).getMonth(),
                        new Date(timestamp).getDate()
                    );
                    break;
                case 'days':
                    returned = new Date(timestamp).setDate(index + 1);
                    break;
                case 'hours':
                    returned = new Date(timestamp).setHours(index);
                    break;
                case 'minutes':
                    returned = new Date(timestamp).setMinutes(index);
                    break;
            }
        }
        if (typeof onChange === 'function') onChange(returned);
    };
    return (
        <div className={'dt-picker dt-picker-' + type}>
            {groups[type].map((item: GroupItemType, index: number) => (
                <PickerGroup key={`group_${index}`} {...item} onChange={handleChange} />
            ))}
            <div className={'dt-picker-selected'}>{type === 'time' && ':'}</div>
        </div>
    );
};
export default Picker;
