class DOMGui {

    constructor() {
        this._DOMElements = {};
    }

    setDOMElements(params) {
        if (params && params instanceof Object) {
            for (const attr of Object.keys(this._DOMElements)) {
                if (params.hasOwnProperty(attr)) {
                    this._DOMElements[attr] = params[attr];
                }
            }
        }
    }
}