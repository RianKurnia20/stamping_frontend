<template>
  <CContainer fluid>
    <CRow class="mb-2">
      <CCol xs="8">
          <h3>Machine History</h3>
      </CCol>
      <CCol xs="2" >
        <MachineSelector v-model="selectedMachine" />
      </CCol>
      <CCol xs="2" >
        <DateSelector v-model="selectedDate" minRange="2"/>
      </CCol>
    </CRow>
  </CContainer>
  <CRow class="mb-2">
    <!-- <CCol> -->
      <CCard>
        <CCardBody>
          <TableHistoryMachine :rowsData="machineHistory" :colsData="cols1" tableTitle="Log Status Machine"/>
        </CCardBody>
      </CCard>
    <!-- </CCol>
    <CCol> -->
      </CRow>
      <CRow>
      <CCard>
        <CCardBody>
          <TableHistoryMachine :rowsData="logMaintenance" :colsData="cols2" tableTitle="History Maintenance Kanagata Part"/>
        </CCardBody>
      </CCard>
    <!-- </CCol> -->
  </CRow>
</template>

<script setup>
import { ref, onBeforeMount, watch, onMounted } from 'vue';
import MachineSelector from '../production_report/daily_weekly/MachineSelector.vue'
import checkRoles from '@/middleware/CheckRoles'
import TableHistoryMachine from './TableHistoryMachine.vue';
import DateSelector from '../production_report/daily_weekly/DateSelector.vue';
import axios from 'axios';

const selectedMachine = ref('STAMPING LINE 1');
const machineHistory = ref([])
const logMaintenance = ref([])
const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); 

const selectedDate = ref([
  startDate.toISOString().split('T')[0],
  endDate.toISOString().split('T')[0]
]);

const cols1 =
    ref([
        { field: 'id_machine', title: 'Machine'},
        { field: 'status', title: 'Status'},
        { field: 'stop_condition', title: 'Stop Condition'},
        { field: 'duration', title: 'Duration (min)'},
        { field: 'start', title: 'Start'},
        { field: 'end', title: 'End' }
    ]) || [];

const cols2 =
    ref([
        { field: 'created_at', title: 'Date'},
        { field: 'id_machine', title: 'Machine'},
        { field: 'part', title: 'Kanagata Part'}
    ]) || [];



const userRole = ref('')
onBeforeMount(() => {
  getUserRole();
});

onMounted(()=>{
  fetchFinalStatusMachine(selectedDate.value, selectedMachine.value)
  fetchMaintenancePart(selectedDate.value, selectedMachine.value)
})

watch([selectedDate, selectedMachine],([newDate, newMachine]) => {
  fetchFinalStatusMachine(formatDateArray(newDate), newMachine)
  fetchMaintenancePart(formatDateArray(newDate), newMachine)
})


const getUserRole = async () => {
  try {
    userRole.value = await checkRoles();
  } catch (error) {
    console.error('Error checking roles:', error.message);
  }
};

const fetchFinalStatusMachine = (date, machine) => {
  axios.get(`http://192.168.148.125:5000/final_status/date?date_start=${date[0]}&date_end=${date[1]}&machine=${machine}`)
  .then(response => {
    const formattedData = response.data.data
    machineHistory.value = formattedData;
    })
  .catch(error => {
    console.log('Error fetching data:', error);
    });
}


const fetchMaintenancePart = (date, machine) => {
  axios.get(`http://192.168.148.125:5000/maintenance_part/date?date_start=${date[0]}&date_end=${date[1]}&id_machine=${machine}`)
  .then(response => {
    const formattedData = response.data.data
    logMaintenance.value = formattedData;
    })
  .catch(error => {
    console.log('Error fetching data:', error);
    });
}

const formatDateArray = (dates) => {
  return dates.map(dateString => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
  });
}


</script>


<style scoped>
</style>
