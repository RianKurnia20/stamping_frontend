<template>
  <VueDatePicker 
    v-model="date" 
    range
    max-range="60" 
    min-range="6" 
    :enable-time-picker="false" 
    vertical 
    placeholder="Select Date Here"
    :teleport="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , 2);
const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); 
const formattedStartDate = startDate.toISOString().split('T')[0]; 
const formattedEndDate = endDate.toISOString().split('T')[0]; 
const date = ref([formattedStartDate, formattedEndDate]);

</script>