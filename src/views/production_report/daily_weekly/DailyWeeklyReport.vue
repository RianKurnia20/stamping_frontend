<template>
  <CCard style="margin-bottom: 10px;">
    <CCardBody>
      <CRow>
        <CCol xs="8">
          <h3>Production Report</h3>
        </CCol>
        <CCol xs="2">
          <MachineSelector v-model="selectedMachine"/>
        </CCol>
        <CCol xs="2">
          <DateSelector v-model="selectedDate"/>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
  <!-- Good Product & NG -->
  <CRow>
    <MultiChart 
      :seriesData="[productionData.shift1.ok, productionData.shift2.ok, sumArrays(productionData.shift1.ok, productionData.shift2.ok)]"
      :seriesName="['Shift 1', 'Shift 2', 'Total']"
      :xAxis="productionData.date_range"
      :legend="['Shift 1', 'Shift 2', 'Total']"
      chartTitle="Good Product"
    />
    <MultiChart 
      :seriesData="[productionData.shift1.ng, productionData.shift2.ng, sumArrays(productionData.shift1.ng, productionData.shift2.ng)]"
      :seriesName="['Shift 1', 'Shift 2', 'Total']"
      :xAxis="productionData.date_range"
      :legend="['Shift 1', 'Shift 2', 'Total']"
      chartTitle="NG Product"
    />
  </CRow>
  <!-- Stop Time & Production Time -->
  <CRow>
    <MultiChart 
      :seriesData="[productionData.shift1.stop_time, productionData.shift2.stop_time, sumArrays(productionData.shift1.stop_time, productionData.shift2.stop_time)]"
      :seriesName="['Shift 1', 'Shift 2', 'Total']"
      :xAxis="productionData.date_range"
      :legend="['Shift 1', 'Shift 2', 'Total']"
      chartTitle="Stop Time"
    />
    <MultiChart 
      :seriesData="[productionData.shift1.production_time, productionData.shift2.production_time, sumArrays(productionData.shift1.production_time, productionData.shift2.production_time)]"
      :seriesName="['Shift 1', 'Shift 2', 'Total']"
      :xAxis="productionData.date_range"
      :legend="['Shift 1', 'Shift 2', 'Total']"
      chartTitle="Production Time"
    />
  </CRow>
  <!-- Reject Setting & Dummy -->
  <CRow>
    <MultiChart 
      :seriesData="[productionData.shift1.reject_setting, productionData.shift2.reject_setting, sumArrays(productionData.shift1.reject_setting, productionData.shift2.reject_setting)]"
      :seriesName="['Shift 1', 'Shift 2', 'Total']"
      :xAxis="productionData.date_range"
      :legend="['Shift 1', 'Shift 2', 'Total']"
      chartTitle="Reject Setting"
    />
    <MultiChart 
      :seriesData="[productionData.shift1.dummy, productionData.shift2.dummy, sumArrays(productionData.shift1.dummy, productionData.shift2.dummy)]"
      :seriesName="['Shift 1', 'Shift 2', 'Total']"
      :xAxis="productionData.date_range"
      :legend="['Shift 1', 'Shift 2', 'Total']"
      chartTitle="Dummy"
    />
  </CRow>

</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import MultiChart from './MultiChart.vue'
import DateSelector from './DateSelector.vue';
import MachineSelector from './MachineSelector.vue';
import axios from 'axios';

const selectedMachine = ref('STAMPING LINE 1');
const productionData = ref({
  date_range: [],
  shift1: {
    ok: [],
    ng: [],
    reject_setting: [],
    dummy: [],
    production_time: [],
    stop_time: [],
    dandori_time: []
  },
  shift2: {
    ok: [],
    ng: [],
    reject_setting: [],
    dummy: [],
    production_time: [],
    stop_time: [],
    dandori_time: []
  }
})


const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); 
const selectedDate = ref([
  startDate.toISOString().split('T')[0],
  endDate.toISOString().split('T')[0]
]);


watch([selectedMachine, selectedDate], ([newMachineValue, newDateValue]) => {
  fetchDataProduction(formatDateArray(newDateValue), newMachineValue)
});

onBeforeMount(() => {
  fetchDataProduction(selectedDate.value, selectedMachine.value)
})

// merubah format date selector menjadi YYYY-MM-DD
const formatDateArray = (dates) => {
  return dates.map(dateString => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
  });
}

const sumArrays = (a1, a2) => a1.map((value, index) => value + a2[index]);


const fetchDataProduction = async (selectedDate, selectedMachine) => {
  try {
    const [startDate, endDate] = selectedDate; // Destructure array selectedDate menjadi startDate dan endDate
    const url = `http://localhost:5000/productions/date?date_start=${startDate}&date_end=${endDate}&id_machine=${selectedMachine}`;
    const response = await axios.get(url);
    productionData.value = response.data.data
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