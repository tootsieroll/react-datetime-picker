# react-datetime-picker

> Простой компонент для выбора даты и времени. Цветовая схема настраивается CSS-переменными. Дата выбирается скролом, перетягиванием или по клику. 


**[Демо](https://tootsieroll.github.io/react-datetime-picker/)**

![Preview](/src/images/preview.png)

[comment]: <> (## Установка)

[comment]: <> (```bash)

[comment]: <> (npm i @tootsieroll/react-datetime-picker)

[comment]: <> (```)

[comment]: <> (## Использование)

[comment]: <> (```TSX)

[comment]: <> (import DateTimePicker from '@tootsieroll/react-datetime-picker';)

[comment]: <> (..........)

[comment]: <> (<DateTimePicker )

[comment]: <> (    pickerType={'datetime'} )

[comment]: <> (    onChange={&#40;value: any&#41; => console.log&#40;value&#41;} )

[comment]: <> (/>)

[comment]: <> (..........  )

[comment]: <> (```)

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
