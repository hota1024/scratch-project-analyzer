<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import { Pie, mixins as vueChartMixins } from 'vue-chartjs'
import { ChartData, ChartOptions } from 'chart.js'

@Component
export class PieChart extends mixins(Pie, vueChartMixins.reactiveProp) {
  @Prop({ default: {} }) chartData!: ChartData
  @Prop({ default: {} }) options!: ChartOptions

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}

export default PieChart
</script>

<style scoped lang="stylus"></style>
