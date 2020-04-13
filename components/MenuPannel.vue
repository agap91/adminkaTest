<template>
  <section class="menu-pannel" ref="menu" v-if="this.$route.path.indexOf('admin') !=-1">
    <ul>
      <router-link
        v-for="menuItem of menu"
        v-bind:key="menuItem"
        tag="li"
        v-bind:to="menuItem.link"
        active-class="active"
      >
        <a>{{menuItem.name}}</a>
      </router-link>
    </ul>
  </section>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "Статьи",
          link: "/admin/articles/"
        },
        {
          name: "Категории",
          link: "/admin/categories/"
        },
        {
          name: "Теги",
          link: "/admin/tags/"
        },
        {
          name: "Изображения",
          link: "/admin/media/"
        },
        {
          name: "Пользователи",
          link: "/admin/users/"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.menu-pannel {
  position: fixed;
  background: #282c34;
  left: 0;
  top: 28px;
  height: 100%;
  z-index: 2;
  width: 13vw;
}
.menu-pannel ul {
  padding: 15px 0;
  margin: 0;
}
.menu-pannel ul li {
  margin-bottom: 5px;
}
.menu-pannel ul li a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s;
  padding: 5px 10px;
  display: block;
  font-weight: 500;
}
.menu-pannel ul li a:hover {
  color: #00b9eb;
  background: #000;
}
.menu-pannel ul li.active a {
  background: #000;
  color: #00b9eb;
}
.menu-pannel.open {
  display: block;
}
@media (max-width: 576px) {
  .menu-pannel {
    display: none;
    height: auto;
    width: 100%;
  }
}
</style>