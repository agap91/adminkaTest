<template>
  <section id="page">
    <h1 v-if="this.$route.params.id!=0">Редактировать запись {{this.$route.params.id}}</h1>
    <h1 v-else>Добавить статью</h1>
    <div class="edit-block">
      <div class="left">
        <input
          type="text"
          name="caption"
          placeholder="Название статьи"
          class="w-100"
          @change="translit()"
          ref="caption"
          v-model="articleData.articleTitle"
        />
        <p>
          Постоянная ссылка: https://prostoprostavki.ru/
          <span
            v-show="!urlInput"
            class="aliase"
            @click="urlInput=!urlInput"
          >{{articleData.articleAlias}}</span>
          <input
            v-show="urlInput"
            class="input-aliase"
            type="text"
            name="aliase"
            v-model="articleData.articleAlias"
            minlength="1"
            @change="hideInputAlias()"
          />
        </p>
        <!-- <editor
          autofocus
          holder-id="codex-editor"
          save-button-id="save-button"
          :init-data="initData"
          v-model="text"
          @save="save"
          @ready="onReady"
          @change="onChange"
        />-->
        <!-- <editor-content :editor="editor" /> -->
        <!-- <editor v-model="text"></editor> -->

        <textarea class="w-100" v-model="articleData.articleCut" placeholder="Вступление"></textarea>

        <!-- <textarea id="tm" v-model="articleData.articleText"></textarea> -->
        <tinymce id="tm" :other_options="tinyOptions" v-model="articleData.articleText" ref="tm"></tinymce>

        <div class="block">
          <label>
            Название источника
            <input
              type="text"
              name="keywords"
              v-model="articleData.articleSourceName"
            />
          </label>
          <label>
            Ссылка на источник
            <input
              type="text"
              name="descriptionrds"
              v-model="articleData.articleSourceLink"
            />
          </label>
          <label>
            Meta-keywords
            <input
              type="text"
              name="keywords"
              v-model="articleData.articleMetaKeyword"
            />
          </label>
          <label>
            Meta-description
            <input
              type="text"
              name="descriptionrds"
              v-model="articleData.articleMetaDescription"
            />
          </label>
        </div>
        <div class="block item-part-50" v-if="articleData.categoryId==8">
          <label>
            Бонус
            <input
              type="text"
              name="descriptionrds"
              v-model="articleData.advancedFields.bonus"
            />
          </label>
          <label>
            Мин. ставка
            <input
              type="text"
              name="descriptionrds"
              v-model="articleData.advancedFields['min-stavka']"
            />
          </label>
          <label>
            Тип бонуса
            <input
              type="text"
              name="descriptionrds"
              v-model="articleData.advancedFields['tip-bonusa']"
            />
          </label>
        </div>
      </div>
      <div class="right">
        <div class="block">
          <label>
            Статус
            <select v-model="articleData.articleStatusId">
              <option
                v-for="status of articleStatus"
                :value="status.articleStatusId"
                :key="status"
              >{{status.articleStatusName}}</option>
            </select>
          </label>
          <label>
            Тип статьи
            <select v-model="articleData.articleTypeId">
              <option
                v-for="type of articleType"
                :value="type.articleTypeId"
                :key="type"
              >{{type.articleTypeName}}</option>
            </select>
          </label>
          <label>
            Дата публикации
            <!-- <datetime format="MM/DD/YYYY H:i" v-model="articleData.articlePublishedAt"></datetime> -->
            <VueCtkDateTimePicker v-model="articleData.articlePublishedAt" />
          </label>
          <input
            type="radio"
            name="category"
            id="toparticle"
            v-model="articleData.articleIsTop"
            :value="true"
          />
          <label for="toparticle">
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
            <span>Топ статья</span>
          </label>
          <input
            type="radio"
            name="category"
            id="protected"
            v-model="articleData.articleIsProtected"
            :value="true"
          />
          <label for="protected">
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
            <span>Приватная статья</span>
          </label>
          <div class="text-right w100">
            <!-- <button class="blue-btn" v-if="this.$route.params.id!=0" @click="updArticle()">Изменить</button> -->
            <button class="blue-btn" v-if="this.$route.params.id!=0" @click="updArticle()">Изменить</button>
            <button class="blue-btn" v-else @click="setArticle()">Добавить</button>
          </div>
          <input
            type="radio"
            name="category"
            id="deleted"
            v-model="articleData.articleIsDeleted"
            :value="true"
          />
          <label for="deleted">
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
            <span>Удалить статью</span>
          </label>
        </div>
        <div class="block categories">
          <h2>Категории</h2>
          <ul>
            <li v-for="(data,slug) of category" :key="slug">
              <input
                type="radio"
                name="category"
                :id="'category-'+slug"
                v-model="articleData.categoryId"
                :value="slug"
              />
              <label :for="'category-'+slug">
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
                <span>{{data.name}}</span>
              </label>

              <ul v-if="Object.keys(data.children).length > 0">
                <li v-for="(childrenData,childrenSlug) of data.children" :key="childrenSlug">
                  <input
                    type="radio"
                    name="category"
                    :id="'category-'+childrenSlug"
                    :value="childrenSlug"
                  />
                  <label :for="'category-'+childrenSlug">
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
                    <span>{{childrenData.name}}</span>
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="block tags">
          <label>
            Теги
            <autocomplete
              :search="search"
              placeholder="Тег"
              :get-result-value="getResultValue"
              @submit="creatTagsList"
            ></autocomplete>
          </label>
          <ul class="tags-list">
            <li v-for="(tag, index) of tagsUse" :key="tag" @click="removeTag(index)">
              {{tag.name}}
              <svg
                class="clear-filter-item"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </li>
          </ul>
        </div>
        <div class="block mainImg">
          <input type="file" @change="upload" />
          <img ref="preview" />
          <img ref="imgMedia" :src="mediaName" />
        </div>
      </div>
    </div>
    <div class="media" style="display: none;">
      <div class="upload"></div>
      <div class="files"></div>
    </div>
  </section>
