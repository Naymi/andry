<template>
  <div class="main">
    <v-layout light wrap>
      <v-flex md12>
        <no-ssr>
          <vue-editor v-model="content"></vue-editor>
        </no-ssr>
      </v-flex>
      <v-btn @click="showhtml = !showhtml">show html</v-btn>
      <v-btn @click="save">Спасти и Сохранить</v-btn>
      <br>
      <v-flex v-if="showhtml">{{content}}</v-flex>
      <v-flex>
        {{content}}
      </v-flex>
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
  async asyncData({ $axios, route }) {
    let tmp = await $axios({
      method: 'POST',
      url: '/api/',
      params: {
        slug: route.params.slug
      },
    })
    console.log('tmp :', tmp.data);
    const { content, slug } = tmp.data
    console.log('content :', content);
    return {
      content,
      slug
    }
  },
  components,
  methods: {
    save() {
      this.$axios({
        method: 'POST',
        params: {
          content: this.content,
          slug: this.slug
        }
      })
    }
  },
  data() {
    console.log('this.$route :', this.$route)
    return {
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
