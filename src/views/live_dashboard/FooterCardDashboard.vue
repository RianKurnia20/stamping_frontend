<template>
  <CContainer class="footer-card-monitoring mb-0">
    <CRow v-if="shift1 && shift2">
      <CCol sm='2' class="small-font judul-footer-card" >Shift 1</CCol>
      <CCol sm="4" class="xsmall-font judul-footer-card text-end" >{{ shift1.product_name && shift1.id_product ? `${shift1.product_name} [${shift1.id_product}]` : 'No Production' }}</CCol>
      <CCol sm='2' class="small-font judul-footer-card" >Shift 2</CCol>
      <CCol sm="4" class="xsmall-font judul-footer-card text-end" >{{ shift2.product_name && shift2.id_product ? `${shift2.product_name} [${shift2.id_product}]` : 'No Production' }}</CCol>
    </CRow>
    <CRow>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Output S1</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">RIP S1</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Stop Time S1</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Output S2</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">RIP S2</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Stop Time S2</CCol>
    </CRow>
    <CRow v-if="shift1 && shift2">
      <CCol class="xsmall-font text-center">{{shift1.ok.toLocaleString()}} pin</CCol>
      <CCol class="xsmall-font text-center">{{shift1.ng.toLocaleString()}} pin / 25 ppm</CCol>
      <CCol class="xsmall-font text-center">{{shift1.stop_time.toLocaleString()}} min</CCol>
      <CCol class="xsmall-font text-center">{{shift2.ok.toLocaleString()}} pin</CCol>
      <CCol class="xsmall-font text-center">{{shift2.ng.toLocaleString()}} pin / 25 ppm</CCol>
      <CCol class="xsmall-font text-center">{{shift2.stop_time.toLocaleString()}} min</CCol>
    </CRow>
    <CRow>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Dummy S1</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Reject Setting S1</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Dandori Time S1</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Dummy S2</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Reject Setting S2</CCol>
      <CCol class="xsmall-font text-center" style="font-weight: 700;">Dandori Time S2</CCol>
    </CRow>
    <CRow v-if="shift1 && shift2">
      <CCol class="xsmall-font text-center">{{shift1.dummy.toLocaleString()}} pin / 25 ppm</CCol>
      <CCol class="xsmall-font text-center">{{shift1.reject_setting.toLocaleString()}} pin / 25 ppm</CCol>
      <CCol class="xsmall-font text-center">{{shift1.dandori_time.toLocaleString()}} min</CCol>
      <CCol class="xsmall-font text-center">{{shift2.dummy.toLocaleString()}} pin / 25 ppm</CCol>
      <CCol class="xsmall-font text-center">{{shift2.reject_setting.toLocaleString()}} pin / 25 ppm</CCol>
      <CCol class="xsmall-font text-center">{{shift2.dandori_time.toLocaleString()}} min</CCol>
    </CRow>
  </CContainer>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  machine : String
})

const shift1 = ref(null)
const shift2 = ref(null)

onMounted( async () => {
  shift1.value = await lastProduction(props.machine, 1)
  shift2.value = await lastProduction(props.machine, 2)
  console.log(shift1.value)
  console.log(shift2.value)
})

const lastProduction = async (machine, shift) => {
  try {
    const url = `http://192.168.148.125:5000/productions/machine?id_machine=${machine}&shift=${shift}`
    const response = await axios.get(url)
    return response.data.data
  } catch (error) {
    console.error('Error fetching production data:', error);
  }
}

</script>

<style scoped>
.footer-card-monitoring{
  padding: 1rem;
}

.xsmall-font{
  font-size: 0.8rem;
  font-weight: 400;
}

.judul-footer-card{
  font-weight: 700; 
  transform: scaleY(1.2);
}
</style>