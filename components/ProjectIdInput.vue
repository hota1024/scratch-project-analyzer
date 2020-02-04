<template>
  <div>
    <v-row>
      <v-col cols="12" md="10" sm="12" xs="12">
        <v-form v-model="valid">
          <v-text-field
            v-model="projectUrlOrId"
            label="Project URL or ID"
            :rules="rules"
            outlined
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" md="2" sm="12" xs="12">
        <v-btn x-large block :disabled="!valid" @click="onEnter">
          <v-icon>mdi-graph</v-icon>
          Analyze</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export class ProjectIdInput extends Vue {
  valid: boolean = false
  projectUrlOrId: string = ''

  rules: ((v: string) => boolean | string)[] = [
    (v) => !!v || 'Required',
    (v) =>
      /(^\d+)|(https?:\/\/scratch\.mit\.edu\/projects\/\d+\/?)/.test(v) ||
      'Must be url or id'
  ]

  get projectId() {
    const result = this.projectUrlOrId.match(
      /https?:\/\/scratch\.mit\.edu\/projects\/(\d+)\/?/
    )
    if (result) {
      return result[1]
    } else {
      return this.projectUrlOrId
    }
  }

  onEnter() {
    this.$emit('input', this.projectId)
  }
}

export default ProjectIdInput
</script>

<style scoped lang="stylus"></style>
