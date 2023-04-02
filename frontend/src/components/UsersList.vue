<template>
	<!-- Element card with element table of users -->
	<el-card>
		<el-row :gutter="20">
			<el-col :span="4">
				<h2>Gebruikers</h2>
			</el-col>
			<el-col :span="20">
				<el-button type="primary" size="large">Gebruiker toevoegen</el-button>
			</el-col>
		</el-row>
		<el-table v-if="showTable" :data="usersData" table-layout="auto">
			<el-table-column prop="name" label="Naam" width="" />
			<el-table-column prop="kookgroep" label="Kookgroep" width="" />
			<el-table-column prop="kookpoints" label="Kookpunten" width="" />
			<el-table-column prop="id" label="id" />
			<el-table-column label="Is admin" width="">
				<template #default="scope">
					{{ scope.row.isAdmin ? "Ja" : "Nee" }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="Operations" width="">
				<template #default="scope">
					<el-button v-if="scope.row.isAdmin" link type="primary" size="small" @click="handleClick">Maak
						unadmin</el-button>
					<el-button v-else link type="primary" size="small">Maak admin</el-button>
					<br>
					<el-button link type="primary" size="small">Wijzig kookgroep</el-button>
					<el-button link type="primary" size="small">Wijzig naam</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script setup>
import { useAccountStore } from '@/stores/account'
import { ref, reactive, computed } from 'vue'
const accountStore = useAccountStore()

// Then get the users from the database
let usersData = reactive()
let showTable = ref(false)

accountStore.getUsers().then((users) => {
	console.log(users)
	usersData = users
	showTable.value = true
})
</script>

<style scoped>

</style>