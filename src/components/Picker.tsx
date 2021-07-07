import React from 'react';
import PickerGroup from './PickerGroup';
import { getDaysOfMonth, getHoursList, getMinutesList, getMonthList, getYearsList } from '../utils';

const Picker: React.FC<any> = ({ timestamp = new Date().getTime(), type = 'date', onChange }) => {
    let month = new Date(timestamp).toLocaleDateString('ru', { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.substr(1);
    const groups: any = {
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
                items: getYearsList(20),
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
    const handleChange = (result: any[]) => {
        let returned = new Date(timestamp).getTime();
        switch (result[0]) {
            case 'month':
                returned = new Date(timestamp).setMonth(result[2], new Date(timestamp).getDate());
                break;
            case 'year':
                returned = new Date(timestamp).setFullYear(
                    Number(result[1]),
                    new Date(timestamp).getMonth(),
                    new Date(timestamp).getDate()
                );
                break;
            case 'days':
                returned = new Date(timestamp).setDate(result[2] + 1);
                break;
            case 'hours':
                returned = new Date(timestamp).setHours(result[2]);
                break;
            case 'minutes':
                returned = new Date(timestamp).setMinutes(result[2]);
                break;
        }
        onChange(returned);
    };
    return (
        <div className={'dt-picker dt-picker-' + type}>
            {groups[type].map((item: any, index: number) => (
                <PickerGroup key={`group_${index}`} {...item} onChange={handleChange} />
            ))}
            <div className={'dt-picker-selected'}>{type === 'time' && ':'}</div>
        </div>
    );
};
export default Picker;
