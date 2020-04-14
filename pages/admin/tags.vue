<template>
  <section id="page" class="categories">
    <h1>Теги</h1>
    <div class="flex-block">
      <div class="block created-category">
        <div>
          <p class="caption">Добавить новый тег</p>
          <label>
            Название
            <input type="text" name="name" @change="translit()" v-model="name" />
          </label>
          <label>
            Ярлык
            <input type="text" name="aliase" v-model="aliase" />
          </label>
          <div class="text-right">
            <button @click="setTag()" class="blue-btn">Добавить</button>
          </div>
        </div>
      </div>
      <div class="categories-table">
        <div id="filter">
          <button class="delete">Удалить</button>
          <div class="pagination">
            <input type="number" value="1" name="page" />
            / {{pages}}
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
              <div class="td">Ярлык</div>
            </div>
          </div>
          <div class="t-body">
            <div class="tr" v-for="(tag) of tags" :key="tag">
              <div class="td checkbox">
                <input type="checkbox" :id="tag.tagId" />
                <label :for="tag.tagId">
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
              <div class="td">{{tag.tagName}}</div>
              <div class="td">{{tag.tagAlias}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap" v-if="error">
      <div class="error">
        <div class="caption">
          <h3>ERROR</h3>
          <svg
            @click="error='';"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <p>{{error}}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  layout: "auth",
  props: ["id"],
  metaInfo: {
    title: "Теги"
  },
  data() {
    return {
      aliase: "",
      name: "",
      tags: {},
      error: "",
      pages: 0
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/api/tag/list",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        this.tags = response.data;
        this.pages = Math.ceil(Object.keys(this.tags).length / 20);
      })
      .catch(error => {
        let data = error.response.data;
        this.errorsShow(data.message);
      });
  },
  methods: {
    errorsShow: function(err) {
      this.error = err;
    },
    translit: function() {
      this.aliase = this.name
        .toLowerCase()
        .translit()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/ /g, "-");
    },
    setTag: function() {
      this.axios({
        method: "post",
        url: "http://10.0.2.120:3000/api/tag/create",
        data: { tagName: this.name, tagAlias: this.aliase },
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(response => {
          let obj = {
            name: response.data.tagName,
            aliase: response.data.tagAlias
          };
          // response.data.id
          this.$set(this.tags, response.data.tagId, obj);
        })
        .catch(error => {
          let data = error.response.data;
          this.errorsShow(data.message);
        });
    }
  }
};
</script>
<style scoped>
.flex-block {
  display: flex;
  justify-content: space-between;
}
.created-category,
.categories-table {
  width: calc(50% - 5px);
}
.created-category {
  background: #fff;
  padding: 10px;
}
label input,
label select {
  margin-left: 10px;
}
label {
  margin-bottom: 5px;
}
#filter {
  background: #fff;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  position: sticky;
  top: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  width: unset;
  border-top: unset;
  margin-top: 0;
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>