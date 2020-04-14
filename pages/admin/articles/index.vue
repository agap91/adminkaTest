<template>
  <section id="page">
    <h1>Статьи</h1>
    <div id="filter">
      <form>
        <nuxt-link tag="button" class="create" :to="`/admin/articles/0`">Добавить</nuxt-link>
        <!-- <button class="create">Добавить</button> -->
        <select>
          <option value>Дата</option>
          <option value="01.2020">Январь 2020</option>
        </select>
        <select>
          <option value>Все категории</option>
          <option value="school">Школа</option>
        </select>
        <input type="checkbox" name="filter[scheduled]" id="scheduled" value="1" />
        <label for="scheduled">
          <div class="check">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-check"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span>Запланированные</span>
        </label>
      </form>
      <div class="pagination">
        <input type="number" value="1" name="page" />
        / {{this.totalPage}}
      </div>
    </div>
    <div class="table">
      <div class="t-head">
        <div class="tr">
          <div class="td checkbox">
            <input type="checkbox" id="all-items" @change="selectAll($event)" />
            <label for="all-items">
              <div class="check">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-check"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </label>
          </div>
          <div class="td">Название</div>
          <div class="td">Категория</div>
          <div class="td">Тип статьи</div>
          <div class="td">Статус статьи</div>
          <!-- <div class="td">Метки</div> -->
          <div class="td">Дата публикации</div>
        </div>
      </div>
      <div class="t-body">
        <div class="tr" v-for="article of articleList" :key="article">
          <div class="td checkbox">
            <input type="checkbox" :id="'art-'+article.articleId" />
            <label :for="'art-'+article.articleId">
              <div class="check">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-check"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </label>
          </div>
          <div class="td">
            <nuxt-link tag="a" :to="'/admin/articles/'+article.articleId">{{article.articleTitle}}</nuxt-link>
          </div>
          <div class="td">{{articleType[article.articleTypeId]}}</div>
          <div class="td">{{article.categoryId}}</div>
          <div class="td">{{article.categoryId}}</div>
          <!-- <div class="td">{{article.articleTags}}</div> -->
          <div class="td">{{getData(article.articlePublishedAt)}}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  layout: "auth",
  metaInfo: {
    title: "Статьи"
  },
  data() {
    return {
      articleList: [],
      totalRecord: 0,
      totalPage: 0,
      articleType: [],
      tags: [],
      categories: {}
    };
  },
  mounted() {
    this.axios({
      method: "post",
      url: "http://10.0.2.120:3000/api/article/search",
      data: { page: 1, limit: 10, search: {}, sort: {} },
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        this.totalRecord = response.data.total_record;
        this.totalPage = response.data.total_page;
        this.articleList = response.data.records;
        this.$nextTick(function() {
          this.totalRecord = response.data.total_record;
          this.totalPage = response.data.total_page;
          this.articleList = response.data.records;
        });
        // this.pages = Math.ceil(Object.keys(this.tags).length / 20);
      })
      .catch(error => {
        let data = error.response.data;
        this.errorsShow(data.message);
      });

    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/api/category/list?categoryId=16",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        // this.totalRecord = response.data.total_record;
        // this.totalPage = response.data.total_page;
        // this.articleList = response.data.records;
        // this.$nextTick(function() {
        //   this.totalRecord = response.data.total_record;
        //   this.totalPage = response.data.total_page;
        //   this.articleList = response.data.records;
        // });
        // this.pages = Math.ceil(Object.keys(this.tags).length / 20);
      })
      .catch(error => {
        let data = error.response.data;
        this.errorsShow(data.message);
      });
    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/api/tag/list",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        let tags = [];
        Object.keys(response.data).forEach(element => {
          let obj = {
            name: response.data[element].tagName,
            id: response.data[element].tagId
          };
          tags.push(obj);
        });
        this.tags = tags;
        this.$nextTick(function() {
          this.tags = tags;
        });
      })
      .catch(error => {
        let data = error.response.data;
        this.errorsShow(data.message);
      });

    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/api/article/status/list",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        let status = {};
        articleStatus.forEach(element => {
          status[element.articleStatusId] = element.articleStatusName;
        });
        this.$nextTick(function() {
          this.articleStatus = status;
        });
      })
      .catch(error => {
        let data = error.response.data;
        this.errorsShow(data.message);
      });
    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/api/category/list",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        let categories = {};
        articleStatus.forEach(element => {
          categories[element.categoryId] = element.categoryName;
        });
        this.$nextTick(function() {
          this.categories = categories;
        });
      })
      .catch(error => {
        let data = error.response.data;
        this.errorsShow(data.message);
      });
    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/api/article/type/list",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        let type = {};
        articleStatus.forEach(element => {
          type[element.articleTypeId] = element.articleTypeName;
        });
        this.$nextTick(function() {
          this.articleType = type;
        });
      })
      .catch(error => {
        let data = error.response.data;
        this.errorsShow(data.message);
      });
  },
  methods: {
    getData(dt) {
      console.log(123123123);

      var date = new Date(dt);
      var convert =
        date.getDate() +
        "." +
        (date.getMonth() + 1) +
        "." +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes();
      return convert;
    },
    selectAll: function(event) {
      let chekbox = document.querySelectorAll(".t-body .tr .td.checkbox input");
      for (var i = 0; i < chekbox.length; i++) {
        chekbox[i].checked = selected;
      }
    }
  }
};
</script>
<style scoped>
</style>