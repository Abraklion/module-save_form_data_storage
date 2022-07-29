import SaveFormDataStorage from "./modules/saveFormDataStorage";

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  new SaveFormDataStorage('#sfds-form',[
    {selector: '.sfds-name', event: 'input'},
    {selector: '.sfds-email', event: 'input'},
    {selector: '.sfds-dd', event: 'input'},
    {selector: '.sfds-mm', event: 'input'},
    {selector: '.sfds-yyyy', event: 'input'},
    {selector: '.sfds-gender', event: 'change'},
    {selector: '.sfds-payment', event: 'change'},
    {selector: '.sfds-card-number', event: 'input'},
    {selector: '.sfds-card-cvc', event: 'input'},
    {selector: '.sfds-month', event: 'change'},
    {selector: '.sfds-year', event: 'change'},
    {selector: '.sfds-terms', event: 'change'},
  ],{
    btnText: "Достать из хранилища", // текст на кнопки
    parentSelectorBtn: ".row--custom_flex", // родитель кнопки (кнопка по умолчанию вставляется в конец формы)
  })

});