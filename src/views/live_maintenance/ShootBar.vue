<template>
  <CCol style="margin: .5rem; padding: .6rem; border-radius: .4rem;" :class="barStatus">
    <CRow class="bar-name">
      <CCol class="text-center" style="font-size: large; margin-bottom: .5rem; font-family: Arial, Helvetica, sans-serif; font-weight: 700;">
        {{ barName }}
      </CCol>
    </CRow>  
    <CRow>
      <CCol class="bar-name" style="font-weight: 700;">
        Actual Shoot
      </CCol>
      <CCol class="bar-name text-end" style="font-weight: 700;">
        {{ shootCount.toLocaleString() }}
      </CCol>
    </CRow>
    <CRow>
      <CCol class="bar-name" style="font-weight: 700;">
        Target 1
      </CCol>
      <CCol class="bar-name text-end" style="font-weight: 700;">
        {{ barTarget1.toLocaleString() }}
      </CCol>
    </CRow>
    <CRow>
      <CCol class="bar-name" style="font-weight: 700;">
        Target 2
      </CCol>
      <CCol class="bar-name text-end" style="font-weight: 700;">
        {{ barTarget2.toLocaleString() }}
      </CCol>
    </CRow>
    <CProgress :height="25"  variant='striped' animated :color="colorBar" :value="barValue">{{ barValue }}%</CProgress>
  </CCol>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  barName:  {
    type:String,
    default:'Actual Shoot'
  },
  shootCount: {
    type:Number,
    default:0
  },
  barTarget1:  {
    type:Number,
    default:0
  },
  barTarget2:  {
    type:Number,
    default:0
  },

})
const colorBar = ref('dark')

const barValue = computed(() => {
  return props.barTarget2 ? parseFloat((props.shootCount / props.barTarget2 * 100).toFixed(1)) : 0;
});

const barStatus = computed(() => {
  if (props.shootCount < props.barTarget1) {
    return 'bg-success';
  } 
  if (props.shootCount < props.barTarget2) {
    return 'bg-warning';
  } 
  if (props.shootCount === props.barTarget1 || props.shootCount === props.barTarget2) {
    return 'bg-light';
  } 
  return 'bg-danger';
});


</script>

<style scoped>
.bar-name{
  font-size: .8rem;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: .2rem;
}
</style>