<template>
  <div class="container-card-monitoring">
    <CCard class="mb-0">
      <CCardBody class="bg-warning card-body-monitoring">
        <CRow class="mb-3">
          <CCol sm="4" class="big-font">STAMPING LINE 10</CCol>
          <CCol sm="2" class="small-font text-center">
            <CSpinner size="sm"/> Disconnected</CCol>
          <CCol sm="6" class="normal-font text-right">153705-1-01 41 / {{ props.item[0] }}</CCol>
        </CRow>
        <CRow class="mb-2">
          <CCol sm="4" class="normal-font">Status Machine: <span class="small-font">{{ props.item[3] }}</span></CCol>
          <CCol sm="5" class="normal-font">Output/Target: <span class="small-font">1.000.000/15.000.000 </span></CCol>
          <CCol sm="3" class="normal-font text-right">Kanagata: <span class="small-font">50662-1</span></CCol>
        </CRow>
        <CRow class="mb-2">
          <CCol sm="4" class="normal-font">Stop Cause: <span class="small-font">Cutterpunch NG</span></CCol>
          <CCol sm="5" class="normal-font">Clocking Stop: <span class="small-font">12 day 21 hour 31 min 11 sec</span></CCol>
          <CCol sm="3" class="normal-font">Stop Time: <span class="small-font">1.001 min</span></CCol>
        </CRow>
        <CRow>
          <CCol sm="3" class="normal-font">Speed: <span class="small-font">1.000 SPM</span></CCol>
          <CCol sm="3" class="normal-font">Bekidoritsu: <span class="small-font">40,0%</span></CCol>
          <CCol sm="3" class="normal-font">Kadoritsu: <span class="small-font">{{ (props.item[1]/props.item[2] * 100).toFixed(1) }}%</span></CCol>
          <CCol sm="3" class="normal-font">Prod Time: <span class="small-font">1.011 min</span></CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CContainer class="footer-card-monitoring mb-0">
      <CRow>
        <CCol class="small-font judul-footer-card" >Production S1</CCol>
        <CCol class="xsmall-font judul-footer-card" >Product Name</CCol>
        <CCol class="small-font judul-footer-card" >Production S2</CCol>
        <CCol class="xsmall-font judul-footer-card" >Product Name</CCol>
      </CRow>
      <CRow>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Output S1</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">RIP S1</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Stop Time S1</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Output S2</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">RIP S2</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Stop Time S2</CCol>
      </CRow>
      <CRow>
        <CCol class="xsmall-font text-center">1.200.000 pin</CCol>
        <CCol class="xsmall-font text-center">1000 pin / 25 ppm</CCol>
        <CCol class="xsmall-font text-center">30 min</CCol>
        <CCol class="xsmall-font text-center">1.200.000 pin</CCol>
        <CCol class="xsmall-font text-center">1000 pin / 25 ppm</CCol>
        <CCol class="xsmall-font text-center">30 min</CCol>
      </CRow>
      <CRow>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Prod Time S1</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Reject Setting S1</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Dandori Time S1</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Prod Time S2</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Reject Setting S2</CCol>
        <CCol class="xsmall-font text-center" style="font-weight: 700;">Dandori Time S2</CCol>
      </CRow>
      <CRow>
        <CCol class="xsmall-font text-center">1.200.000 pin</CCol>
        <CCol class="xsmall-font text-center">1000 pin / 25 ppm</CCol>
        <CCol class="xsmall-font text-center">30 min</CCol>
        <CCol class="xsmall-font text-center">1.200.000 pin</CCol>
        <CCol class="xsmall-font text-center">1000 pin / 25 ppm</CCol>
        <CCol class="xsmall-font text-center">30 min</CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>

const props = defineProps({
  item: Object
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

.footer-card-monitoring{
  padding: 1rem;
}

.big-font{
  font-size: 1.6rem;
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

.xsmall-font{
  font-size: 0.8rem;
  font-weight: 400;
}

.judul-footer-card{
  font-weight: 700; 
  transform: scaleY(1.2);
}
</style>