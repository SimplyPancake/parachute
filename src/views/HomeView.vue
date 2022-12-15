<template>
	<main>
		<h1>Welkom, <span class="nameText">Daniel</span>
			<!-- Fix tag styling -->
			<el-tag class="ml-2">K2</el-tag>
		</h1>
		<el-dropdown size="large" class="kookGroupDropdown">
			<span class="el-dropdown-link">
				Je bekijkt nu het rooster van K2!
				<el-icon class="el-icon--right">
					<arrow-down />
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>K1</el-dropdown-item>
					<el-dropdown-item>K2</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>

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
import { ArrowDown } from '@element-plus/icons-vue'

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
