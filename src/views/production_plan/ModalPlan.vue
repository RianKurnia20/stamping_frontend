<template>
<CModal alignment="center" :visible="visible" @close="handleClose">
  <CModalHeader>
    <CModalTitle>{{ mode === 'update' ? 'Edit' : mode === 'delete' ? 'Delete' : 'Add' }} Planing Production</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <p v-if="mode === 'delete'" style="font-style: italic;font-weight: 400;">Are you sure want to delete this production plan data ?</p>
    <CForm>
      <CFormSelect
      floatingLabel="PCA Data"
      :options="pcaOptions" 
      class="form-input"
      size="sm"
      v-model="idPca"
      :disabled="mode === 'delete'"
      />
      <CFormInput
        type="text"
        id="qty"
        floatingLabel="Quantity"
        placeholder="Quantity"
        aria-describedby="exampleFormControlInputHelpInline"
        size="sm"
        class="form-input"
        v-model="qty"
        :disabled="mode === 'delete'"
      />
      <CFormSelect
      floatingLabel="Shift"
      :options="[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ]" 
      class="form-input"
      size="sm"
      v-model="shift"
      :disabled="mode === 'delete'"
      />
      <VueDatePicker 
        v-model="dateStart"  
        :enable-time-picker="true" 
        vertical 
        placeholder="Production Start Time"
        style="margin-bottom: 1rem;"
        :format="formatDate"
        :disabled="mode === 'delete'"
      />
      <VueDatePicker 
        v-model="dateEnd"  
        :enable-time-picker="true" 
        vertical 
        placeholder="Production End Time"
        style="margin-bottom: 1rem;"
        :format="formatDate"
        :disabled="mode === 'delete'"
      />
    </CForm>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" @click="handleClose" variant="outline">Close</CButton>
    <CButton variant="outline"
      :color="mode === 'update' ? 'primary' : mode === 'delete' ? 'danger' : 'success'" 
      @click="mode === 'update' ? updatePlan() : mode === 'delete' ? deletePlan() : addPlan()"
      >
        {{ mode === 'update' ? 'Update' : mode === 'delete' ? 'Delete' : 'Save' }}
      </CButton>
  </CModalFooter>
</CModal>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';


const emit = defineEmits(['close'])
const mode = ref('create')
const pcaOptions = ref([])
const dateStart = ref()
const dateEnd = ref()
const idPca = ref('11')
const idPlan = ref(null)
const qty = ref(0)
const shift = ref('1')

const props = defineProps({
  visible: {
      type: Boolean,
      default: false 
    },
  item:Object,
  eventTable:Object,
})

watch(() => props.item, (newValue) => {
  if(newValue){
    idPlan.value = newValue.id_plan
    if(newValue.mode === 'delete'){
      mode.value = 'delete'
      fetchPlanData(newValue.id_plan)
    }else{
      mode.value = 'update'
      fetchPlanData(newValue.id_plan)
    }
  }else{
    mode.value = 'create' 
  }
})

onMounted(async () => {
  pcaOptions.value = await fetchPcaData()
})

const handleClose = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  qty.value = 0
  shift.value=1
  dateStart.value = new Date()
  dateEnd.value = new Date()
  idPca.value = 11
  idPlan.value = null
}

const addPlan = async () =>{
  try {
    const response = await axios.post('http://192.168.148.125:5000/plan', {
      id_pca: idPca.value,
      qty : qty.value,
      shift : shift.value,
      date_start : formatDate(dateStart.value),
      date_end : formatDate(dateEnd.value)
    })
    // eslint-disable-next-line vue/no-mutating-props
    props.eventTable.refreshPlan = true
    resetForm()
  } catch (error) {
    const errorMessage = error.response.data.message
    console.log(errorMessage)
    console.error(error)
  }
}

const updatePlan = async () =>{
  try {
    console.log(dateEnd.value, dateStart.value)
    const response = await axios.patch(`http://192.168.148.125:5000/plan/${idPlan.value}`,{
      id_pca: idPca.value,
      qty: qty.value,
      shift: shift.value,
      start: formatDate(dateStart.value),
      end: formatDate(dateEnd.value)
    })
    // eslint-disable-next-line vue/no-mutating-props
    props.eventTable.refreshPlan = true
    resetForm()
  } catch (error) {
    console.error(error)
  }
}

const deletePlan = async () =>{
  try {
    const response = await axios.delete(`http://192.168.148.125:5000/plan/${idPlan.value}`)
    // eslint-disable-next-line vue/no-mutating-props
    props.eventTable.refreshPlan = true
    resetForm()
  } catch (error) {
    console.error(error)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const  minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// fetching option for PCA data
const fetchPcaData = async () => {
  try {
    const response = await axios.get(`http://192.168.148.125:5000/pca`)
    const data = response.data.data
    const options = data.map(item => ({
      label : item.id_machine + ' | ' + item.name + ' | ' + item.id_kanagata,
      value : item.id_pca
    }))
    return options
  } catch (error) {
    console.error(`Error fetching PCA data`, error)
    return []
  }
}

// fetching for update and delete
const fetchPlanData = async (id_plan) => {
  try {
    const response = await axios.get(`http://192.168.148.125:5000/plan?id_plan=${id_plan}`)
    const data = response.data.data[0]
    idPca.value = data.id_pca
    shift.value = data.shift
    qty.value= data.qty
    dateStart.value = data.start
    dateEnd.value = data.end
    console.log(data)
  } catch (error) {
    console.error('Error fetching plan data', error)
  }
}

</script>