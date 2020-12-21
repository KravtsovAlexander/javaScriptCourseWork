export default {

  showMessage(rule) {
    rule.errorMessage.classList.add('show');
    rule.errorMessage.addEventListener("animationend", () => rule.errorMessage.classList.remove('show'));
  },

  checkLength(rule) {
    if (!rule.elem.value.length) {
      rule.errorMessage.innerText = 'Поле не должно быть пустым!';
      this.showMessage(rule);
      return false;
    }
    if (!rule.elem.value.trim().length) {
      rule.errorMessage.innerText = 'Поле не должно состоять из одних пробелов!';
      this.showMessage(rule);
      return false;
    }
    if (rule.elem.value.length < rule.minLength) {
      rule.errorMessage.innerText = `Минимальное количество символов: ${rule.minLength}`;
      this.showMessage(rule);
      return false;
    }
    if (rule.elem.value.length > rule.maxLength) {
      rule.errorMessage.innerText = `Максимальное количество символов: ${rule.maxLength}`;
      this.showMessage(rule);
      return false;
    }
    // ограниченная длина в html + обработчик keypress --> при попытках запихнуть больше,
    // чем возможно, появится сообщение, но валидация все равно будет пройдена
    if (rule.elem.value.length === rule.maxLength) {
      rule.errorMessage.innerText = `Максимальное количество символов: ${rule.maxLength}`;
      this.showMessage(rule);
      return true;
    }
    rule.errorMessage.style.opacity = '0';
    return true;
  },

  checkDate(rule) {
    // проверка формата
    if (!rule.elem.value.match(/^\d{4}([./-])\d{2}\1\d{2}$/)) {
      rule.errorMessage.innerText = 'Неверный формат даты';
      this.showMessage(rule);
      return false;
    }

    let currentDate = new Date();
    let pickedYear = +rule.elem.value.slice(0, 4),
        pickedMonth = +rule.elem.value.slice(5, 7) - 1,
        pickedDay = +rule.elem.value.slice(8, 10);
    // проверка, что в календаре такая дата существует
    let validDate = new Date(pickedYear, pickedMonth, pickedDay);
    if (pickedYear !== validDate.getFullYear() ||
        pickedMonth !== validDate.getMonth() ||
        pickedDay !== validDate.getDate()) {
      rule.errorMessage.innerText = 'Неверное значение даты';
      this.showMessage(rule);
      return false   
    } 
    // проверка, что выбрана дата не из прошлого
    if (pickedYear < currentDate.getFullYear()) {
      rule.errorMessage.innerText = 'Неверное значение даты';
      this.showMessage(rule);
      return false;
    }
    if (pickedYear === currentDate.getFullYear()) {
      if (pickedMonth < currentDate.getMonth()) {
        rule.errorMessage.innerText = 'Неверное значение даты';
        this.showMessage(rule);
        return false;
      }
      if (pickedMonth === currentDate.getMonth()) {
        if (pickedDay < currentDate.getDate()) {
          rule.errorMessage.innerText = 'Неверное значение даты';
          this.showMessage(rule);
          return false;
        }
      }
    } 
    return true;
  },

  checkForm(formRules, exception) {
    // перем. invalid для того, чтобы не останавливать цикл при первом же невалидном поле
    //  --> подсветятся все невалидные поля, а не только одно
    let invalid = 0;
    for (let rule in formRules) {
      if (rule === exception) continue;
      if (formRules[rule].type === 'date') {
        if (!this.checkDate(formRules[rule])) invalid++;
        continue;
      }
      if (!this.checkLength(formRules[rule])) invalid++;
    }
    if (invalid) return false;
    return true;  }
};