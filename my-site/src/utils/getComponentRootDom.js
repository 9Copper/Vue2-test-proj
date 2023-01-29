import Vue from "vue";
function getComponentRootDom(comp,props) {
    const vm = new Vue({
        render : (h)=> h(comp,{props})
    });
    vm.$mount();
    return vm.$el;
}

export default getComponentRootDom;