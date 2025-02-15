export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
