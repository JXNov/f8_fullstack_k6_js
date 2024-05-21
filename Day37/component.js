/*
F8.component("counter-app", {
    data: () => ({ 
        count: 0 ,
        title: "Counter App",
    }),
    template: `
        <div>
            <h1>{{ title }}</h1>
            <h2>Đã đếm: {{ count }} lần</h2>
            <button v-on:click="count--"> - </button>
            <button v-on:click="count++"> + </button>
        </div>`,
});
*/

class F8 {
    static component(name, options) {
        customElements.define(
            name,
            class extends HTMLElement {
                constructor() {
                    super();
                    this.attachShadow({ mode: "open" });
                    this._data = options.data();
                    this._template = options.template;
                    this.render();
                }

                render() {
                    this.shadowRoot.innerHTML = this._template;
                    const keys = Object.keys(this._data);
                    keys.forEach((key) => {
                        this.shadowRoot
                            .querySelectorAll(`{{ ${key} }}`)
                            .forEach((element) => {
                                element.textContent = this._data[key];
                            });
                    });
                }
            },
        );
    }
}

export default F8;
