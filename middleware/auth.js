// import axios from 'axios'

export default function ({ app, route, redirect }) {
    let token = app.$cookies.get('token');
  if (route.fullPath != '/' && !token) {
    return redirect('/')
  }else if(route.fullPath == '/' && token){
    return redirect('/admin/articles/')    
  }
  // console.log(this.cookies.get('cookie-name'));
  //   return cookie.get('cookie-name');
}
