import React from 'react';
import PickerGroup from './PickerGroup';
import './Picker.sass';
import {getDaysOfMonth, getHoursList, getMinutesList, getMonthList, getYearsList} from "../utils";

const Picker: React.FC<any> = ({ timestamp = new Date().getTime(), type = 'date' }) => {
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
                selected: new Date(timestamp).toLocaleDateString('ru', {day: '2-digit'}),
            },
            {
                type: 'year',
                items: getYearsList(20),
                selected: new Date(timestamp).toLocaleDateString('ru', {year: 'numeric'}),
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
                selected: new Date(timestamp).toLocaleTimeString('ru', { minute: '2-digit' }),
            },
        ],
    };
    return (
        <div className={'dt-picker dt-picker-' + type}>
            {groups[type].map((item: any, index: number) => (
                <PickerGroup key={`group_${index}`} {...item} />
            ))}
            <div className={'dt-picker-selected'}>{type === 'time' && ':'}</div>
        </div>
    );
};
export default Picker;
