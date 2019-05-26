<template>
  <div class="quest">
    <div class="quest__title">{{quest.title}}</div>
    <v-layout>
      <v-flex v-for="a in quest.answers" :key="a.id">
        <v-card :color="style(a)">
          <v-checkbox :disabled="disabled" :label="a.title" @change="v=>pushAnswer({v:v,a:a})"/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-alert :value="this.showAnswer && !this.answers.length ">Ты не оветил на вопрос</v-alert>
  </div>
</template>

<script>
export default {
  props: {
    quest: Array,
    disabled: Boolean,
    showAnswer: Boolean
  },
  data() {
    return {
      answers: []
    }
  },
  methods: {
    style(a) {
      console.log('a :', a)
      return this.showAnswer && this.answers.find(i => i === a.id)
        ? `${a.value ? 'success' : 'error'}`
        : ''
    },
    pushAnswer(v) {
      if (v.v) {
        this.answers.push(v.a.id)
      } else {
        this.answers = this.answers.filter(i => i !== v.a.id)
      }
    }
  }
}
</script>
