import React from 'react';
import './styles/application.sass';
import DateTimePicker from './components/DateTimePicker';

const App: React.FC = () => {
    return (
        <div className={'container'}>
            <DateTimePicker
                name={'datepicker'}
                onChange={(value: any) => console.log(value)}
                pickerType={'datetime'}
            />
        </div>
    );
};
export default App;
