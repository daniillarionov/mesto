export class Section {
    constructor({items, renderer}, selector) {
        this._container = document.querySelector(selector);
        this._InitialItems = items;
        this._renderer = renderer;
    }
    render() {
        this._InitialItems.forEach(item => {
            this.addItem(this._renderer(item));
        })
    }
    addItem(HTMLElement) {
        this._container.prepend(HTMLElement);

    }
}