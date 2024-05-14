<template>
  <CContainer fluid>
    <CRow>
      <CCol xs="8">
        <h3>Yearly Report</h3>
      </CCol>
      <CCol xs="2">
        <MachineSelector v-model="selectedMachine"/>
      </CCol>
      <CCol xs="2">
        <YearSelector v-model="selectedYear"/>
      </CCol>
    </CRow>
  </CContainer>
  <CRow>
    <MultiChart 
      :seriesData="[
        fiscalProduction.ok, 
        fiscalProduction.ng, 
        fiscalProduction.dummy,
        fiscalProduction.reject_setting
        ]"
      :seriesName="['Good Product', 'RIP', 'Dummy', 'Reject Setting' ]"
      :xAxis="fiscalProduction.year_month"
      :legend="['Good Product', 'RIP', 'Dummy', 'Reject Setting' ]"
      chartTitle="All Stamping Machine"
      xAxisName="Pin"
      chartType="line"
      :colorSeries="['#0C9463', '#D04848', '#FDE767', '#F3B95F']"
    />
    <MultiChart 
      :seriesData="[
        fiscalProduction.production_time, 
        fiscalProduction.stop_time,
        fiscalProduction.dandori_time
        ]"
      :seriesName="['Production Time', 'Stop Time', 'Dandori Time']"
      :xAxis="fiscalProduction.year_month"
      :legend="['Production Time', 'Stop Time', 'Dandori Time']"
      chartTitle="All Stamping Machine"
      xAxisName="Minutes"
      chartType="line"
      :colorSeries="['#0C9463', '#D04848', '#FDE767', '#F3B95F']"
    />
  </CRow>
  <CRow>
  </CRow>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import MachineSelector from '../daily_weekly/MachineSelector.vue';
import YearSelector from './YearSelector.vue';
import MultiChart from '../daily_weekly/MultiChart.vue';
import axios from 'axios';

const selectedMachine = ref('STAMPING LINE 1');
const selectedYear = ref(new Date().getFullYear());
const fiscalProduction = ref({
  ok: [],
  ng: [],
  reject_setting: [],
  dummy: [],
  production_time: [],
  stop_time: [],
  dandori_time: [],
  year_month : []
})

onMounted(()=>{
  fetchFiscalProduction(selectedYear.value)
})

const fetchFiscalProduction = async(selectedYear) => {
  try {
    const response = await axios.get(`http://192.168.148.125:5000/productions/fiscal?year=${selectedYear}`)
    fiscalProduction.value = response.data.data
    console.log(response.data.data)
  } catch (error) {
    console.error('Error fetching production data:', error);
  }
}
</script>



<style scoped>
.row{
  margin-bottom: 1rem;
}
</style>