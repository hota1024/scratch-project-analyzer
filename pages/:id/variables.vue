<template>
  <v-container>
    <variable-list
      list-title="Variables"
      :variables="variables"
    ></variable-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Project } from 'project-json'
import VariableList from '../../components/VariableList.vue'

@Component({
  layout: 'project',
  components: {
    VariableList
  }
})
export default class VariablesPage extends Vue {
  search: string = ''

  get project() {
    return this.$store.state.project as Project
  }

  get variables() {
    return this.project.variables()
  }
}
</script>

<style scoped lang="stylus"></style>
