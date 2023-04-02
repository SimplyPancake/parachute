<template>
	<h1 class="nameText">Bekijk het schema voor deze maand </h1>
	<!-- button to clear -->
	<!-- add a card -->
	<el-card class="big-card">
		<el-table-v2 :columns="columns" :data="data" :width="700" :height="400" fixed />
	</el-card>
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { Dish } from '@element-plus/icons-vue'
import { useAccountStore } from '@/stores/account';
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute();
const accountStore = useAccountStore();

// get params
let groupdId = route.params.groupId;


// Column: dataKey, key, title, width
// Row: column0, column1, column2, column3, column4, column5, column6, column7, column8, column9, id, parentId

</script>

<style scoped>

</style>