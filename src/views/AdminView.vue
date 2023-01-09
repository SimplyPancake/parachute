<template>
	<main>
		<h1>Welkom, <span class="nameText">{{ name }}</span>
		</h1>
		<h3>Je zit in {{ kookGroup }}</h3>

		<!-- Element ui plus card with cooking groups list that can be modified-->
		<el-card>
			<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
		</el-card>
	</main>
</template>

<script setup>
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
