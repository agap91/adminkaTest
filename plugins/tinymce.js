import Vue from 'vue'
import tinymce from 'vue-tinymce-editor'

if (process.client) {
  Vue.use(tinymce)
  Vue.component('tinymce', tinymce)

}
