import F8 from "./component.js";

F8.component("counter-app", {
    data: () => ({
        count: 0,
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
