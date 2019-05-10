<template>
  <div class="main">
    <v-layout light wrap>
      <v-flex md12>
        <!-- <v-card>
          <no-ssr>
            <vue-trix v-model="content"></vue-trix>
          </no-ssr>
        </v-card>0-->
        <no-ssr>
          <vue-editor v-model="content"></vue-editor>
        </no-ssr>
      </v-flex>
      <v-btn @click="save">Сохранить</v-btn>
      <v-btn @click="showContent = !showContent">Показать отренедеренное</v-btn>
      <br>
      <v-flex v-if="showContent">{{content}}</v-flex>
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
      this.$axios({
        method: 'POST',
        url: '/api/add.php',
        params: {
          slug: this.slug,
          content: this.content
        }
      })
        .then(e =>
          e.data === 'succesfull' ? alert('Сохранено') : alert('error')
        )
        .catch(e => alert('error(9('))
    }
  },
  data() {
    return {
      content: '',
      showContent: false
    }
  }
}
</script>

<style scoped>
.main {
  background-color: #fff;
}
</style>
