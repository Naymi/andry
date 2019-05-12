<template>
  <div class="main">
    <v-layout light wrap>
      <div class="fiel">
        <v-text-field label="Slug" v-model="slug"/>
        <v-text-field label="Тайтл" v-model="title"/>
      </div>
      <v-flex md12>
        <no-ssr>
          <vue-editor v-model="content"></vue-editor>
        </no-ssr>
      </v-flex>
      <v-btn @click="showhtml = !showhtml">show html</v-btn>
      <v-btn @click="save">Спасти и Сохранить</v-btn>
      <v-btn :to="itemUrl">Перейти к посту</v-btn>
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
  async asyncData({ $axios, route, payload }) {
    if (payload) {
      return payload
    }
    let tmp = await $axios({
      method: 'POST',
      url: '/api/',
      params: {
        slug: route.params.slug
      }
    })
    console.log('tmp :', tmp.data)
    const { content, slug, id, title } = tmp.data
    console.log('content :', content)
    return {
      content,
      slug,
      id,
      title
    }
  },
  computed: {
    itemUrl() {
      return `/${this.slug}`
    }
  },
  components,
  methods: {
    save() {
      if (/[\/]/.test(this.title)) {
        return alert('Некорректные символы в тайтле')
      }
      let slug = this.slug
      this.$axios({
        method: 'POST',
        url: '/api/update.php',
        data: {
          content: this.content,
          slug: this.slug,
          title: this.title,
          id: this.id
        }
      }).then(e => {
        this.itemUrl = this.$route.params.post + slug
      })
    }
  },
  data() {
    return {
      itemUrl: '/item/' + this.$route.params.post,
      showhtml: false,
      slug: this.$route.params.post
    }
  }
}
</script>

<style scoped>
.main {
  background-color: #fff;
}
</style>
