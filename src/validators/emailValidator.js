import { email as emailRegx } from '../constants/regex.js';

class EmailValidator {
  #email;

  constructor(email) {
    this.#email = email;
  }

  valid() {
    return this.#isEmailMatchToRegex();
  }

  #isEmailMatchToRegex() {
    return emailRegx.test(this.#email);
  }
}

export default EmailValidator;
