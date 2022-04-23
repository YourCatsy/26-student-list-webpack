import View from '../View';

import './ListView.css';
import template from "./ListView.html";
import studentItemTemplate from "./StudentItem.html";
import markTemplate from "./Mark.html";

class ListView extends View {
  static EDIT_BTN_SELECTOR = '.edit-btn';
  static DELETE_BTN_SELECTOR = '.delete-btn';
  static STUDENT_LIST_SELECTOR = '#studentList';
  static STUDENT_ITEM_SELECTOR = '.student-item';
  static MARK_INPUT_SELECTOR = '.mark-input';
  static DONE_CLASS = 'done';

  get config() {
    return {
      template,
      selectors: {
        $list: ListView.STUDENT_LIST_SELECTOR,
      },
      events: [
        {
          event: 'focusout',
          selector: ListView.MARK_INPUT_SELECTOR,
          callback: (e) => this.onMarkInputFocusOut(e),
        },
        {
          event: 'click',
          selector: ListView.DELETE_BTN_SELECTOR,
          callback: (e) => this.onDeleteBtnClick(e),
        }
      ],
    };
  }

  onMarkInputFocusOut(e) {
    e.stopPropagation();

    const id = this.getElementId(e.target);
    const marks = this.getAllMarksById(id);

    this.options.onMarksEdit(id, marks);
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();

    const id = this.getElementId(e.target);

    this.options.onDelete(id);
  }

  getElementId(el) {
    const id = el.closest(ListView.STUDENT_ITEM_SELECTOR)?.dataset.id;

    return id ? +id : NaN;
  }

  renderList(list) {
    const html = list.map(student => this.generateStudentHTML(student)).join('');

    this.selectors.$list.html(html);
  }

  generateStudentHTML(student) {
    const marks = student.marks
      .map(mark => this.populate({ mark }, markTemplate))
      .join('');

    return this.populate({ ...student, marks }, studentItemTemplate);
  }

  addElement(student) {
    const studentHtml = this.generateStudentHTML(student);

    this.selectors.$list.append(studentHtml);
  }

  removeElement(id) {
    this.getElById(id).remove();
  }

  updateElement(student, isNew = false) {
    const id = isNew ? '' : student.id;
    const studentHtml = this.generateStudentHTML(student);

    this.getElById(id).replaceWith(studentHtml);
  }

  getAllMarksById(id) {
    return Array
      .from(this.getElById(id).find(ListView.MARK_INPUT_SELECTOR))
      .map(el => +el.value);
  }

  getElById(id) {
    return this.selectors.$list.find(`[data-id="${id}"]`);
  }
}

export default ListView;
