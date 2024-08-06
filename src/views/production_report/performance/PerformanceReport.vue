<template>
  <CContainer fluid>
    <CRow class="mb-2">
      <CCol xs="8">
        <h3>Performance Report</h3>
      </CCol>
      <CCol xs="2">
        <MachineSelector v-model="selectedMachine" />
      </CCol>
      <CCol xs="2">
        <MonthSelector v-model="selectedMonth" />
      </CCol>
    </CRow>
  </CContainer>
  <CRow>
    <MultiChart
      :seriesData="[dailyOee.daily_oee.availability, dailyOee.daily_oee.productivity,dailyOee.daily_oee.quality, dailyOee.daily_oee.oee]"
      :seriesName="['Availability','Productivity','Quality','OEE']"
      :xAxis="dailyOee.date_range"
      :legend="['Availability','Productivity','Quality','OEE']"
      chartTitle="Daily OEE"
      xAxisName="Percent"
      :colSize="9"
      :height="40"
    />
    <GaugeChart 
    :height="40"
    :oeeValue="totalOee"
    />
  </CRow>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import MachineSelector from '../daily_weekly/MachineSelector.vue'
import MonthSelector from '../monthly/MonthSelector.vue'
import MultiChart from '../daily_weekly/MultiChart.vue'
import GaugeChart from './GaugeChart.vue'
import axios from 'axios'

const selectedMachine = ref('STAMPING LINE 1')
const selectedMonth = ref({ month: new Date().getMonth(), year: new Date().getFullYear() })
const dailyOee = ref({
  date_range: [],
  daily_oee:{
    oee:[],
    availability:[],
    productivity:[],
    quality:[]
  }
})
const totalOee = ref({
  availability: 0,
  oee : 0,
  productivity: 0,
  quality : 0
})

watch([selectedMachine, selectedMonth], ([newMachine, newMonth]) =>{
  fetchDailyOee(newMachine, newMonth.year, newMonth.month)
  fetchMonthlyOee(newMachine, newMonth.year, newMonth.month)
})

onBeforeMount( async () => {
  await fetchDailyOee(selectedMachine.value, selectedMonth.value.year, selectedMonth.value.month)
  await fetchMonthlyOee(selectedMachine.value, selectedMonth.value.year, selectedMonth.value.month)
  console.log(totalOee.value)
})

const fetchDailyOee = async(machine, year, month) => {
  try {
    const url = `http://192.168.148.125:5000/productions/date/oee?year=${year}&month=${month+1}&id_machine=${machine}`
    const response = await axios.get(url)
    dailyOee.value = response.data.data
  } catch (error) {
    console.error('Error fetching oee data: ', error)
  }
}


const fetchMonthlyOee = async(machine, year, month) =>{
  try {
    const url = `http://192.168.148.125:5000/productions/monthly/oee?year=${year}&month=${month+1}&id_machine=${machine}`
    const response = await axios.get(url)
    totalOee.value = response.data.data[0]
  } catch (error) {
    console.error('Error fetching oee data: ',error)
  }
}
</script>

<style scoped>
.row {
  margin-bottom: rem;
}
</style>
