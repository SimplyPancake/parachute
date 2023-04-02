<template>
	<main>
		<h1>Welkom, <span class="nameText">{{ name }}</span>
		</h1>
		<h3>Je zit in {{ kookGroup }}</h3>

		<ThisWeek />
		<el-divider>
			<el-icon><knife-fork /></el-icon>
		</el-divider>
		<ThisMonth />
		<el-divider>
			<el-icon><knife-fork /></el-icon>
		</el-divider>
	</main>
</template>

<script setup>
import ThisWeek from '../components/ThisWeekSchedule.vue'
import ThisMonth from '../components/ThisMonthSchedule.vue'
import { KnifeFork } from '@element-plus/icons-vue'
import { useAccountStore } from '@/stores/account'
import { ref, reactive, computed } from 'vue'
const accountStore = useAccountStore()

const name = ref(accountStore.userName)
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
