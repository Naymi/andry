<template>
  <v-dialog max-width="500px" v-model="v">
    <v-card>
      <v-card-title>Для совершения действия необходим пароль</v-card-title>
      <v-text-field type="password" v-model="pass" label="Пароль"></v-text-field>
      <v-btn @click="$emit('ok', pass)">ОК</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      pass: ''
    }
  },
  computed: {
    v: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>
