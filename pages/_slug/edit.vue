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
      <div v-if="process">
        Ожидание ответа
        <v-progress-circular size="50" indeterminate color="red"></v-progress-circular>
      </div>
      <v-btn @click="showhtml = !showhtml">show html</v-btn>
      <v-btn :disabled="process" @click="save">Спасти и Сохранить</v-btn>
      <v-btn :to="itemUrl">Перейти к посту</v-btn>
    </v-layout>
    <br>
    <v-alert :type='alert.type' v-model="alert.visible">{{alert.text}}</v-alert>
    <v-flex v-if="showhtml">{{content}}</v-flex>
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
    const { content, slug, id, title } = tmp.data
    return {
      content,
      slug,
      id,
      title
    }
  },
  computed: {
    process() {
      return this.$store.state.process.process
    },
  },
  components,
  methods: {
    save() {
      if (/[\/]/.test(this.title)) {
        return alert('Некорректные символы в тайтле')
      }
      if (/[\/]/.test(this.slug)) {
        return alert('Некорректные символы в тайтле')
      }
      let slug = this.slug
      this.$store.commit('process/processOn')
      this.$axios({
        method: 'POST',
        url: '/api/update.php',
        data: {
          content: this.content,
          slug,
          title: this.title,
          id: this.id
        }
      })
        .then(e => {
          this.$store.commit('process/processOff')
          this.itemUrl = '/' + slug
          this.alert.type = 'success'
          this.alert.text = 'Сохранение успешно'
          this.alert.visible = true
        })
        .catch(() => {
          this.$store.commit('process/processOff')
          this.alert.text = 'Произошла ошибка'
          this.alert.type = 'error'
          this.alert.visible = true
        })
    }
  },
  data() {
    return {
      alert: {
        type: '',
        visible: false,
        text: ''
      },
      processStatus: false,
      itemUrl: '/' + this.$route.params.slug,
      showhtml: false,
      slug: this.$route.params.slug
    }
  }
}
</script>

<style scoped>
.main {
  background-color: #fff;
}
</style>
