<template>
  <CContainer fluid>
    <CRow>
      <CCol xs="9">
        <h3>Production Plan</h3>
      </CCol>
      <CCol xs="2" >
        <MachineSelector v-model="selectedMachine"/>
      </CCol>
      <CCol xs="1" >
        <CButton :disabled="userRole ==='viewer'"  color="success" variant="outline" @click="openModal(null)">
            New Plan
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <div class="schedule-calendar">
    <ScheduleCalendar @edit-event="openModal" @delete-event="openModal" :eventTable="eventTable" @close="closeModal" :userRole="userRole"/>
  </div>
  <ModalPlan :visible="modalVisible" :item="selectedItem" @close="closeModal" :eventTable="eventTable"/>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import ScheduleCalendar from './ScheduleCalendar.vue';
import MachineSelector from '../production_report/daily_weekly/MachineSelector.vue'
import { CContainer } from '@coreui/vue';
import ModalPlan from './ModalPlan.vue';
import checkRoles from '@/middleware/CheckRoles'
import eventTable from '@/store/table';

const modalVisible = ref(false);
const selectedMachine = ref('STAMPING LINE 1');
const selectedItem = ref({});

const userRole = ref('')

onBeforeMount(() => {
  getUserRole();
});

const openModal = (item) => {
  modalVisible.value = true
  selectedItem.value = item
};

const closeModal = () => {
  modalVisible.value = false;
};

const getUserRole = async () => {
  try {
    userRole.value = await checkRoles();
  } catch (error) {
    console.error('Error checking roles:', error.message);
  }
};

</script>



<style scoped>
.schedule-calendar {
  height: 80vh;
  width:100%
}
.container-fluid{
  margin-bottom: .5rem;
}
</style>