<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Project } from 'project-json'

@Component
export class ProjectViewer extends Vue {
  @Prop({ type: Object, required: true }) project!: Project
}

export default ProjectViewer
</script>

<style scoped lang="stylus"></style>
