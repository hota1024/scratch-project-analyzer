<template>
  <v-container class="fill-height" fluid>
    <v-row v-if="project" justify="center" align="center">
      <v-col cols="12" md="8" xs="12">
        <h1>Project info</h1>
        <p>Project ID: {{ projectId }}</p>
        <p>Targets(sprites + stage): {{ project.targets.length }}</p>
        <p>Total assets: {{ totalAssets }}</p>
        <p>Monitors: {{ project.monitors.length }}</p>
        <p>Extensions:</p>
        <v-list>
          <v-list-item v-if="project.extensions.length === 0">
            <v-list-item-content>
              <v-list-item-title>
                No extensions...
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="extension in project.extensions" :key="extension">
            <v-list-item-icon>
              <v-icon>{{ getExtensionIcon(extension) }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ extension }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Project, ExtensionCode } from 'project-json'
import ProjectViewer from '../../components/ProjectViewer.vue'

@Component({
  layout: 'project',
  components: {
    ProjectViewer
  }
})
export default class IdIndexPage extends Vue {
  get project() {
    return this.$store.state.project as Project
  }

  get projectId() {
    return this.$store.state.projectId
  }

  get totalAssets() {
    return this.project.targets.map((target) => target.assets()).length
  }

  getExtensionIcon(extension: ExtensionCode) {
    const isExt = (code: ExtensionCode) => code === extension

    if (isExt(ExtensionCode.Music)) return 'mdi-library-music'
    if (isExt(ExtensionCode.Pen)) return 'mdi-pencil'
    if (isExt(ExtensionCode.VideoSensing)) return 'mdi-video'
    if (isExt(ExtensionCode.Text2Speech)) return 'mdi-voice'
    if (isExt(ExtensionCode.Translate)) return 'mdi-google-translate'
    if (isExt(ExtensionCode.MakeyMakey)) return 'mdi-keyboard'
    if (isExt(ExtensionCode.MicroBit)) return 'mdi-leak'
    if (isExt(ExtensionCode.EV3)) return 'mdi-leak'
    if (isExt(ExtensionCode.Boost)) return 'mdi-leak'
    if (isExt(ExtensionCode.Wedo2)) return 'mdi-leak'
    if (isExt(ExtensionCode.GoDirectForceAndAcceleration))
      return 'mdi-slope-uphill'
  }
}
</script>

<style scoped lang="stylus"></style>
