<template>
	<h1>Welke dagen kan je koken?</h1>
	<h3>Klik 1x om te <span class="emphasis">niet koken</span> en druk twee keer op een datum om te <span
			class="emphasis">koken</span>
	</h3>
	<el-calendar>
		<template #date-cell="{ data }">
			<p :class="data.isSelected ? 'is-selected' : ''" @click="console.log(data.day)">
				{{ data.day.split('-').slice(1).join('-') }}
				{{ data.isSelected ? '✔️' : '' }}
			</p>
		</template>
	</el-calendar>
</template>

<script setup>
import { ref } from 'vue'
let notAvailableDays = ref([])
let cookDays = ref([])
</script>

<style scoped>
.emphasis {
	/* Make italic */
	font-style: italic;
}

.is-selected {
	color: #1989fa;
}
</style>