<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <span class="clearfix">
            <h1 class="float-start display-3 me-4">403</h1>
            <h4 class="pt-3">Guard, we have a problem!</h4>
            <p class="text-body-secondary float-start">
              It's Guarded by an Authorized Personnel Only. Please contact
            </p>
          </span>
          <router-link to="/live_dashboard">
            <CButton color="primary">Back to dashboard</CButton>
          </router-link>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Page403',
}
</script>
