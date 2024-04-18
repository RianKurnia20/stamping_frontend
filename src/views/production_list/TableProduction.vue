<template>
      <div class="col-sm-2 mb-2">
        <CFormInput size="sm" type="text" id="searchData" v-model="search" placeholder="Search"/>
      </div>
    <div>
        <vue3-datatable :rows="rows" :columns="cols" :loading="loading" :sortable="true" skin="bh-table-hover bh-table-bordered bh-table-compact" :search="search">
            <template #id="data">
                <strong>{{ data.id_production }}</strong>
            </template>
            <template #actions="data">
                <div class="flex gap-4">
                    <CButton size="sm" class="btn-primary" style="margin: 0.1rem;" @click="editItem(data.value)" v-if="userRole !== 'viewer'"><CIcon icon="cil-pencil" /></CButton>
                </div>
            </template>
        </vue3-datatable>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import { ref, onMounted, getCurrentInstance, watch } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import '@bhplugin/vue3-datatable/dist/style.css';
    import formatDate from '@/middleware/LocaleDate';


      const instance = getCurrentInstance();
      const search = ref('')
      const props = defineProps(['userRole', 'eventTable'])

      onMounted(() => {
        fetchData();
      });

      watch(() => props.eventTable.refreshProduction, (newValue) => {
        if (newValue) {
          fetchData();
          // eslint-disable-next-line vue/no-mutating-props
          props.eventTable.refreshProduction = false;
          instance.emit('close')
          instance.emit('notif')
        }
      });

      const loading = ref(true);
      const data = ref([])
      const pageSize = ref()
      const rows = ref(null);

      const cols =
          ref([
              { field: 'id_production', title: 'ID', isUnique: true },
              { field: 'date', title: 'Date' },
              { field: 'id_machine', title: 'Machine'},
              { field: 'id_kanagata', title: 'Kanagata'},
              { field: 'id_product', title: 'DP Code'},
              { field: 'name', title: 'Product Name'},
              { field: 'shift', title: 'Shift'},
              { field: 'ok', title: 'Good Product' },
              { field: 'ng', title: 'RIP' },
              { field: 'reject_setting', title: 'Reject Setting' },
              { field: 'dummy', title: 'Dummy' },
              { field: 'production_time', title: 'Production Time' },
              { field: 'stop_time', title: 'Stop Time' },
              { field: 'dandori_time', title: 'Dandori Time' },
              { field: 'actions', title: 'Actions', sort:false },
          ]) || [];
      
      const fetchData = () => {
        axios.get('http://192.168.148.125:5000/productions')
          .then(response => {
            const formattedData = response.data.data.map(item => ({
              ...item,
              date: formatDate(item.date),
            }));
            data.value = formattedData;
            rows.value = formattedData; // Assign formatted data to rows
            loading.value = false; // Update loading status after data is fetched
            pageSize.value = formattedData.length
          })
          .catch(error => {
            console.log('Error fetching data:', error);
            loading.value = false; // Update loading status in case of error
          });
      };


      const editItem = (item) => {
      instance.emit('edit-item', item);
    };
</script>