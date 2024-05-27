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
    <CCol>
      <CRow class="mb-0">
      <YearlyWidget  v-for="(icon, index) in widgetProps.iconA"
      :key="index"
      :icon="icon"  
      :color="widgetProps.colorA[index]"
      :title="widgetProps.titleA[index]"
      :value="valueA[index]"
      />
      </CRow> 
    </CCol>
    <CCol>
      <CRow class="mb-0">
        <YearlyWidget v-for="(icon, index) in widgetProps.iconB" 
        :key="index" :size="4"
        :icon="icon"
        :color="widgetProps.colorB[index]"
        :title="widgetProps.titleB[index]"
        :value="valueB[index]"
        />
      </CRow>
    </CCol>
  </CRow>
  <CRow>
    <YearlyChart 
      :seriesData="[
        fiscalProduction.ok, 
        fiscalProduction.ng, 
        fiscalProduction.dummy,
        fiscalProduction.reject_setting
        ]"
      :seriesName="['Good Product', 'RIP', 'Dummy', 'Reject Setting' ]"
      :xAxis="fiscalProduction.year_month"
      :legend="['Good Product', 'RIP', 'Dummy', 'Reject Setting' ]"
      :chartTitle="selectedMachine"
      xAxisName="Pin"
      chartType="line"
      
      :colorSeries="['rgba(64, 165, 120, 0.7)', 'rgba(238, 66, 102, 0.7)', 'rgba(51, 153, 255, 0.7)', 'rgba(255, 210, 63, 0.7)']"
    />
    <YearlyChart 
      :seriesData="[
        fiscalProduction.production_time, 
        fiscalProduction.stop_time,
        fiscalProduction.dandori_time
        ]"
      :seriesName="['Production Time', 'Stop Time', 'Dandori Time']"
      :xAxis="fiscalProduction.year_month"
      :legend="['Production Time', 'Stop Time', 'Dandori Time']"
      :chartTitle="selectedMachine"
      xAxisName="Minutes"
      chartType="line"
      :colorSeries="['rgba(64, 165, 120, 0.7)', 'rgba(238, 66, 102, 0.7)', 'rgba(255, 210, 63, 0.7)', 'rgba(238, 114, 20, 0.7)']"
    />
  </CRow>
</template>


<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import MachineSelector from '../daily_weekly/MachineSelector.vue';
import YearSelector from './YearSelector.vue';
import YearlyChart from './YearlyChart.vue';
import YearlyWidget from './YearlyWidget.vue';
import axios from 'axios';


const widgetProps = {
  iconA : ['cil-check','cil-x-circle','cil-trash','cil-settings'],
  colorA : ['success', 'danger', 'info', 'warning'],
  titleA: ['Good Product','RIP','Dummy','Reject Setting'],
  iconB : ['cil-clock','cil-av-timer','cil-settings'],
  colorB : ['success', 'danger', 'warning'],
  titleB: ['Production Time', 'Stop Time', 'Dandori Time'],
}

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

const valueA = computed(() => [
  totalArray(fiscalProduction.value.ok),
  totalArray(fiscalProduction.value.ng),
  totalArray(fiscalProduction.value.dummy),
  totalArray(fiscalProduction.value.reject_setting),
]);

const valueB = computed(() => [
  totalArray(fiscalProduction.value.production_time),
  totalArray(fiscalProduction.value.stop_time),
  totalArray(fiscalProduction.value.dandori_time),
]);


const ppm = computed(() => [
  totalArray(fiscalProduction.value.ok),
  calculatePPM(totalArray(fiscalProduction.value.ng),totalArray(fiscalProduction.value.ok)),
  calculatePPM(totalArray(fiscalProduction.value.dummy),totalArray(fiscalProduction.value.ok)),
  calculatePPM(totalArray(fiscalProduction.value.reject_setting),totalArray(fiscalProduction.value.ok))
])
// hitung ppm
const calculatePPM = (a, b) => {
  a = Number(a.replace(/,/g, ''));
  b = Number(b.replace(/,/g, ''));
  const ppm = Math.round(a / (a + b) * 1000000);
  return isNaN(ppm) ? '0' : ppm.toLocaleString();
};


onMounted(()=>{
  fetchFiscalProduction(selectedYear.value, selectedMachine.value)
})

watch([selectedYear, selectedMachine], ([newYear, newMachine]) => {
  fetchFiscalProduction(newYear, newMachine)
})

const fetchFiscalProduction = async(selectedYear, selectedMachine) => {
  try {
    const response = await axios.get(`http://192.168.148.125:5000/productions/fiscal?year=${selectedYear}&id_machine=${selectedMachine}`)
    fiscalProduction.value = response.data.data
  } catch (error) {
    console.error('Error fetching production data:', error);
  }
}

const totalArray = (numbers) => {
  return numbers.reduce((sum, value) => sum + value, 0).toLocaleString();
}
</script>



<style scoped>
.row{
  margin-bottom: 1rem;
}
</style>