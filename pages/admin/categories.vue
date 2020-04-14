<template>
  <section id="page" class="categories">
    <h1>Категории</h1>
    <div class="flex-block">
      <div class="block created-category">
        <div>
          <p class="caption">Добавить новую категорию</p>
          <label>
            Название
            <input type="text" name="name" @change="translit()" v-model="name" ref="name" />
          </label>
          <label>
            Ярлык
            <input type="text" name="aliase" v-model="aliase" />
          </label>
          <label>
            Родительская
            <select name="parent" v-model="parent">
              <option :value="0">Нет</option>
              <option
                :value="categoryId"
                v-for="(categoryItem,categoryId) of category"
                :key="categoryId"
              >{{categoryItem.categoryName}}</option>
            </select>
          </label>
          <div class="text-right">
            <button type="submit" class="blue-btn" @click="setCategory();">Добавить</button>
          </div>
        </div>
      </div>
      <div class="categories-table">
        <div id="filter">
          <button class="delete" @click="deleteCat">Удалить</button>
          <div class="pagination">
            <input type="number" value="1" name="page" /> / 123
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
            <div
              class="tr"
              :class="categoryItem.children.length>0 ? 'flex-wrap_wrap' : ''"
              v-for="(categoryItem,categoryId) of category"
              :key="categoryId"
            >
              <div class="td checkbox">
                <input
                  type="checkbox"
                  :id="'cat-'+categoryId"
                  :value="childId"
                  @change="onDel(categoryId)"
                />
                <label :for="'cat-'+categoryId">
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
              <div class="td">{{categoryItem.categoryName}}</div>
              <div class="td">{{categoryItem.categoryAlias}}</div>
              <template v-if="categoryItem.children.length>0">
                <div class="tr" v-for="(childId) of categoryItem.children" :key="childId">
                  <div class="td checkbox">
                    <input type="checkbox" :id="'cat-'+childId" :value="childId" />
                    <label :for="'cat-'+childId">
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
                  <div class="td">— {{category[childId].categoryName}}</div>
                  <div class="td">{{category[childId].categoryAlias}}</div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  layout: "auth",
  props: ["id"],
  head() {
    return {
      title: "Категории"
    };
  },
  data() {
    return {
      aliase: "",
      category: {},
      pages: 0,
      parent: 0,
      name: "",
      description: "",
      forDelete: []
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/api/category/list",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        let categoryList = {};

        response.data.forEach(function(cat) {
          console.log(cat.categoryId);
          if (cat.categoryParentId != 0) {
            categoryList[cat.categoryParentId]["children"].push(cat.categoryId);
            categoryList[cat.categoryId] = cat;
            categoryList[cat.categoryId]["children"] = [];
          } else {
            categoryList[cat.categoryId] = cat;
            categoryList[cat.categoryId]["children"] = [];
          }
        });
        this.category = categoryList;
        // this.pages = Math.ceil(Object.keys(this.tags).length / 20);
      })
      .catch(error => {
        // let data = error.response.data;
        // this.errorsShow(data.message);
      });
  },
  methods: {
    translit: function() {
      var aliase = this.name;
      var space = "-";
      var link = "";
      var transl = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "e",
        ж: "zh",
        з: "z",
        и: "i",
        й: "j",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sh",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya"
      };
      if (aliase != "") aliase = aliase.toLowerCase();

      for (var i = 0; i < aliase.length; i++) {
        if (/[а-яё]/.test(aliase.charAt(i))) {
          // заменяем символы на русском
          link += transl[aliase.charAt(i)];
        } else if (/[a-z0-9]/.test(aliase.charAt(i))) {
          // символы на анг. оставляем как есть
          link += aliase.charAt(i);
        } else {
          if (link.slice(-1) !== space) link += space; // прочие символы заменяем на space
        }
      }
      this.aliase = link;

      // .translit()
      // .replace(/[^a-z0-9 ]/g, "")
      // .replace(/ /g, "-");
    },
    setCategory: function() {
      this.axios({
        method: "post",
        url: "http://10.0.2.120:3000/api/category/create",
        data: {
          categoryName: this.name,
          categoryAlias: this.aliase,
          categoryDescription: this.description,
          categoryParentId: +this.parent
        },
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(response => {
          // response.data.id
          let obj = response.data;
          this.$set(this.category, response.data.categoryId, obj);
        })
        .catch(error => {
          let data = error.response.data;
          this.errorsShow(data.message);
        });
    },
    onDel(catId) {
      if (this.forDelete.indexOf(catId) === -1) {
        this.forDelete.push(catId);
      } else {
        this.forDelete.splice(this.forDelete.indexOf(catId), 1);
      }
    },
    deleteCat() {
      if (this.forDelete.length == 0) {
        alert("Нет категорий для удаления");
      } else {
        var catList = [];
        let cat = this.category;
        this.forDelete.forEach(element => {
          catList.push(cat[element].categoryName);
        });
        var answer = confirm(
          "Вы хотите удалить следующие категории: " + catList.join("; ")
        );
      }
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
.tr.flex-wrap_wrap {
  flex-wrap: wrap;
}
.tr .tr {
  width: 100%;
  padding-left: 0;
}
</style>