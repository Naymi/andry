<template>
  <div class="quests">
    <div class="quests__title">Вопросики:</div>
    <div class="quests__content">
      <quest
        :disabled="disabled"
        :showAnswer="showAnswer"
        v-for="q in quests"
        :key="q.id"
        :quest="q"
      />
    </div>

    <v-btn @click="showAnswer=true;disabled=true">Проверить</v-btn>
  </div>
</template>

<script>
import quest from './quest'
export default {
  components: {
    quest
  },
  props: {
    quests: Array,
    disabled: Boolean
  },
  data() {
    return {
      showAnswer: false
    }
  }
}
</script>
