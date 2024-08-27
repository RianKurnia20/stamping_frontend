<template>
  <div class="login-page">
    <!-- Video Section -->
    <div class="video-section">
      <div class="video-wrapper">
        <video autoplay muted loop class="video-content">
          <source src="@/assets/videos/hirose.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <!-- Login Form Section -->
    <div class="login-form-section">
      <div class="login-form-content">
          <CImage :src="hrs" :height="70"  class="mb-3" />
          <div class="form-login-wrapper">
            <CForm class="mb-4">
              <h3 style="font-family: Arial, Helvetica, sans-serif;" class="mb-1">IoT Stamping</h3>
              <p class="text-body-secondary">Login to your account</p>
              <CInputGroup class="mb-2">
                <CInputGroupText>
                  <CIcon icon="cil-user" />
                </CInputGroupText>
                <CFormInput
                  v-model="email"
                  type="email"
                  placeholder="E-mail"
                  floatingLabel="E-mail"
                  size="sm"
                />
              </CInputGroup>
              <CInputGroup class="mb-2">
                <CInputGroupText>
                  <CIcon icon="cil-lock-locked" />
                </CInputGroupText>
                <CFormInput
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  floatingLabel="Password"
                  @keyup.enter="login()"
                  size="sm"
                />
              </CInputGroup>
              <p class="error-message" style="text-align: left">{{ errorMessage }}</p>
              <div class="d-grid gap-2">
                <CButton style="background-color: #264d8e; color: white;" @click="login()"> Login </CButton>
              </div>
            </CForm>
          </div>
          <span class="text-secondary" style="font-size: small;"
            >Tell developer for new access account to this site. or register by your self
            <a class="register-link" @click="register()">here</a></span
          >
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import hrs from '@/assets/images/hirose.png'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')

const login = async () => {
  try {
    const response = await axios.post(
      'http://192.168.148.125:5000/auth/login',
      {
        email: email.value,
        password: password.value,
      },
      // {
      //   withCredentials: true, // Ensure cookies are sent and received
      // },
    )

    // Handle respons dari API jika login berhasil
    // this.token = response.data.token
    Cookies.set('jwt_token', response.data.token, { expires: 24, sameSite: 'lax' })
    // Contoh: redirect ke halaman dashboard jika login berhasil
    router.push('/live_dashboard')
  } catch (error) {
    // Handle error jika login gagal
    errorMessage.value = error.response.data.message || 'An error occurred during login.'
    console.error(error)
  }
}

const register = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  margin: 0; /* Ensure there is no margin on the body */
}

.video-section {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff; /* Warna latar belakang saat video belum dimuat */
  padding-left: 0px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.video-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.video-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 10px; /* Remove padding to avoid space issues */
  text-align: center;
}

.login-form-content {
  width: 100%;
  max-width: 320px;
}

.register-link:hover {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

</style>
