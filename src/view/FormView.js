import $ from 'jquery';

import View from './View';
import template from './FormView.html';

class FormView extends View {
  get config() {
    return {
      template,
      selectors: {
        inputs: 'input, textarea',
      },
      events: [
        {
          event: 'submit',
          selector: '',
          callback: (e) => this.onFormSubmit(e),
        }
      ],
    };
  }

  onFormSubmit(e) {
    e.preventDefault();

    const student = this.getFormData();

    this.options.onSubmit(student);
  }

  setFormData(student) {
    for (const input of this.selectors.inputs) {
      if (input.name in student) {
        input.value = student[input.name];
      }
    }
  }

  getFormData() {
    const student = {};

    for (const input of this.selectors.inputs) {
      student[input.name] = input.value;
    }

    return student;
  }

  resetForm() {
    this.selectors.inputs.val('');
  }
}

export default FormView;
