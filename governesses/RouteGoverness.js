import { HeadGoverness } from 'vue-kindergarten';

export default class RouteGoverness extends HeadGoverness {
  guard(action, { next }) {
      console.log(55555555)
      console.log(next)
      console.log(action)
      console.log(this.isAllowed(action))
    // or your very own logic to redirect user
    // see. https://github.com/JiriChara/vue-kindergarten/issues/5 for inspiration
    return this.isAllowed(action) ? next() : next('/');
  }
}