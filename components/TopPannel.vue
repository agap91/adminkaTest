<template>
  <section class="top-panel" v-if="this.$route.path.indexOf('admin') !=-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="menu-bars"
      @click="openMenu()"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
    <a href="/">Перейти на сайт</a>
    <div class="user-block">
      <span class="user-name">{{userFIO}}</span>
      <a href="#" class="logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </a>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      userID: 511,
      userFIO: "Агапов Евгений",
      secondMenuIsVisible: false,
      crmMenuShow: true,
      mobileMenuShow: false,
      menu: [
        {
          name: "Заказы",
          link: "/crm/"
        },
        {
          name: "Склад",
          link: "/crm/warehouse"
        },
        {
          name: "Статистика",
          link: "/crm/statistic"
        },
        {
          name: "Вебы",
          link: "/crm/webmasters"
        }
      ]
    };
  },
  methods: {
    openSubmenu: function() {
      this.secondMenuIsVisible = !this.secondMenuIsVisible;
    },
    openMenu: function(){
      if(!this.mobileMenuShow){
        document.querySelector(".menu-pannel").classList.add("open");
      }else{
        document.querySelector(".menu-pannel").classList.remove("open");
      }
      this.mobileMenuShow = !this.mobileMenuShow;
    }
  }
};
</script>

<style scoped>
.mobile-menu-btn {
  display: none;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.top-panel {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0%;
  background: #282c34;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  color: #fff;
  transition: all 0.3s;
  z-index: 999;
  justify-content: space-between;
}

.top-panel.show {
  display: flex;
  top: 0;
}

.menu {
  flex: 1;
}

.menu ul li:not(:last-child) {
  margin-right: 15px;
}

.menu a {
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding: 20px 0px;
  position: relative;
  transition: all 0.3s;
  font-weight: bold;
  font-weight: 400;
}

.menu a:hover,
.menu a.active,
.menu li.router-link-exact-active a {
  color: #09d3ac;
}

.menu li.router-link-exact-active a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 5px;
  background: #09d3ac;
}

.user-block {
  display: flex;
  align-items: center;
}

.user-block .user-name {
  font-weight: 400;
}

.second-menu-btn {
  cursor: pointer;
}

.second-menu {
  position: absolute;
  right: 3vw;
  top: 50px;
  background: #282c34;
  width: 200px;
  padding: 5px 10px;
  color: #fff;
  /* display: none; */
}

.second-menu ul {
  padding: 0;
  list-style: none;
}

.second-menu ul a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s;
}

.second-menu ul a:hover {
  color: #09d3ac;
}

.justify-content_end {
  justify-content: end;
}

.second-menu .row > div {
  display: flex;
  width: 50%;
}

.logout {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logout svg {
  margin-left: 5px;
}

.second-menu ul li:not(:last-child) {
  margin-bottom: 5px;
}

.show {
  display: block;
}
.menu-bars{
  display: none;
}
@media (max-width: 576px) {
  .menu-bars {
    display: block;
  }
}
</style>