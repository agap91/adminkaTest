<template>
  <section id="page" class="categories">
    <h1>Изображения</h1>
    <div class="flex-block">
      <div class="block w-100">
        <div class="upload">
          <input type="file" @change="upload" />
        </div>
        <ul>
          <li
            v-for="(m, index) of media"
            :key="m"
            :style="'background-image:url(https://prostoprostavki.ru:8888'+m.media_name+')'"
          >
            <svg
              v-if="m.media_id"
              @click="delMedia(m.media_id,index)"
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
          </li>
        </ul>
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
      title: "Изображения"
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
      media: []
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "http://10.0.2.120:3000/on_node/get_media",
      data: {},
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token")
      }
    })
      .then(response => {
        this.media = response.data.media;
        // Object.keys(response.data).forEach(el=>{
        //     console.log(555555);
        //     console.log(el);
        //     // vue.$set(this.media,)
        // })
      })
      .catch(error => {
        // let data = error.response.data;
        // this.errorsShow(data.message);
      });
  },
  methods: {
    upload: function(e) {
      e.preventDefault();
      this.mainImage = e.target.files[0];
      let formData = new FormData();

      formData.append("pictures", this.mainImage);
      formData.append("title", "name");
      formData.append("article_id", this.$route.params.id);
      this.axios
        .post("http://10.0.2.120:3000/on_node/media_set", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.$cookies.get("token")
          }
        })
        .then(response => {
          let obj = {
            media_name: response.data.src + response.data.name
          };
          this.$set(this.media, this.media.length, obj);
        })
        .catch(error => {
          console.log(11111);
          console.log(error);
        });
    },
    delMedia(mId, index) {
      this.axios({
        method: "delete",
        url: "http://10.0.2.120:3000/on_node/media_del",
        data: { mId: mId },
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(response => {
          this.$delete(this.media, index);
        })
        .catch(error => {
          console.log(11111);
          console.log(error);
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
.tr.flex-wrap_wrap {
  flex-wrap: wrap;
}
.tr .tr {
  width: 100%;
  padding-left: 0;
}
.w-100 {
  width: 100%;
}
.block {
  background: #fff;
}
.block ul {
  padding: 0;
  display: flex;
  list-style: none;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 10px;
}
.block ul li {
  width: 200px;
  height: 200px;
  position: relative;
  background-size: cover;
  background-position: center;
  text-align: right;
  border: 2px solid #000;
  cursor: pointer;
  margin-right: 15px;
  margin-bottom: 15px;
}
.block ul li svg {
  display: none;
}
.block ul li:hover svg {
  display: inline;
  background: #fff;
}
</style>