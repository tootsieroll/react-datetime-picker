# react-datetime-picker

> Простой компонент для выбора даты и времени. Цветовая схема настраивается CSS-переменными. Дата выбирается скролом, перетягиванием или по клику. 


**[Демо](https://tootsieroll.github.io/react-datetime-picker/)**

<img src="/src/images/preview.png" alt="preview" width="35%"/>


## Установка

```bash

npm i @tootsieroll/react-datetime-picker

```

## Использование

```TSX

import DateTimePicker from '@tootsieroll/react-datetime-picker';

..........

<DateTimePicker 

    pickerType={'datetime'} 

    onChange={(value: any) => console.log(value)} 

/>

..........  

```

## Параметры

| название | тип | описание | по умолчанию |
|---|---|---|---|
| pickerType | string | тип компонента, значения: "datetime", "date", "time" | "datetime" |
| value | number | выбранная дата, задается в миллисекундах  | выбирается текущий момент времени |
| placeholder | string | текст для заголовка | "Выберите дату и время", "Выберите дату", "Выберите время" - в соответствии с pickerType |
| className | string | класс для главного контейнера | |
| onChange | function | вызывается при выборе даты, возвращает выбранную дату в миллисекундах  | `(val) => console.log(val)` |
| onOpen | function | вызывается при открытии списка даты/времени | |
| onClose | function | вызывается при закрытии списка даты/времени | |


## Лицензия

© [MIT](https://github.com/tootsieroll/react-grid-table/LICENSE)
