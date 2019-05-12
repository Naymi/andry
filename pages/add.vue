<template>
  <div class="main">
    <v-layout light wrap>
      <div>
        <v-text-field label="Название" v-model="title"/>
        <v-text-field label="Имя в url(slug)" v-model="slug"/>
      </div>
      <v-flex md12>
        <no-ssr>
          <vue-editor v-model="content"></vue-editor>
        </no-ssr>
      </v-flex>
      <v-btn @click="showhtml = !showhtml">show html</v-btn>
      <v-btn @click="save">Спасти и добавить</v-btn>
      <br>
      <v-flex v-if="showhtml">{{content}}</v-flex>
    </v-layout>
  </div>
</template>

<script>
let components = {}
if (process.browser) {
  components.vueEditor = require('vue2-editor').VueEditor
}
import posts from '~/assets/posts'
export default {
  components,
  methods: {
    save() {
      if (/[\/]/.test(this.title)) {
        return alert('Некорректные символы в тайтле')
      }
      this.$axios({
        method: 'POST',
        url: '/api/add.php',
        data: {
          content: this.content,
          slug: this.slug,
          title: this.title,
          id: this.id
        }
      })
    }
  },
  data() {
    return {
      showhtml: false,
      slug: this.$route.params.post,
      content: '',
      slug: '',
      title: ''
    }
  }
}
</script>

<style scoped>
.main {
  background-color: #fff;
}
</style>
