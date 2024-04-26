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
    <YearlyChart />
  </CRow>
  <CRow>
    <YearlyChart />
    <YearlyChart />
    <YearlyChart />
  </CRow>
</template>


<script setup>
import { ref } from 'vue';
import MachineSelector from '../daily_weekly/MachineSelector.vue';
import YearSelector from './YearSelector.vue';
import YearlyChart from './YearlyChart.vue'


const selectedMachine = ref('STAMPING LINE 1');
const selectedYear = ref(new Date().getFullYear());

</script>



<style scoped>
.row{
  margin-bottom: 1rem;
}
</style>