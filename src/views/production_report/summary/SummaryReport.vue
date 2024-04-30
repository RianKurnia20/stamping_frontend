<template>
  <CContainer fluid>
    <CRow>
      <CCol xs="10">
        <h3>Summary Report</h3>
      </CCol>
      <CCol xs="2">
        <YearSelector v-model="selectedYear"/>
      </CCol>
    </CRow>
  </CContainer>
</template>


<script setup>
import { ref } from 'vue';
import YearSelector from '../yearly/YearSelector.vue';
import { CContainer } from '@coreui/vue';


const selectedYear = ref(new Date().getFullYear());

</script>



<style scoped>
.container-fluid{
  margin-bottom: 1rem;
}
</style>