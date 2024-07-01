<template>
    <CRow class="mb-2">
        <CCol>
            <h5>{{ props.tableTitle }}</h5>
        </CCol>
        <CCol sm="2">
            <CFormInput size="sm" type="text" id="searchData" v-model="search" placeholder="Search"/>
        </CCol>
    </CRow>
        <vue3-datatable :rows="props.rowsData" :columns="props.colsData" :sortable="true" :pageSize="10" skin="bh-table-hover bh-table-bordered bh-table-compact" :search="search" style="font-size: smaller;"/>
</template>

<script setup>
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import { ref } from 'vue';

const search = ref('')

const props = defineProps({
    rowsData:Array,
    tableTitle:String,
    colsData:Array
})

</script>