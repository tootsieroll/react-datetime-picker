import React from 'react';
import './styles/application.sass';
import DateTimePicker from './components/DateTimePicker';

const App: React.FC = () => {
    return (
        <div className={'container'}>
            <DateTimePicker
                name={'datepicker'}
                onChange={(value: any) => console.log(value)}
                placeholder={'Выберите дату и время'}
                value={1339043100000}
            />
        </div>
    );
};
export default App;
