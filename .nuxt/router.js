import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _57a61056 = () => interopDefault(import('../pages/admin/articles/index.vue' /* webpackChunkName: "pages/admin/articles/index" */))
const _185f18f2 = () => interopDefault(import('../pages/admin/categories.vue' /* webpackChunkName: "pages/admin/categories" */))
const _312d937e = () => interopDefault(import('../pages/admin/media.vue' /* webpackChunkName: "pages/admin/media" */))
const _e2487222 = () => interopDefault(import('../pages/admin/tags.vue' /* webpackChunkName: "pages/admin/tags" */))
const _4908303e = () => interopDefault(import('../pages/admin/articles/_id.vue' /* webpackChunkName: "pages/admin/articles/_id" */))
const _7cb2edac = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin/articles",
    component: _57a61056,
    name: "admin-articles"
  }, {
    path: "/admin/categories",
    component: _185f18f2,
    name: "admin-categories"
  }, {
    path: "/admin/media",
    component: _312d937e,
    name: "admin-media"
  }, {
    path: "/admin/tags",
    component: _e2487222,
    name: "admin-tags"
  }, {
    path: "/admin/articles/:id",
    component: _4908303e,
    name: "admin-articles-id"
  }, {
    path: "/",
    component: _7cb2edac,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
