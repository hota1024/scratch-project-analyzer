<template>
  <v-container>
    <list-list list-title="Lists" :lists="lists"></list-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Project } from 'project-json'
import ListList from '~/components/ListList.vue'

@Component({
  layout: 'project',
  components: {
    ListList
  }
})
export default class ListsPage extends Vue {
  search: string = ''

  get project() {
    return this.$store.state.project as Project
  }

  get lists() {
    return this.project.lists()
  }
}
</script>

<style scoped lang="stylus"></style>
