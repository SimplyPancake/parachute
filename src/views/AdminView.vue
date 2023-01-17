<template>
	<main>
		<h1>Welkom, <span class="nameText">{{ name }}</span></h1>
		<!-- manually edit kookrooster -->
		<!-- element card -->
		<h2>Gebruikers</h2>
		<UsersList style="max-height: 40vh;"></UsersList>

		<el-divider>
			<el-icon><knife-fork /></el-icon>
		</el-divider>

		<el-row :gutter="20">
			<el-col xs="24" :md="12">
				<el-card style="margin-bottom: 20px;">
					<h2>Geen zin in het kutrooster? Wijzig het!</h2>
					<el-button type="primary" size="large">Wijzig rooster</el-button>
				</el-card>
			</el-col>

			<el-col xs="24" :md="12">
				<el-card>
					<h2>Huts neef wil jij een nieuwe genereren?</h2>
					<GenerateNewMonth />
				</el-card>
			</el-col>
		</el-row>
	</main>
</template>

<script setup>
import { useAccountStore } from '@/stores/account';
import { ref, reactive, computed } from 'vue';
import { KnifeFork } from '@element-plus/icons-vue';
import UsersList from '../components/UsersList.vue';
import GenerateNewMonth from '../components/GenerateNewMonth.vue';
const accountStore = useAccountStore();

const name = ref(accountStore.userName);
const kookGroup = ref(accountStore.kookGroup);
</script>

<style scoped>
.nameText {
	background: #FFEE00;
	background: linear-gradient(to left, #FFEE00 0%, #CF00C8 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.el-dropdown-menu__item {
	--el-dropdown-menuItem-hover-color: #FFEE00;
}

.el-dropdown-menu__item:not(.is-disabled):focus {
	color: #FFEE00 !important;
}
</style>
