<template>
  <CCard class="border-dark">
    <CCardBody>
      <CRow>
        <CCol class="big-font">
          {{ cardName }}
        </CCol>
      </CRow>
      <CRow>
        <template v-for="(item, index) in props.item" :key="index">
          <ShootBar :barName="item[0]" :shootCount="item[1]" :barTarget1="item[2]" :barTarget2="item[3]"/>
        </template>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script setup>
import ShootBar from './ShootBar.vue';

const props = defineProps({
  item: Array,
  cardName: String
});

console.log(props.item)
</script>


<style scoped>
.big-font{
  font-size: 1.8rem;
  font-weight: 600;
  font-family: Oswald;
}

.normal-font{
  font-size: 1rem;
  font-weight: 600;
  font-family: Oswald;
}
</style>