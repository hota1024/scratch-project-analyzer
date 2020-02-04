<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <h1 class="text-center my-2">{{ sprite.name }}</h1>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" xs="12">
              <div class="my-1">
                <v-icon>mdi-arrow-left-right</v-icon>x
                <v-chip>{{ sprite.x }}</v-chip>
                <v-icon>mdi-arrow-up-down</v-icon>y
                <v-chip>{{ sprite.y }}</v-chip>
              </div>
              <div class="my-1">
                <v-icon>angle-acute</v-icon>Direction
                <v-chip>{{ sprite.direction }}</v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <div class="my-1">
                Visible
                <v-icon>{{
                  sprite.visible ? 'mdi-eye' : 'mdi-eye-off'
                }}</v-icon>
              </div>
              <div class="my-1">
                Size <v-chip>{{ sprite.size }}%</v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <div class="my-1">
                Draggable
                <v-chip>{{ sprite.draggable ? 'true' : 'false' }}</v-chip>
              </div>
              <div class="my-1">
                Rotation style
                <v-chip>
                  <v-avatar left>
                    <v-icon>{{ rotationStyleIcon }}</v-icon>
                  </v-avatar>
                  {{ rotationStyleText }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12" md="6" xs="12">
          <v-card class="mb-6">
            <v-card-title>
              <v-icon>mdi-shape</v-icon>
              Block category(total blocks: {{ sprite.blocks().length }})
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <block-category-pie-chart
                :sprite="sprite"
              ></block-category-pie-chart>
            </v-card-text>
          </v-card>
          <v-card class="mb-6">
            <variable-list
              title-icon="mdi-database"
              list-title="Variables"
              :variables="variables"
            ></variable-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <v-card class="mb-6">
            <v-card-title>
              <v-icon>file-multiple</v-icon>
              Assets
            </v-card-title>
            <v-divider></v-divider>
            <v-tabs v-model="assetTab">
              <v-tab>
                <v-icon>mdi-image</v-icon>
                Costumes
              </v-tab>
              <v-tab-item class="scroll-section">
                <v-card flat tile>
                  <v-list>
                    <div
                      v-for="(costume, index) in sprite.costumes()"
                      :key="index"
                    >
                      <v-dialog max-width="640">
                        <template v-slot:activator="{ on }">
                          <v-list-item v-on="on">
                            <v-list-item-avatar tile>
                              <v-img :src="costume.url()"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                costume.name
                              }}</v-list-item-title>
                              <v-list-item-subtitle>
                                {{ costume.id }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                        <v-card>
                          <v-card-title>{{ costume.name }}</v-card-title>
                          <v-img
                            :src="costume.url()"
                            class="black"
                            max-width="640px"
                          ></v-img>
                        </v-card>
                      </v-dialog>

                      <v-divider
                        v-if="index < sprite.costumes().length - 1"
                      ></v-divider>
                    </div>
                  </v-list>
                </v-card>
              </v-tab-item>

              <v-tab>
                <v-icon>mdi-file-music</v-icon>
                Sounds
              </v-tab>

              <v-tab-item class="scroll-section">
                <v-card flat tile>
                  <v-list>
                    <div v-for="(sound, index) in sprite.sounds()" :key="index">
                      <v-dialog max-width="400px">
                        <template v-slot:activator="{ on }">
                          <v-list-item v-on="on">
                            <v-list-item-avatar tile>
                              <v-icon>mdi-file-music</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                sound.name
                              }}</v-list-item-title>
                              <v-list-item-subtitle>
                                {{ sound.id }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                        <v-card>
                          <v-card-title>{{ sound.name }}</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <audio
                              :src="sound.url()"
                              class="mt-4"
                              style="width: 100%"
                              controls
                            ></audio>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                      <v-divider
                        v-if="index < sprite.sounds().length - 1"
                      ></v-divider>
                    </div>
                  </v-list>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
          <v-card class="mb-6">
            <list-list
              title-icon="mdiformat-list-bulleted"
              list-title="Lists"
              :lists="lists"
            ></list-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Sprite, RotationStyle } from 'project-json'
import { RootState } from '../../../../store'
import BlockCategoryPieChart from '../../../../components/BlockCategoryPieChart.vue'
import VariableList from '../../../../components/VariableList.vue'
import ListList from '../../../../components/ListList.vue'

@Component({
  layout: 'project',
  components: {
    BlockCategoryPieChart,
    VariableList,
    ListList
  }
})
export default class IdSpritesNameIndexPage extends Vue {
  assetTab = 0

  dataTab = 0

  get state() {
    return this.$store.state as RootState
  }

  get sprite() {
    return this.state.project.getSprite(this.$route.params.name) as Sprite
  }

  get rotationStyleIcon() {
    if (this.sprite.rotationStyle === RotationStyle.AllAround) {
      return 'mdi-reload'
    }
    if (this.sprite.rotationStyle === RotationStyle.LeftRight) {
      return 'mdi-arrow-collapse-horizontal'
    }
    if (this.sprite.rotationStyle === RotationStyle.DontRotate) {
      return 'mdi-rotate-right'
    }
  }

  get rotationStyleText() {
    if (this.sprite.rotationStyle === RotationStyle.AllAround) {
      return 'All around'
    }
    if (this.sprite.rotationStyle === RotationStyle.LeftRight) {
      return 'left-right'
    }
    if (this.sprite.rotationStyle === RotationStyle.DontRotate) {
      return `Don't rotate`
    }
  }

  get variables() {
    return this.sprite.variables()
  }

  get lists() {
    return this.sprite.lists()
  }
}
</script>

<style scoped lang="stylus">
.sprite-property {
  font-size: 1.5rem;
  margin: 4px 0;
}

.scroll-section {
  height: 400px;
  overflow: scroll;
}
</style>
