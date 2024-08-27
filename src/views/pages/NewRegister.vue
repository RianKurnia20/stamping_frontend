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
        <CImage :src="hrs" :height="70" class="mb-3" />
        <div class="form-login-wrapper">
          <CForm @submit="newUser" novalidate :validated="validateForm">
            <h3 style="font-family: Arial, Helvetica, sans-serif;" class="mb-1">IoT Stamping</h3>
            <p class="text-body-secondary">Fill this form for register your account</p>
              <CFormInput
                floatingLabel="Username"
                placeholder="Username"
                autocomplete="username"
                v-model="username"
                required
                feedbackInvalid="Please choose a username."
                class="mb-2"
                size="sm"
              />
              <CFormInput
                floatingLabel="Email"
                type="email"
                placeholder="Email"
                autocomplete="email"
                v-model="email"
                required
                feedbackInvalid="Please enter a valid email address."
                class="mb-2"
                size="sm"
              />
              <CFormInput
                floatingLabel="Password"
                type="password"
                placeholder="Password"
                autocomplete="new-password"
                v-model="password"
                required
                feedbackInvalid="Make a strong password"
                class="mb-2"
                size="sm"
              />
              <CFormInput
                floatingLabel="Repeat Password"
                type="password"
                placeholder="Repeat password"
                autocomplete="new-password"
                v-model="repeatPassword"
                required
                feedbackInvalid="Passwords do not match. Please try again"
                class="mb-3"
                size="sm"
              />
            <div class="d-grid">
              <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
              <CButton type="submit" class="regist-button mb-2" size="sm" style="color: white; background-color:  #264d8e;">Create Account</CButton>
            </div>
          </CForm>
        </div>
        <span class="text-secondary" style="font-size: small;"
            >Already have an account, go to 
            <a class="register-link" @click="toLogin()">login</a></span
          >
      </div>
    </div>
  </div>
  <ToastNotif :color="toastColor" :body="toastBody" :toastVisible="toastVisible" placement="top-end" :dissmisible="false"/>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import hrs from '@/assets/images/hirose.png';
import ToastNotif from '@/components/ToastNotif.vue';

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const repeatPassword = ref('');
const validateForm = ref(null);
const toastColor = ref('')
const toastBody = ref('')
const toastVisible = ref(false)

const newUser = async (event) => {
  if (password.value !== repeatPassword.value) {
    errorMessage.value = "Password and repeat password do not match.";
    return;
  }

  const form = event.currentTarget;
  console.log(form);
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  validateForm.value = true;

  try {
    const response = await axios.post('http://192.168.148.125:5000/users/signup', {
      username: username.value,
      email: email.value,
      password: password.value
    });
    console.log(response.data);
    showToast('success', 'Registration success wait we will redirect you to login page')
    setTimeout(() => {
      toLogin();
    }, 3000);
  } catch (error) {
    if (Array.isArray(error.response.data.message)) {
      errorMessage.value = error.response.data.message[0].msg;
    } else {
      errorMessage.value = error.response.data.message;
    }
    console.error(error);
  }
};

const toLogin = () => {
  router.push('/login');
};

const showToast = (color, body) => {
  toastVisible.value = true
  toastColor.value= color
  toastBody.value= body
  setTimeout(() => {
    toastVisible.value = false;
  }, 3000);
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
