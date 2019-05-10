<template>
  <section class="main">
    <button @click="download">Клик</button>
    <!-- {{post}} -->
    <div class="content" v-html="post.content"></div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    download() {
      this.$axios({
        method: 'POST',
        url: '/api/',
        params: {
          slug: this.$route.params.slug
        }
      }).then(e => console.log('e :', e))
      // .then(e => console.log('e :', e))
      // .catch(e => console.log('e :', e))
    }
  },
  async asyncData({ $axios, route }) {
    let post
    try {
      post = (await $axios({
        method: 'POST',
        url: '/api/',
        params: {
          slug: route.params.slug
        }
      })).data
    } catch (error) {
      console.log('error :', error)
    }
    return {
      post
    }
  }
}
</script>
