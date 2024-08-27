<template>
  <CModal
    :visible="visible"
    @close="$emit('close')"
    aria-labelledby="LiveDemoExampleLabel"
    alignment="center"
  >
    <CModalHeader>
      <CModalTitle id="LiveDemoExampleLabel">Add Production Data</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CForm>
          <CFormSelect
            floatingLabel="PCA Data"
            :options="pcaOptions"
            class="form-input"
            size="sm"
            v-model="id_pca"
          />
          <CFormSelect
            floatingLabel="Plan Data"
            :options="planOptions"
            class="form-input"
            size="sm"
            v-model="id_plan"
            :disabled="planOptions.length === 0"
          />
        </CForm>
      </CRow>
      <CRow>
        <CCol>
          <CForm>
            <CFormInput
              type="text"
              id="ok"
              floatingLabel="Good Product"
              aria-describedby="exampleFormControlInputHelpInline"
              size="sm"
              v-model="ok"
              class="form-input"
            />
            <CFormInput
              type="text"
              id="ng"
              floatingLabel="Reject In Process"
              aria-describedby="exampleFormControlInputHelpInline"
              size="sm"
              v-model="ng"
              class="form-input"
            />
            <CFormInput
              type="text"
              id="productionTime"
              floatingLabel="Production Time"
              aria-describedby="exampleFormControlInputHelpInline"
              size="sm"
              v-model="production_time"
              class="form-input"
            />
          </CForm>
        </CCol>
        <CCol>
          <CForm>
            <CFormInput
              type="text"
              id="rejectSetting"
              floatingLabel="Reject Setting (F-028)"
              aria-describedby="exampleFormControlInputHelpInline"
              size="sm"
              v-model="reject_setting"
              class="form-input"
            />
            <CFormInput
              type="text"
              id="stopTime"
              floatingLabel="Stop Time"
              aria-describedby="exampleFormControlInputHelpInline"
              size="sm"
              v-model="stop_time"
              class="form-input"
            />
            <CFormInput
              type="text"
              id="dandoriTime"
              floatingLabel="Dandori Time"
              aria-describedby="exampleFormControlInputHelpInline"
              size="sm"
              v-model="dandori_time"
              class="form-input"
            />
          </CForm>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" variant="outline" @click="$emit('close')"> Close </CButton>
      <CButton
        variant="outline"
        color="success"
        @click="addProduction()"
        :disabled="id_plan == null"
      >
        Save
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  visible: Boolean,
  eventTable: Object,
})

const pcaOptions = ref([])
const id_pca = ref(11)
const planOptions = ref([])
const id_plan = ref()
const ok = ref(0)
const ng = ref(0)
const reject_setting = ref(0)
const production_time = ref(0)
const stop_time = ref(0)
const dandori_time = ref(0)

const fetchPcaData = async () => {
  try {
    const response = await axios.get(`http://192.168.148.125:5000/pca`)
    const data = response.data.data
    const options = data.map((item) => ({
      label: item.id_machine + ' | ' + item.name + ' | ' + item.id_kanagata,
      value: item.id_pca,
    }))
    return options
  } catch (error) {
    console.error(`Error fetching PCA data`, error)
    return []
  }
}

const fetchIdPlan = async (id_pca) => {
  try {
    const response = await axios.get(`http://192.168.148.125:5000/plan/pca?id_pca=${id_pca}`)
    const data = response.data.data
    const options = data.map((item) => ({
      label: `Qty : ${item.qty.toLocaleString()} | S${item.shift} | Date : ${item.start} to ${item.end}`,
      value: item.id_plan,
    }))
    return options
  } catch (error) {
    console.error(`Error fetching planning data`, error)
  }
}

const addProduction = async () => {
  try {
    await axios.post(`http://192.168.148.125:5000/productions`, {
      production_data: {
        id_pca: id_pca.value,
        id_plan: id_plan.value,
        ok: ok.value,
        ng: ng.value,
        reject_setting: reject_setting.value,
        production_time: production_time.value,
        stop_time: stop_time.value,
        dandori_time: dandori_time.value,
      },
    })
    // eslint-disable-next-line vue/no-mutating-props
    props.eventTable.refreshProduction = true
    resetForm()
  } catch (error) {
    console.error(error)
  }
}

const resetForm = () => {
  id_pca.value = 11
  id_plan.value = null
  ok.value = 0
  ng.value = 0
  reject_setting.value = 0
  production_time.value = 0
  stop_time.value = 0
  dandori_time.value = 0
}

watch(id_pca, async (newIdPca) => {
  if (newIdPca) {
    planOptions.value = await fetchIdPlan(newIdPca)
    planOptions.value.length > 0
      ? (id_plan.value = planOptions.value[0].value)
      : (id_plan.value = null)
  } else {
    planOptions.value = []
  }
})

onMounted(async () => {
  pcaOptions.value = await fetchPcaData()
  planOptions.value = await fetchIdPlan(id_pca.value)
  planOptions.value.length > 0
    ? (id_plan.value = planOptions.value[0].value)
    : (id_plan.value = null)
})
</script>
