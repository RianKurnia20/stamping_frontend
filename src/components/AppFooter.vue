<template>
  <CFooter class="px-4">
    <div>
      Rian Kurniawan
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }}</span
      >
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Powered by</span>
      <a href="/">CoreUI for Vue</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
