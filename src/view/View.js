import $ from 'jquery';

class View {
  $rootEl = null;
  options = {};

  constructor(options) {
    this.options = options;

    this.initView();
  }

  initView() {
    if (!this.config) {
      return console.error('view must implement config getter');
    }

    this.renderTemplate();
    this.bindEvents();
    this.getSelectors();
  }

  renderTemplate() {
    if (!this.config.template) {
      console.error('template is required configuration option');
      this.$rootEl = $();
      return;
    }

    this.$rootEl = $(this.config.template);
  }

  bindEvents() {
    if (!this.config.events) {
      return;
    }

    this.config.events.forEach(({ event, selector, callback }) => {
      this.$rootEl.on(event, selector, callback);
    })
  }

  getSelectors() {
    this.selectors = {};

    if (!this.config.selectors) {
      return;
    }

    for (const selectorName in this.config.selectors) {
      this.selectors[selectorName] = this.$rootEl.find(
        this.config.selectors[selectorName]
      );
    }
  }

  appendTo($container) {
    $container.append(this.$rootEl);
  }

  populate(data, template) {
    let res = template;

    for (const [key, value] of Object.entries(data)) {
      res = res.replaceAll(`{{${key}}}`, value);
    }

    return res;
  }
}

export default View;
