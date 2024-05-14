<template>
  <!-- <CContainer> -->
    <CRow class="mb-2">
      <CCol :col="12" :md="8">
        <CCard class="mb-2">
          <CCardBody>
            <h5>Column 1 (12/8)</h5>
            <p>Some content here.</p>
            <SubGrid />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol :col="6" :md="4">
        <CCard class="mb-2">
          <CCardBody>
            <h5>Column 2 (6/4)</h5>
            <p>Some content here.</p>
            <SubGrid />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol :col="6" :md="4">
        <CCard class="mb-2">
          <CCardBody>
            <h5>Column 3 (6/4)</h5>
            <p>Some content here.</p>
            <SubGrid />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol :col="12" :md="8">
        <CCard class="mb-2">
          <CCardBody>
            <h5>Column 4 (12/8)</h5>
            <p>Some content here.</p>
            <SubGrid />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  <!-- </CContainer> -->
</template>

<script setup>
import { CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/vue'
import SubGrid from './SubGrid.vue'
</script>

<style scoped>
/* Tambahkan gaya kustom di sini jika diperlukan */
</style>
