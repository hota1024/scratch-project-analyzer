<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list v-if="!loading">
        <v-list-item :to="`/${projectId}`" exact>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Project</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="`/${projectId}/variables`" exact>
          <v-list-item-icon>
            <v-icon>mdi-database</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Variables</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="`/${projectId}/lists`" exact>
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Lists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-cat</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sprites</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="sprite in project.sprites()"
            :key="sprite.id"
            :to="getSpriteUrl(sprite)"
          >
            <v-list-item-avatar>
              <v-img :src="sprite.costumes()[0].url()"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ sprite.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-btn icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Scratch Project Analyzer</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container v-if="loading" class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" xs="12">
            <h1 class="text-center">Loading project...</h1>
            <div class="text-center">
              <v-progress-linear indeterminate></v-progress-linear>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <nuxt v-else />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Project, Sprite } from 'project-json/lib/src'

@Component
export default class ProjectLayout extends Vue {
  loading: boolean = true

  project: Project = {} as Project

  drawer: boolean = true

  async mounted() {
    this.loading = true
    await this.$store.dispatch('downloadProject', this.$route.params.id)
    this.loading = false
  }

  get projectId() {
    return this.$store.state.projectId
  }

  @Watch('$store.state.loadingProject')
  onLoadingChanged(loading: boolean) {
    this.loading = loading

    if (loading === false && this.$store.state.project) {
      this.project = this.$store.state.project
    }
  }

  toggleDrawer() {
    this.drawer = !this.drawer
  }

  getSpriteUrl(sprite: Sprite) {
    return `/${this.projectId}/sprites/${sprite.name}`
  }
}
</script>

<style lang="stylus"></style>
