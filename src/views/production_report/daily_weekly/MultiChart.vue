<template>
  <CCol>
    <CCard>
      <CCardBody>
        <v-chart class="chart" :option="option" autoresize />
      </CCardBody>
    </CCard>
  </CCol>
</template>

<script setup>
import { use } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
])

import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, watchEffect } from 'vue'

use([CanvasRenderer, LineChart, BarChart, TitleComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, 'light')

const props = defineProps({
  seriesData: Array,
  seriesName: Array,
  xAxis: Array,
  legend: Array,
  chartTitle: String,
  chartData: Object,
  xAxisName: String,
})

const labelOption = ref({
  show: true,
  position: 'top',
  formatter: '{c}  {name|{a}}',
  fontSize: 10,
  rich: {
    name: {},
  },
  color: '#000000', // Mengganti warna tulisan label menjadi putih
  // fontWeight:'Bold',
  fontFamily: 'Roboto, sans-serif', // Mengatur jenis font teks label
  // eslint-disable-next-line no-dupe-keys
  formatter: function (params) {
    // Menampilkan label hanya jika nilai data bukan 0
    if (params.value !== 0 && params.value >= 1000 && params.value < 1000000) {
      params.value = (params.value / 1000).toFixed(0)
      return params.value + 'K' // Menampilkan nilai data dalam ribuan
    } else if (params.value !== 0 && params.value >= 1000000 && params.value < 1000000000) {
      params.value = (params.value / 1000000).toFixed(0)
      return params.value + 'M' // Menampilkan nilai data dalam jutaan
    } else if (params.value !== 0 && params.value >= 1000000000) {
      params.value = (params.value / 1000000000).toFixed(0)
      return params.value + 'B' // Menampilkan nilai data dalam miliar
    } else if (params.value !== 0) {
      return params.value // Menampilkan nilai data
    } else {
      return '' // Menampilkan label kosong jika nilai data adalah 0
    }
  },
})

const yformat = function (value) {
  var newValue = value
  if (value >= 1000000000) {
    newValue = (value / 1000000000).toFixed(0) + 'B'
  } else if (value >= 1000000) {
    newValue = (value / 1000000).toFixed(0) + 'M'
  } else if (value >= 1000) {
    newValue = (value / 1000).toFixed(0) + 'K'
  }
  return newValue
}

const option = ref({
  title: {
    text: props.chartTitle,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: props.legend,
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: props.xAxis,
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: yformat,
        fontSize: 12,
      },
      name: props.xAxisName,
    },
  ],
  series: [],
})

const colors = ['rgb(71, 147, 175)', 'rgb(255, 196, 112)', 'rgb(221, 87, 70)']

const updateChart = () => {
  // Reset option.value.series
  option.value.series = []
  option.value.legend.data = props.legend
  option.value.title.text = props.chartTitle
  option.value.xAxis[0].data = props.xAxis

  // Loop through props.seriesData and push each series to option.value.series
  props.seriesData.forEach((data, index) => {
    option.value.series.push({
      name: props.seriesName[index], // Use seriesName prop for series name
      type: 'line', // Assuming the type is always 'line'
      lineStyle: {
        width: 5,
        // color: colors[index % colors.length]
      },
      smooth: true,
      label: labelOption,
      data: data, // Use the data from props.seriesData
    })
  })
}

watchEffect(() => {
  updateChart()
})
</script>

<style scoped>
.chart {
  height: 34vh;
}
</style>
