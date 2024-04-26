<template>
  <CContainer fluid>
    <CRow>
      <CCol xs="8">
        <h3>Performance Report</h3>
      </CCol>
      <CCol xs="2">
        <MachineSelector v-model="selectedMachine"/>
      </CCol>
      <CCol xs="2">
        <MonthSelector v-model="selectedMonth"/>
      </CCol>
    </CRow>
  </CContainer>
</template>


<script setup>
import { ref } from 'vue';
import MachineSelector from '../daily_weekly/MachineSelector.vue';
import MonthSelector from '../monthly/MonthSelector.vue';


const selectedMachine = ref('STAMPING LINE 1');
const selectedMonth = ref({month: new Date().getMonth(), year: new Date().getFullYear()});

</script>



<style scoped>
</style>