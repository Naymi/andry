<template>
  <section class="main">
    <h1 class="display-2">{{post.title}}</h1>
    <v-divider/>
    <div
      :style="`font-size:${fz}px; text-align:justify; background: ${back}; color: ${textColor}`"
      v-html="post.content"
    ></div>
    <v-btn @click="getQuest">Показать вопросы</v-btn>
    <quests v-if="quests" :disabled="showAnswer" :quests="quests"/>
  </section>
</template>

<style lang="sass">
.pickers
  display: flex
  align-items: center
  flex-wrap: wrap
  > *
    height: min-content
    margin: 0 10px

.ql-align-center
  text-align: center
</style>


<script>
import axios from 'axios'
import quests from '~/components/quests'
export default {
  components: {
    quests
  },
  created() {
    this.$store.commit('post/updateId', this.post.id)
    console.log('id', this.$store.getters['post/getId'])
  },
  computed: {
    fz: {
      get() {
        return this.$store.getters['ui/getUi'].fz
      },
      set(v) {
        this.$store.dispatch('ui/update', {
          fz: v
        })
      }
    },
    textColor: {
      get() {
        return this.$store.getters['ui/getUi'].textColor
      },
      set(v) {
        this.$store.dispatch('ui/update', {
          textColor: v
        })
      }
    },
    back: {
      get() {
        return this.$store.getters['ui/getUi'].back
      },
      set(v) {
        this.$store.dispatch('ui/update', {
          back: v
        })
      }
    }
  },
  methods: {
    checkAnswer() {},
    setAnswers(v) {
      this.answers = v
    },
    getQuest() {
      this.$axios({
        url: '/api/getQuests.php',
        method: 'GET',
        params: {
          id: this.post.id
        }
      }).then(({ data }) => {
        console.log('data :', data)
        this.quests = data
      })
    },
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
  async asyncData({ store, $axios, route, params, error, payload }) {
    let result = {}
    if (payload) {
      result = payload
    } else {
      try {
        result = (await $axios({
          method: 'POST',
          url: '/api/',
          params: {
            slug: route.params.slug
          }
        })).data
      } catch (error) {
        console.log('error :', error)
      }
    }
    return {
      post: result
    }
  },
  data() {
    return {
      showAnswer: false,
      quests: false
    }
  }
}
</script>
