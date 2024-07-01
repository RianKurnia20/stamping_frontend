<template>
  <CCard class="border-dark">
    <CCardBody>
      <CRow class="d-flex justify-content-between align-items-center">
        <CCol class="big-font" sm="6">
          {{ cardName }}
        </CCol>
        <CCol sm="auto">
          <CIcon
            icon="cil-settings"
            size="xl"
            class="hover-icon"
            @click="toggleStatus()"
          />
        </CCol>
      </CRow>
      <CRow>
        <template v-for="(item, index) in props.item" :key="index">
          <ShootBar
            :barName="item[0]"
            :shootCount="item[1]"
            :barTarget1="item[2]"
            :barTarget2="item[3]"
            :toggleIcon="toggleIcon"
            :lastMaintenance="getLastMaintenance(item[0])"
          >
          </ShootBar>
        </template>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script setup>
import ShootBar from './ShootBar.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
const props = defineProps({
  item: Array,
  cardName: String,
})
const lastMaintenance = ref([])
const toggleIcon = ref(false)

const toggleStatus = () =>{
  toggleIcon.value = !toggleIcon.value;
}

onMounted(() => {
  fetchData(props.cardName)
})

const getLastMaintenance = (partName) => {
  const maintenance = lastMaintenance.value.find((item) => item.part === partName)
  return maintenance ? maintenance.created_at : 'No Record'
}

const fetchData = async (id_machine) => {
  try {
    const response = await axios.get(
      `http://192.168.148.125:5000/maintenance_part?id_machine=${id_machine}`,
    )
    lastMaintenance.value = response.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>

<style scoped>
.big-font {
  font-size: 1.8rem;
  font-weight: 600;
  font-family: Oswald;
}

.normal-font {
  font-size: 1rem;
  font-weight: 600;
  font-family: Oswald;
}
.hover-icon {
  transition: color 0.1s;
}

.hover-icon:hover {
  color: #0026ff; /* Ganti dengan warna yang Anda inginkan */
}
</style>
