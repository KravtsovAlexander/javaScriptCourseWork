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
    if (rule.elem.value.length === rule.maxLength) {
      rule.errorMessage.innerText = `Максимальное количество символов: ${rule.maxLength}`;
      this.showMessage(rule);
      return true;
    }
    rule.errorMessage.style.opacity = '0';
    return true;
  },

  checkDate(rule) {
    if (!rule.elem.value.match(/^\d{4}([./-])\d{2}\1\d{2}$/)) {
      rule.errorMessage.innerText = 'Неверное значение даты';
      this.showMessage(rule)
      return false;
    }
    return true;
  },

  checkForm(formRules, exception) {
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