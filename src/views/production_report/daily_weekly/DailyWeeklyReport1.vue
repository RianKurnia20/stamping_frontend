<template>
  <CCard>
    <CCardHeader>
      <CRow>
        <CCol xs="8">
          <h3>Production Report</h3>
        </CCol>
        <CCol xs="2">
          <CFormSelect
            aria-label="Default select example"
            :options="idMachine"
            v-model="selectedMachine"
          />
        </CCol>
        <CCol xs="2">
          <VueDatePicker 
            v-model="date" 
            range
            max-range="30" 
            min-range="6" 
            :enable-time-picker="false" 
            vertical 
            placeholder="Select Date Here"
          />
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <MultiChart 
        chartTitle="Production Data" 
        :chartData="dataProduction"
      />
    </CCardBody>
    <ToastNotif :body="toastProps.body" :toastVisible="toastProps.toastVisible" :delay="toastProps.delay" :color="toastProps.color"/>
  </CCard>
</template>

<script setup>
  import { ref, watch, onBeforeMount, onBeforeUnmount } from 'vue'
  import MultiChart from './MultiChart.vue'
  import ToastNotif from '@/components/ToastNotif.vue'
  import axios from 'axios';

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , 2);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); 
  const formattedStartDate = startDate.toISOString().split('T')[0]; 
  const formattedEndDate = endDate.toISOString().split('T')[0]; 
  const date = ref([formattedStartDate, formattedEndDate]);

  const dataProduction = ref({})
  const idMachine = ref()
  const selectedMachine = ref('STAMPING LINE 1')
  const toastProps = ref({
    body : 'Success get data from server 👌',
    toastVisible : false,
    delay : 2000,
    color : 'primary'
  })
  
  onBeforeMount(() => {
    fetchDataMachine();
    fetchDataProduction(selectedMachine.value, date.value); 
  });

  onBeforeUnmount(() => {
    dataProduction.value = {}
    idMachine.value = []
  })

  watch([date, selectedMachine], ([newDate, newMachine]) => {
    const selectedRange = formatDateArray(newDate)
    fetchDataProduction(newMachine,selectedRange)
    toastProps.value.toastVisible = false
    toastProps.value.body = 'Success get data from server 👌'
    toastProps.value.color= 'primary'
  });

  const formatDateArray = (dates) => {
      return dates.map(dateString => {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          return `${year}-${month}-${day}`;
      });
  }
  

  const fetchDataProduction = (id_machine,date) => {
    axios.get(`http://192.168.148.125:5000/productions/date?id_machine=${id_machine}&date_start=${date[0]}&date_end=${date[1]}`)
      .then(response => {
        if(response.data.message != 'Success'){
          toastProps.value.body= response.data.message+' 🤦‍♂️',
          toastProps.value.color = 'danger'
        }
        dataProduction.value = response.data.data;
        toastProps.value.toastVisible = true
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const fetchDataMachine = () => {
    axios.get('http://192.168.148.125:5000/machine')
      .then(response => {
        const formattedData = response.data.data.map(item => ({
          label: item.id_machine,
          value: item.id_machine
        }));
        idMachine.value = formattedData
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };
</script>