import React from 'react';
import { render } from 'react-dom';
import DateTimePicker from "../src";
import './index.sass';

const DemoPage: React.FC = () => (
    <div className={'container'}>
        <h2>Демо для компонента<br/>react-datetime-picker</h2>
        <div>
            <DateTimePicker pickerType={'datetime'} onChange={(value: any) => console.log(value)}/>
        </div>
        <div>
            <DateTimePicker pickerType={'date'} onChange={(value: any) => console.log(value)} startYear={2005} endYear={2009}/>
        </div>
        <div>
            <DateTimePicker pickerType={'time'} onChange={(value: any) => console.log(value)} />
        </div>
    </div>
);
export default DemoPage;

render(<DemoPage />, document.getElementById('root'));
