<template>
  <div>
    <CTable hover bordered responsive striped v-if="tableData.length!=0" class="master-table">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">No</CTableHeaderCell>
          <CTableHeaderCell scope="col">ID Kanagata</CTableHeaderCell>
          <CTableHeaderCell scope="col">Actual Shot</CTableHeaderCell>
          <CTableHeaderCell scope="col">Limit Shot</CTableHeaderCell>
          <CTableHeaderCell scope="col">Created</CTableHeaderCell>
          <CTableHeaderCell scope="col">Updated</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(data, index) in tableData" :key="index">
          <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ data.id_kanagata }}</CTableDataCell>
          <CTableDataCell>{{ data.actual_shot }}</CTableDataCell>
          <CTableDataCell>{{ data.limit_shot }}</CTableDataCell>
          <CTableDataCell>{{ data.created_at }}</CTableDataCell>
          <CTableDataCell>{{ data.updated_at }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="primary" style="margin: 0.1rem;" @click="editItem(data)"><CIcon icon="cil-pencil" /></CButton>
            <CButton size="sm" class="btn-danger" style="margin: 0.1rem;" @click="deleteItem(data)"><CIcon icon="cil-trash" /></CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <div v-else class="no-data">
      No Data Available
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, getCurrentInstance } from 'vue';
import formatDate from '@/middleware/LocaleDate';
// import store from '../../store';

export default {
  name: 'KanagataTables',
  setup() {
    const tableData = ref([]);
    const instance = getCurrentInstance();

    const fetchData = () => {
      axios.get('http://192.168.148.125:5000/kanagata')
        .then(response => {
          const formattedData = response.data.data.map(item => ({
            ...item,
            created_at: formatDate(item.created_at),
            updated_at: formatDate(item.updated_at)
          }));
          tableData.value = formattedData;
        })
        // .catch(error => {
        //   console.log('Error fetching data:', error);
        // });
    };

    const editItem = (item) => {
      instance.emit('edit-item', item);
    };

    const deleteItem = (item) => {
      const deleteItem = { ...item, mode: 'delete' };
      instance.emit('delete-item', deleteItem);
    };

    onMounted(fetchData);

    return {
      tableData,
      editItem,
      deleteItem
    };
  }
};
</script>