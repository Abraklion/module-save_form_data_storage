# save-form-data-storage

Записывает данные, введенные в форму HTML, в LocalStorage и извлекает их по мере необходимости.

***

## Installation

```bash
npm install save-form-data-storage
```

**import**

```js
import SaveFormDataStorage from "save-form-data-storage";
```

## Usage example

HTML

Разбиваем форму на логические группы, в примере _group_1, group_1, …, group_5_.

```html
<form id="my-form" action="">

  <input type="text" name="name" class="group_1">
  <input type="text" name="ege" class="group_2">
  
  <input type="radio" name="gender" value="male" class="group_3">
  <input type="radio" name="gender" value="female" class="group_3">

  <input type="checkbox" name="language" value="russian" class="group_4">
  <input type="checkbox" name="language" value="english" class="group_4">

  <select name="country" class="group_5">
    <option value="russia">Россия</option>
    <option value="france">Франция</option>
    <option value="germany">Германия</option>
  </select>

  <button type="submit">Отправить</button>

</form>
```

JS

Инициализируем класс _SaveFormDataStorage_.

```js
new SaveFormDataStorage('#my-form',[
    // selector: логический блок, event:события для слежки
    {selector: '.group_1', event: 'input'},
    {selector: '.group_2', event: 'input'},
    {selector: '.group_3', event: 'change'},
    {selector: '.group_4', event: 'change'},
    {selector: '.group_5', event: 'change'},
  ],{
    btnText: "Достать из хранилища", // текст на кнопки (опционально)
    parentSelectorBtn: ".row--custom_flex", // родитель кнопки (опционально, кнопка по умолчанию вставляется в конец формы)
})
```

## Settings

```js
new SaveFormDataStorage(idForm,inputsArray,options)
```

Arguments

| названия    | тип      | описания                                     |
|:------------|:---------|:---------------------------------------------|
| idForm      | _string_ | идентификатор формы за который будем следить | 
| inputsArray | _array_  | элементы формы за которыми будем сделить     |
| options     | _object_ | опциональные настройки                       |

Options

| названия          | тип      | описания                 |
|:------------------|:---------|:-------------------------|
| btnText           | _string_ | текст на кнопки          | 
| parentSelectorBtn | _string_ | селектор родителя кнопки |






