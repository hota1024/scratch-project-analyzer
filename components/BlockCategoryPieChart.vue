<template>
  <pie-chart
    :chart-data="blocksChart"
    :options="chartOptions"
    :styles="chartStyles"
  ></pie-chart>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ChartData, ChartOptions } from 'chart.js'
import { BlockCategory, Sprite } from 'project-json'
import PieChart from './PieChart.vue'

@Component({
  components: {
    PieChart
  }
})
export class BlockCategoryPieChart extends Vue {
  @Prop({ default: () => {} }) sprite!: Sprite

  chartOptions: ChartOptions = {
    maintainAspectRatio: false
  }

  chartStyles = {
    width: '100%',
    height: '100%'
  }

  get blocksChart() {
    const sprite = this.sprite
    if (!sprite) return

    const palette = [
      '#4C97FF',
      '#9965FF',
      '#D65BD6',
      '#F8D502',
      '#F5AB1A',
      '#4CBFE6',
      '#42BF49',
      '#F38B1B',
      '#F26580',
      '#575E75',
      '#4B8FEE',
      '#4D4D4D',
      '#44BD8B',
      '#7BB5FF',
      '#F4848A',
      '#4B96FD',
      '#414756',
      '#FEFEFE',
      '#5F95DC',
      '#5CB1D6',
      '#000000'
    ]

    const categoryData = [
      sprite.getCategoryBlocks(BlockCategory.Motion).length,
      sprite.getCategoryBlocks(BlockCategory.Looks).length,
      sprite.getCategoryBlocks(BlockCategory.Motion).length,
      sprite.getCategoryBlocks(BlockCategory.Sound).length,
      sprite.getCategoryBlocks(BlockCategory.Event).length,
      sprite.getCategoryBlocks(BlockCategory.Control).length,
      sprite.getCategoryBlocks(BlockCategory.Sensing).length,
      sprite.getCategoryBlocks(BlockCategory.Operator).length,
      sprite.getCategoryBlocks(BlockCategory.Procedures).length,
      sprite.getCategoryBlocks(BlockCategory.Music).length,
      sprite.getCategoryBlocks(BlockCategory.Pen).length,
      sprite.getCategoryBlocks(BlockCategory.VideoSensing).length,
      sprite.getCategoryBlocks(BlockCategory.Text2speech).length,
      sprite.getCategoryBlocks(BlockCategory.Translate).length,
      sprite.getCategoryBlocks(BlockCategory.Makeymakey).length,
      sprite.getCategoryBlocks(BlockCategory.Microbit).length,
      sprite.getCategoryBlocks(BlockCategory.Ev3).length,
      sprite.getCategoryBlocks(BlockCategory.Boost).length,
      sprite.getCategoryBlocks(BlockCategory.Wedo2).length,
      sprite.getCategoryBlocks(BlockCategory.Gdxfor).length,
      sprite.getCategoryBlocks(BlockCategory.Unknown).length
    ]

    const data: ChartData = {
      labels: [
        'Motion',
        'Looks',
        'Sound',
        'Event',
        'Control',
        'Sensing',
        'Operator',
        'Data',
        'Procedures',
        'Music',
        'Pen',
        'VideoSensing',
        'Text2speech',
        'Translate',
        'Makey Makey',
        'micro:bit',
        'EV3',
        'Boost',
        'Wedo2',
        'Gdxfor',
        'Unknown'
      ],
      datasets: [
        {
          data: categoryData,
          backgroundColor: palette
        }
      ]
    }

    return data
  }
}

export default BlockCategoryPieChart
</script>

<style scoped lang="stylus"></style>
