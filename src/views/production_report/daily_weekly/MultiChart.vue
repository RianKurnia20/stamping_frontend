<template>
  <!-- <CCard>
    <CCardBody> -->
      <v-chart class="chart" :option="option" autoresize />
      {{ xAxisData }}
      {{ seriesData }}
      {{ legendData }}
      {{ seriesName }}
      {{ chartTitle }}
    <!-- </CCardBody>
  </CCard> -->
</template>

<script setup>
import { use } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, GridComponent, LineChart, BarChart, CanvasRenderer])


import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, defineProps } from 'vue';


use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

provide(THEME_KEY, 'light');

const props = defineProps({
  seriesData : Array,
  seriesName : String,
  legendData : String,
  xAxisData : Array,
  chartTitle : String
});

const labelOption = ref({
  show: true,
  position: "top",
  formatter: "{c}  {name|{a}}",
  fontSize: 12,
  rich: {
    name: {},
  },
  textStyle: {
    color: "#000000", // Mengganti warna tulisan label menjadi putih
    // fontWeight:'Bold',
    fontFamily: "Roboto, sans-serif", // Mengatur jenis font teks label
  },
  // eslint-disable-next-line no-dupe-keys
  formatter: function (params) {
    // Menampilkan label hanya jika nilai data bukan 0
    if (params.value !== 0 && params.value >= 1000 && params.value < 1000000) {
      params.value = (params.value / 1000).toFixed(1);
      return params.value + "K"; // Menampilkan nilai data dalam ribuan
    } else if (
      params.value !== 0 &&
      params.value >= 1000000 &&
      params.value < 1000000000
    ) {
      params.value = (params.value / 1000000).toFixed(1);
      return params.value + "M"; // Menampilkan nilai data dalam jutaan
    } else if (params.value !== 0 && params.value >= 1000000000) {
      params.value = (params.value / 1000000000).toFixed(1);
      return params.value + "B"; // Menampilkan nilai data dalam miliar
    } else if (params.value !== 0) {
      return params.value; // Menampilkan nilai data
    } else {
      return ""; // Menampilkan label kosong jika nilai data adalah 0
    }
  },
})

const option = ref({
  title: {
    text: props.chartTitle
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: "shadow"
    }
  },
  legend: {
    data: props.legendData
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: props.xAxisData
  },
  yAxis: {
    type: 'value'
  },
  series: []
});

option.value.series.push({
  name: props.seriesName,
  type: 'bar',
  label : labelOption,
  data: props.seriesData
})




</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
