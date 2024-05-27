<template>
  <div class="container-card-monitoring">
    <CCard class="mb-0">
      <CCardBody :class="[cardClasses, 'card-body-monitoring']">
        <CRow class="mb-3">
          <CCol sm="4" class="big-font d-flex">{{ props.item[0] }}</CCol>
          <CCol sm="6" class="normal-font text-end">Kanagata: <span v-for="(value, index) in props.item[5]" :key="index" class="small-font">{{ value }}</span></CCol>
          <CCol sm="2" class="small-font text-end">
            <CSpinner size="sm"/> {{ props.item[1] }}
          </CCol>
        </CRow>
        <CRow class="mb-2">
          <CCol class="normal-font">
          {{ props.item[4][0] }}
          </CCol>
          <CCol  v-if="props.item[4][1]" class="normal-font" >
          {{ props.item[4][1] }}
          </CCol>
        </CRow>
        <CRow class="mb-2">
          <CCol sm="4" class="normal-font">Status Machine: <span class="small-font">{{ props.item[2] }}</span></CCol>
          <CCol sm="5" class="normal-font">Output/Target: <span class="small-font">{{props.item[6].toLocaleString()}} pin / {{ props.item[7].toLocaleString() }} pin</span></CCol>
          <CCol sm="3" class="normal-font">Kadoritsu: <span class="small-font">{{ props.item[11] }}</span></CCol>
        </CRow>
        <CRow class="mb-2">
          <CCol sm="4" v-if="props.item[2] == 'STOP'" class="normal-font">Stop Cause: <span class="small-font">{{props.item[3]}}</span></CCol>
          <!-- <CCol sm="4" v-else class="normal-font">Speed: <span class="small-font">{{props.item[14]}}</span></CCol> -->
          <CCol sm="4" v-else class="normal-font">Speed: 
            <span class="small-font" v-if="showSpeed">{{ speedPerMinute/2*10 }} SPM</span>
          </CCol>
          <CCol sm="5" v-if="props.item[2] == 'STOP'" class="normal-font">Clocking Stop: <span class="small-font">{{ props.item[8] }}</span></CCol>
          <CCol sm="5" v-else class="normal-font">Production Time: <span class="small-font">{{props.item[10].toLocaleString()}}</span></CCol>
          <CCol sm="3" class="normal-font">Bekidoritsu: <span class="small-font">{{props.item[12]}}</span></CCol>
        </CRow>
        <CRow class="mb-2">
          <CCol class="normal-font">Alarm: </CCol>
          <CCol sm="5" class="normal-font text-right">Dandori Time: <span class="small-font">{{ props.item[15] }}</span></CCol>
          <CCol sm="3" class="normal-font">Stop Time: <span class="small-font">{{props.item[9].toLocaleString()}}</span></CCol>
        </CRow>
        <CRow class="mb-0"> 
          <CCol v-if="props.item[13].length != 0" style="font-size: .8rem; font-weight: 600; font-family: Arial, Helvetica, sans-serif;">{{props.item[13]}}</CCol>
          <CCol v-else style="font-size: .8rem; font-weight: 00; font-family: Arial, Helvetica, sans-serif;">[ No Alarm Detected ]</CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <FooterCardDashboard :machine="props.item[0]"/>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import FooterCardDashboard from './FooterCardDashboard.vue';

const props = defineProps({
  item: Array
});


const previousOutput = ref(0);
const differences = ref([]);
const speedPerMinute = ref(0);
const showSpeed = ref(false)


watch(() => props.item, (newItem) => {
  if (newItem.length > 6) {
    const currentOutput = newItem[6];
    
    // Calculate the difference
    const difference = currentOutput - previousOutput.value;
    previousOutput.value = currentOutput;
    
    // Add the difference to the array of differences
    differences.value.push(difference);
    
    // Remove the oldest entry if there are more than 60
    if (differences.value.length > 60) {
      differences.value.shift();
      showSpeed.value = true
    }
    
    // Calculate the speed per minute
    speedPerMinute.value = differences.value.reduce((acc, val) => acc + val, 0);
    // console.log(speedPerMinute.value*10/2)
  }
});

const cardClasses = computed(() => {
  const bgClass = {
    'RUN': 'bg-success',
    'STOP': 'bg-danger',
    'SETTING': 'bg-warning'
  };
  return bgClass[props.item[2]];
});

</script>


<style scoped>
.container-card-monitoring{
  border: 0.5px solid black;
  cursor: pointer;
}

.card-body-monitoring{
  font-family: Oswald;
  font-size: 20px;
}

.big-font{
  font-size: 2rem;
  font-weight: 700;
  transform: scaleY(2);
}

.normal-font{
  font-size: 1.2rem;
  font-weight: 700;
  transform: scaleY(1.2);
}

.small-font{
  font-size: 1rem;
  font-weight: 400;
}

.product-font{
  font-size: 1.2rem;
  font-weight: 600;
}
</style>