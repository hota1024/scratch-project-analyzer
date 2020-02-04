<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h1 class="text-center">Scratch Project Analyzer</h1>
        <project-id-input @input="onInput" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ProjectIdInput from '../components/ProjectIdInput.vue'

@Component({
  components: {
    ProjectIdInput
  }
})
export default class IndexPage extends Vue {
  onInput(id: string) {
    this.$router.push(`${id}`)
  }
}
</script>

<style scoped lang="stylus"></style>
