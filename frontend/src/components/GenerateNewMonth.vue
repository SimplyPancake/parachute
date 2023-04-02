<template>
	<!-- Kookgroepen select in kolom-->
	<el-row :gutter="20">
		<el-col :xs="24" :md="24" style="padding-bottom:20px;">
			<el-select v-if="groupsloaded" v-model="selectedGroup" placeholder="Kookgroep">
				<el-option v-for="group in kookgroepen" :key="group.id" :label="group.GroupName"
					:value="group.GroupName">
				</el-option>
			</el-select>
		</el-col>
		<el-col :xs="12" :md="8">
			<!-- Button to select next month -->
			<el-button type="primary" @click="nextMonth">Volgende maand</el-button>
		</el-col>
		<el-col :xs="12" :md="8">
			<el-select v-model="selectedMonth" placeholder="Maand">
				<el-option v-for="item in months" :key="item.number" :label="item.name" :value="item.name">
				</el-option>
			</el-select>
		</el-col>
		<el-col :xs="12" :md="8">
			<el-select v-model="selectedYear" placeholder="Jaar">
				<el-option v-for="item in years" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</el-col>
	</el-row>
	<!--  -->
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useAccountStore } from '@/stores/account';
import { ElMessage } from 'element-plus'

const accountStore = useAccountStore();

// Get kookgroepen from database
let kookgroepen = reactive()
let groupsloaded = ref(false)
let selectedGroup = ref()

let selectedYear = ref()
let selectedMonth = ref()

let nextMonth = () => {
	let date = new Date()
	let month = date.getMonth() + 1
	let year = date.getFullYear()
	if (month == 12) {
		month = 1
		year += 1
	} else {
		month += 1
	}
	selectedMonth.value = months.value[month - 1].name
	selectedYear.value = year
}

// Years ranging from a few years before current, to a few after
let years = computed(() => {
	let currentYear = new Date().getFullYear()
	let years = []
	for (let i = currentYear - 2; i < currentYear + 5; i++) {
		years.push(i)
	}
	return years
})

// months with name of the month and number
// name must be in dutch
let months = computed(() => {
	return [
		{ name: "Januari", number: 1 },
		{ name: "Februari", number: 2 },
		{ name: "Maart", number: 3 },
		{ name: "April", number: 4 },
		{ name: "Mei", number: 5 },
		{ name: "Juni", number: 6 },
		{ name: "Juli", number: 7 },
		{ name: "Augustus", number: 8 },
		{ name: "September", number: 9 },
		{ name: "Oktober", number: 10 },
		{ name: "November", number: 11 },
		{ name: "December", number: 12 },
	]
})

accountStore.getKookGroups().then((groups) => {
	kookgroepen = groups
	console.log(kookgroepen)
	groupsloaded.value = true
})

</script>

<style scoped>

</style>