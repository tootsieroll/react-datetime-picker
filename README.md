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
| startYear | number | год, с которого начинается отсчет, "current" - для начала отсчета с текущего года, или же задается числом, если не задать этот параметр, то отсчет начнется от текущего года минус 10 лет | минус 10 лет |
| endYear | number | год, до которого можно выбрать дату, "current" - для текущего года, или же задается числом, если не задать этот параметр, то последняя возможная дата для выбора - через 10 лет | плюс 10 лет |
| value | number | выбранная дата, задается в миллисекундах  | выбирается текущий момент времени |
| placeholder | string | текст для заголовка | "Выберите дату и время", "Выберите дату", "Выберите время" - в соответствии с pickerType |
| className | string | класс для главного контейнера | |
| onChange | function | вызывается при выборе даты, возвращает выбранную дату в миллисекундах  | `(val) => console.log(val)` |
| onOpen | function | вызывается при открытии списка даты/времени | |
| onClose | function | вызывается при закрытии списка даты/времени | |


## Лицензия

© [MIT](https://github.com/tootsieroll/react-datetime-picker/blob/master/LICENSE)
