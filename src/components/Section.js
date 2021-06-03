export class Section {
    constructor(renderer, selector) {
        this._container = document.querySelector(selector);        
        this._renderer = renderer;
    }
    render(items) {
        this._InitialItems = items;
        this._InitialItems.reverse().forEach(item => {
            this.addItem(this._renderer(item));
        })
    }
    addItem(HTMLElement) {
        this._container.prepend(HTMLElement);

    }
}