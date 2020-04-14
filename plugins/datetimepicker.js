import Vue from 'vue'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

if (process.client) {
  Vue.component('VueCtkDateTimePicker',VueCtkDateTimePicker);
}
