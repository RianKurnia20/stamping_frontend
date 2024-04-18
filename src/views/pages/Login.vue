<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="email"
                      type="email"
                      placeholder="E-mail"
                      floatingLabel="E-mail"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      floatingLabel="Password"
                    />
                  </CInputGroup>
                  <CRow v-if="errorMessage">
                    <p class="error-message">{{ errorMessage }}</p>
                  </CRow>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="login()" > Login </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h1>Sign up</h1>
                  <p>
                    Tell developer for new access account to this site 
                    or hit button bellow to register by your self.
                  </p>
                  <router-link to="/pages/register">
                    <CButton color="light" variant="outline" class="mt-3">
                      Register Now!
                    </CButton>
                  </router-link>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const errorMessage = ref('')

    const login = async () => {
      try {
          const response = await axios.post('http://192.168.148.125:5000/auth/login', {
            email: email.value,
            password: password.value
          });

          // Handle respons dari API jika login berhasil
          // this.token = response.data.token
          Cookies.set('jwt_token', response.data.token, { expires: 1 });
          // Contoh: redirect ke halaman dashboard jika login berhasil
          router.push('/live_dashboard');
        } catch (error) {
          // Handle error jika login gagal
          errorMessage.value = error.response.data.message || 'An error occurred during login.';
          console.error(error);
        }
    }
    return {
      email,
      password,
      login,
      errorMessage
    };
  }
}
</script>

<style>
.error-message{
  font-size: small;
  color: red;
}
</style>