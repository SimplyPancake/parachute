<template>
	<el-row>
		<el-col :span="20" :offset="2">
			<!-- Show the current page with breadcrumbs -->
			<el-page-header v-if="router.currentRoute.value.fullPath != '/'" @back="goHome" style="margin-top: 1em;">
				<template #content>
					<span class="text-large font-600 mr-3"> {{ router.currentRoute.value.name }} </span>
				</template>
			</el-page-header>
			<RouterView />
		</el-col>
	</el-row>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';
const router = useRouter();

function goHome() {
	router.push('/')
}
</script>

<style scoped>

</style>