</template>
<script>
export default {
  layout: "auth",
  props: ["id"],
  metaInfo: {
    title: "Статья"
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      tinyOptions: {
        language_url: "/langs/ru.js",
        height: 500,
        selector: "#tm"
      },
      mainImage: "",
      content: "<h3>vue html5 editor</h3>",
      category: {},
      urlInput: false,
      aliase: "",
      text: "",
      tagsUse: [],
      options: {
        language_url: this.langs || "",
        height: this.height || 350
      },
      articleData: {
        userId: "12",
        categoryId: 0,
        articleTypeId: "",
        articleStatusId: 1,
        articleTitle: "",
        articleAlias: "",
        articleCut: "",
        articleText: "",
        articleMetaKeyword: "",
        articleMetaDescription: "",
        articleIsTop: false,
        articleIsProtected: false,
        articleSourceName: "",
        articleSourceLink: "",
        articlePublishedAt: "",
        articlePublishedAt: new Date(),
        articleTags: [],
        articleMedia: [],
        articleIsDeleted: false
      },
      media: "",
      tags: [],
      articleType: [],
      articleStatus: [],
      categories: {
        bk: {
          name: "БК",
          children: {}
        },
        shool: {
          name: "Школа БК",
          children: {
            history: {
              name: "История"
            },
            alphabet: {
              name: "Азбука игрока"
            }
          }
        }
      }
    };
  },
  watch: {
    // content: function(content) {
    //   console.log(content);
    //   if (this.editor && this.allowSetContent) {
    //     // setContent will let editor focus in first line and first world
    //     this.editor.setContent(content);
    //   }
    // }
  },
  mounted() {
    if (this.$route.params.id != 0) {
      this.axios({
        method: "post",
        url: "http://10.0.2.120:3000/api/article/search",
        data: {
          page: 1,
          limit: 1,
          search: { articleId: this.$route.params.id },
          sort: {}
        },
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(response => {
          this.mediaName =
            response.data.records[0].articleMedia.length > 0
              ? response.data.records[0].articleMedia[0].mediaName
              : "";
          this.articleData = response.data.records[0];
          this.$nextTick(function() {
            this.articleData = response.data.records[0];
            this.mediaName =
              response.data.records[0].articleMedia.length > 0
                ? response.data.records[0].articleMedia[0].mediaName
                : "";
          });
          // this.pages = Math.ceil(Object.keys(this.tags).length / 20);
        })
        .catch(error => {
          console.log(3);
          console.log(error);
          // let data = error.response.data;
          // this.errorsShow(data.message);
        });
    }

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
          let obj = {};
          if (cat.categoryParentId != 0) {
            obj = {
              name: cat.categoryName,
              children: {}
            };
            categoryList[cat.categoryParentId]["children"][
              cat.categoryId
            ] = obj;
          } else {
            obj = {
              name: cat.categoryName,
              children: {}
            };
            categoryList[cat.categoryId] = obj;
          }
        });
        this.categories = categoryList;
        this.$nextTick(function() {
          this.category = categoryList;
        });
        // this.pages = Math.ceil(Object.keys(this.tags).length / 20);
      })
      .catch(error => {
        console.log(4);
        console.log(error);
        // let data = error.response.data;
        // this.errorsShow(data.message);
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
        console.log(5);
        console.log(error);
        // let data = error.response.data;
        // this.errorsShow(data.message);
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
        this.articleStatus = response.data;
        this.$nextTick(function() {
          this.articleStatus = response.data;
        });
      })
      .catch(error => {
        console.log(6);
        console.log(error);
        // let data = error.response.data;
        // this.errorsShow(data.message);
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
        this.articleType = response.data;
        this.$nextTick(function() {
          this.articleType = response.data;
        });
      })
      .catch(error => {
        console.log(7);
        console.log(error);
        // let data = error.response.data;
        // this.errorsShow(data.message);
      });
  },
  //   // Define what language you want to use.
  //   // This can be called in something like a header with a language selector menu
  //   // Or any other case, doesn't need to be called in all components, but
  //   // at least in one, so it sets the global language of the plugin
  //   this.$translate.setLang("es_DO");
  // },
  computed: {},
  methods: {
    updArticle() {
      this.axios({
        method: "put",
        url: "http://10.0.2.120:3000/api/article/update",
        data: this.articleData,
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(response => {
          this.$router.replace({
            path: "/admin/articles/" + response.data.articleId
          });
        })
        .catch(error => {
          console.log(1);
          console.log(error);
          // let data = error.response.data;
          // this.errorsShow(data.message);
        });
    },
    setArticle() {
      this.axios({
        method: "post",
        url: "http://10.0.2.120:3000/api/article/create",
        data: this.articleData,
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(response => {
          this.$router.replace({
            path: "/admin/articles/" + response.data.articleId
          });
        })
        .catch(error => {
          console.log(2);
          console.log(error);
          // let data = error.response;
          // this.errorsShow(data.message);
        });
    },
    updContent: function(data) {
      console.log(123123123);
      console.log(data);
      this.content = data;
      this.$nextTick(function() {
        this.content = data;
      });
    },
    // onDrop: function(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   if (!e.dataTransfer.files || !eventOnElement(e, this.$refs.preview)) {
    //     return;
    //   }
    //   if (!e.dataTransfer.files || !e.dataTransfer.files[0]) {
    //     return;
    //   }
    //   if (!/^image\.test(e.dataTransfer.files[0].type)) {
    //     return;
    //   }
    //   this.selectImage(e.dataTransfer.files[0]);
    // },
    onImageLoad: function(e) {
      this.$refs.preview.setAttribute("src", e.target.result);
      this.$refs.imgMedia.style("display", "none");
      let filename = this.file instanceof File ? this.file.name : "";
      // Dispatch new input event with filename
      this.$emit("input", filename);
      // Dispatch new event with image content
      this.$emit("image-changed", e.target.result);
    },
    selectImage: function(file) {
      this.file = file;
      let reader = new FileReader();
      reader.onload = this.onImageLoad;
      reader.readAsDataURL(file);
    },
    upload: function(e) {
      e.preventDefault();
      this.mainImage = e.target.files[0];
      this.selectImage(this.mainImage);
      let formData = new FormData();

      formData.append("pictures", this.mainImage);
      formData.append("title", "name");
      formData.append("article_id", this.$route.params.id);
      console.log(formData);
      this.axios
        .post("http://10.0.2.120:3000/on_node/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$cookies.get("token")
          }
        })
        .then(response => {
          console.log(22222);
          console.log(response);
        })
        .catch(error => {
          console.log(11111);
          console.log(error);
        });
      // this.axios({
      //   method: "post",
      //   url: "http://10.0.2.120:3000/api/media/create",
      //   data: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      //   .then(response => {
      //     console.log(22222);
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.log(11111);
      //     console.log(error);
      //   });

      // this.$http.post("user", data).then(
      //   response => {
      //     console.log("Success! Response: ", response.body);
      //   },
      //   response => {
      //     // error callback
      //   }
      // );
    },

    translit: function() {
      if (!this.articleData.articleAlias) {
        var aliase = this.$refs.caption.value;
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
        this.articleData.articleAlias = link;
      }
    },

    // translit: function() {
    //   this.aliase = this.$refs.caption.value
    //     .translit()
    //     .replace(/[^a-z0-9 ]/g, "")
    //     .replace(/ /g, "-");
    // },
    removeTag: function(index) {
      this.tagsUse.splice(index, 1);
    },
    creatTagsList: function(result) {
      if (this.tagsUse.length > 3) {
        this.tagsUse = this.tagsUse.filter(function(item) {
          return item.name !== result.name;
        });
      }
      this.tagsUse.push(result);
    },
    getResultValue: function(result) {
      return result.name;
    },
    search: function(input) {
      if (input.length < 1) {
        return [];
      }
      console.log(this.tags);
      return this.tags.filter(tag => {
        if (tag.name.toLowerCase().indexOf(input.toLowerCase()) != -1) {
          return tag.name;
        }
      });
    },
    hideInputAlias: function() {
      if (this.aliase.length > 0) {
        this.urlInput = !this.urlInput;
      }
    },
    showText: function() {
      console.log(this.articleData.articleText);
    },
    save: function() {
      console.log(this);
    }
  }
};
</script>
<style>
.datepicker.flex.flex-direction-column {
  right: 0 !important;
}
</style>
<style scoped>
.edit-block {
  display: flex;
  justify-content: space-between;
}
.left {
  width: calc(70% - 5px);
}
.right {
  width: calc(30% - 5px);
}
.aliase {
  font-weight: 500;
}
.input-aliase {
  border-color: rgba(0, 0, 0, 0);
  padding: 0;
  font-weight: 500;
}
.input-aliase:focus {
  background: #fff;
  border-color: #cccccc;
}
#vue-editor-js {
  background: #fff;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.block {
  background: #fff;
  padding: 10px;
  border: 1px solid #cccccc;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}
.w100 {
  width: 100%;
}

.block label {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
}
.block.categories {
  height: 300px;
  overflow-y: auto;
}
.categories > ul {
  padding: 0;
  height: 100%;
}
.categories ul li {
  list-style: none;
}
.block.categories label {
  justify-content: flex-start;
}
.categories > ul li ul {
  padding-left: 20px;
}
.block h2 {
  width: 100%;
  margin: 0;
}
.block label input {
  flex: 1;
  margin-left: 10px;
}
#tm,
textarea {
  margin-bottom: 15px;
}
</style>