<template>
  <v-container>
    <h1>{{ apiProject.title }}</h1>
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Shared data</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>
              ID: <v-chip>{{ apiProject.id }}</v-chip>
            </p>
            <p>
              Project name: <v-chip>{{ apiProject.title }}</v-chip>
            </p>
          </v-card-text>
        </v-card>
        <v-card class="mb-4">
          <v-card-title>
            <v-icon>mdi-puzzle</v-icon>
            Extensions</v-card-title
          >
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-if="project.extensions.length === 0">
              <v-list-item-content>
                <v-list-item-title>
                  No extensions...
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="extension in project.extensions"
              :key="extension"
            >
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
        </v-card>
        <v-card class="mb-4">
          <variable-list
            list-title="Variables"
            title-icon="mdi-database"
            :variables="project.variables()"
          ></variable-list>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Numbers</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>
              Targets(sprites + stage):
              <v-chip>{{ project.targets.length }}</v-chip>
            </p>
            <p>
              Total assets: <v-chip>{{ totalAssets }}</v-chip>
            </p>
            <p>
              Monitors: <v-chip>{{ project.monitors.length }}</v-chip>
            </p>
          </v-card-text>
        </v-card>
        <v-card class="mb-4">
          <list-list
            list-title="Lists"
            title-icon="mdi-format-list-bulleted"
            :lists="project.lists()"
          ></list-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Project, ExtensionCode } from 'project-json'
import ProjectViewer from '../../components/ProjectViewer.vue'
import { APIProject } from '../../types/project'
import VariableList from '~/components/VariableList.vue'
import ListList from '~/components/ListList.vue'

@Component({
  layout: 'project',
  components: {
    ProjectViewer,
    VariableList,
    ListList
  }
})
export default class IdIndexPage extends Vue {
  get project() {
    return this.$store.state.project as Project
  }

  get apiProject() {
    return this.$store.state.apiProject as APIProject
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
