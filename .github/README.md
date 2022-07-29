# Модуль save-form-data-storage

Записывает данные, введенные в форму HTML, в LocalStorage и извлекает их по мере необходимости.

***

Для чего я писал этот модуль:

Была проблема. В процессе заполнения формы, периодически вылетает программа, в связи с этим не сохраняется набранная информация и приходится повторно набирать текст.

***

**Demo**

https://abraklion.github.io/module-save_form_data_storage

_Пример находится в папке **docs**_

***

## Установка

**Быстрый старт**

Возьмите скрипт **saveFormDataStorage.min.js** или **saveFormDataStorage.js** находящийся в папки **docs**. Подключите в html файл с вашей формой

```html
<!-- Подключаем модуль (минифицированный)-->
<script defer src="saveFormDataStorage.min.js"></script>

<!-- Подключаем модуль (не минифицированный)-->
<script defer src="saveFormDataStorage.js"></script>
```

**NPM**

```bash
npm install save-form-data-storage
```

import

```js
import SaveFormDataStorage from "save-form-data-storage";
```

## Пример

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

## Настройки

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


## Исходники

Если нужны исходники они находятся с папке **scr**.

Сборка gulp

```js
npm -i
```
Запуск сборка
```js
gulp
```

Настройки для сборки:

NODE v: 16.16.0

NPM v: 8.11.0





