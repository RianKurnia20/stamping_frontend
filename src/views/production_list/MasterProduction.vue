<template>
  <CContainer fluid style="margin-bottom: 1rem;">
    <h3>Production List</h3>
  </CContainer>
  <CCard>
    <CCardBody>
      <TableProduction @edit-item="handleEditDeleteItem" @delete-item="handleEditDeleteItem" @close="closeModal" @notif="showToast('success', 'Success Updating Data')" :userRole="userRole" :eventTable="eventTable"/>
    </CCardBody>
  </CCard>
    <ModalProduction :visible="modalVisible" :item="selectedItem" @close="closeModal" :eventTable="eventTable"/>
    <ToastNotif :color="toastColor" :body="toastBody" :toastVisible="toastVisible"/>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import ToastNotif from '@/components/ToastNotif.vue'
import TableProduction from './TableProduction.vue';
import ModalProduction from  './ModalProduction.vue';
import checkRoles from '@/middleware/CheckRoles'
import eventTable from '@/store/table'

export default {
  components: {
    TableProduction,
    ModalProduction,
    ToastNotif
  },
  setup() {
    const modalVisible = ref(false);
    const selectedItem = ref(null);
    const userRole = ref('');
    const toastColor = ref('')
    const toastBody = ref('')
    const toastVisible = ref(false)

    // Fungsi untuk memeriksa peran pengguna saat komponen dimuat
    const getUserRole = async () => {
      try {
        userRole.value = await checkRoles();
      } catch (error) {
        console.error('Error checking roles:', error.message);
      }
    };

    onBeforeMount(() => {
      getUserRole();
    });

    const openModal = (item) => {
      selectedItem.value = item;
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    const handleEditDeleteItem = (item) => {
      openModal(item);
    };

    const showToast = (color, body) => {
      toastVisible.value = true
      toastColor.value= color
      toastBody.value= body
      setTimeout(() => {
        toastVisible.value = false;
      }, 5000);
    }
    
    return {
      modalVisible,
      selectedItem,
      openModal,
      closeModal,
      handleEditDeleteItem,
      userRole,
      eventTable,
      showToast,
      toastBody,
      toastColor,
      toastVisible
    };
  }
};
</script>
