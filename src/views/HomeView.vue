<template>
	<main>
		<h1>Welkom, <span class="nameText">Daniel</span></h1>
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
</script>

<style scoped>
.nameText {
	background: #FFEE00;
	background: linear-gradient(to left, #FFEE00 0%, #CF00C8 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
