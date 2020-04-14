import Vue from 'vue'
import AutocompleteVue from 'autocomplete-vue';

if (process.client) {
    Vue.component('autocomplete', AutocompleteVue);
}
