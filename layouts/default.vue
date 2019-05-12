<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
        <v-layout justify-center v-if="load">
          <v-progress-circular size="50" indeterminate color="red"></v-progress-circular>
        </v-layout>
        <v-list v-if="posts">
          <v-list-tile>
            <v-list-tile-title>
              Разделы:
              <v-divider/>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile nuxt :to="`/${i.slug}`" v-for="i in posts" :key="i.slug">{{i.title}}</v-list-tile>
          <v-list-tile nuxt to="/add">Добавить</v-list-tile>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title>Физика</v-toolbar-title>
      <v-spacer/>
      <div class="customiztion" v-if="this.$route.name === 'slug'">
        <span>Кастомизация =></span>
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-spacer/>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <div style="font-size: 20px; text-align: center">
        <b>Кастомизация</b>
      </div>
      <div class="pickers">
        <div>{{`Размер шрифта в пикселях: ${fz}`}}</div>
        <v-slider :min="14" :max="25" v-model="fz"/>
        <label for>
          <span>Цвет текста</span>
          <input type="color" v-model="textColor">
        </label>
        <label for>
          <span>Цвет фона</span>
          <input type="color" v-model="back">
        </label>
      </div>
      <v-btn :to="this.$route.fullPath+'/edit'">Изменить текст</v-btn>
      <v-btn @click="remove" v-if='postId'>Удалить</v-btn>
      <v-btn @click="down">test</v-btn>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$axios
      .$get('/api/show.php')
      .then(e => {
        this.posts = e
        this.load = false
      })
      .catch(e => console.log('e :', e))
  },
  methods: {
    down() {
      let posts
      this.$axios
        .$get('/api/show.php')
        .then(e => {
          posts = e
          this.load = false
        })
        .catch(e => console.log('e :', e))
    },
    remove() {
      this.$axios({
        url: '/api/delete.php',
        method: 'POST',
        data: {
          id: this.postId
        },
        params: {
          id: this.postId
        },
      }).then(e => {
        alert('Удаление успешено')
        this.$router.push('/')
      })
    }
  },
  computed: {
    postId(){
      return this.$store.getters['post/getId']
    },
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
  data() {
    return {
      posts: [],
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Главная',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      posts: {},
      load: true
    }
  }
}
</script>
