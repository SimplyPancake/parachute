<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<el-row>
		<el-col :span="20" :offset="2">
			<RouterView />
		</el-col>
	</el-row>
</template>

<style scoped>

</style>
