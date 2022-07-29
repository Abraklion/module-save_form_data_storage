export default class SaveFormDataStorage {

  /**
   * МОДУЛЬ ДЛЯ СОХРАНЕНИЯ ЗАПОЛНЯЕМЫХ ДАННЫХ ИЗ ФОРМЫ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
   * автор: Abraklion
   * дата: 30.07.2022
   */

  /* ===========================
   *    Статические методы     *
   ============================*/

  static getObjectStorage(key){
    /**
     * достать объект по ключу из хранилища
     */

    return JSON.parse(localStorage.getItem(key))
  }

  static setObjectStorage(key, value){
    /**
     * положить объект по ключу в хранилища
     */

    localStorage.setItem(key,JSON.stringify(value))
  }

  static btnCreate(parent,btnText){
    /**
     *  создает кнопку
     *  form    -> родитель кнопки
     *  btnText -> текст кнопки
     */

    let btn = document.createElement('button')
    btn.setAttribute('type', 'button')
    btn.classList.add('btn')
    btn.append(btnText)

    parent.append(btn)

    return btn
  }

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(idForm,inputsArray,{btnText,parentSelectorBtn}) {
    /**
     * обязательно:
     * idForm      -> идентификатор формы
     * inputsArray -> массив с объектами { selector: "селектор импута", event:"события по которому записывать в хранилище"}
     *
     * опционально:
     * btnText             -> текст кнопки
     * parentSelectorBtn   -> родитель кнопки (кнопка по умолчанию вставляется в конец формы idForm)
     */

    this.form = document.querySelector(idForm)
    this.propertyNameStorage = `${idForm}-data` // имя свойства в хранилище

    this.parentSelectorBtn = document.querySelector(parentSelectorBtn) || this.form
    this.btnText = btnText || 'Достать из хранилища'

    this.#init(inputsArray)
  }

  /* ===========================
   *       Частный методы      *
   ============================*/

  #init(inputsArray){
    /**
     * Точка входа
     * inputsArray -> объект настроек за какими элементами следить
     */

    if(!localStorage.getItem(this.propertyNameStorage)) localStorage.setItem(this.propertyNameStorage, '{}')

    inputsArray.forEach(input =>{

      this.#saveStorage(input['selector'],input['event'])

    })

    this.#getStorage()
  }

  #saveStorage(selectorField,event){
    /**
     * Следить за элементом и класть в хранилище заполняемые данные
     * selectorField -> селектор поля за которым надо следить
     * event         -> события по которому надо следить
     */

    const elements = this.form.querySelectorAll(selectorField)

    elements.forEach((item,index) =>{

      item.addEventListener(event, (e) =>{

        e.preventDefault();

        const storage = SaveFormDataStorage.getObjectStorage(this.propertyNameStorage),
          type = item.nodeName !== "SELECT" ? item.getAttribute('type') : 'select';

        switch (type) {

          case 'checkbox':
            // для чекбоксов

            if(!Array.isArray(storage[selectorField])){
              storage[selectorField] = []
            }

            if(item.checked){

              if(!storage[selectorField].includes(index)){

                storage[selectorField].push(index)

              }

            }else {

              storage[selectorField].splice(storage[selectorField].indexOf(index),1)

            }

            SaveFormDataStorage.setObjectStorage(this.propertyNameStorage, storage)

            break;

          case 'select':
            // для селектов

            storage[selectorField] = []

            for(let i = 0; i < item.options.length; i++){

              if(item.options[i].selected){
                storage[selectorField].push(i)
              }

            }

            SaveFormDataStorage.setObjectStorage(this.propertyNameStorage, storage)

            break;

          default:
            // для всего остального

            storage[selectorField] = item.value

            SaveFormDataStorage.setObjectStorage(this.propertyNameStorage, storage)

        }

      })

    })

  }

  #getStorage(){
    /**
     * Достать из хранилища данные и подставить в форму
     */

    if (Object.keys(SaveFormDataStorage.getObjectStorage(this.propertyNameStorage)).length){

      const btn = SaveFormDataStorage.btnCreate(this.parentSelectorBtn,this.btnText);

      btn.addEventListener('click', () => {

        const storage = SaveFormDataStorage.getObjectStorage(this.propertyNameStorage);

        Object.keys(storage).forEach(key => {

          const item = this.form.querySelectorAll(key);

          if(typeof storage[key] !== 'object'){

            // для type="text" / type="radio" / и всего остального type="..."

            if(item.length === 1){

              item[0].value = storage[key]

            }else {

              item.forEach(elem => {

                if(elem.value === storage[key]) elem.checked = true

              })

            }

          }else {

            // для select / type="checkbox"

            item.forEach((elem, index) => {

              if(elem.nodeName === 'SELECT'){

                for(let i = 0; i < elem.options.length; i++){

                  if(storage[key].includes(i)) elem.options[i].selected = true

                }

              }else {

                if(storage[key].includes(index)) elem.checked = true

              }

            })
          }

        })

      })

    }

  }

}