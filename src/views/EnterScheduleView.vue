<template>
	<h1 class="nameText">Welke dagen kan je koken?</h1>
	<h3>
		Klik 1x = <el-tag class="mx-1" size="large">Kan niet<el-icon><close-bold /></el-icon></el-tag>
		2x = <el-tag class="mx-1" size="large">Koken<el-icon>
				<dish />
			</el-icon></el-tag>
		3x = <el-tag class="mx-1" size="large">Liever niet👎</el-tag>
		4x = <el-tag class="mx-1" size="large">Graag👍</el-tag>
		<el-button class="clearButton" @click="clearOptions()" primary>Clear opties</el-button>
	</h3>
	<!-- button to clear -->
	<el-calendar v-model="dateInfo"
		:range="[new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)]">
		<template #date-cell="{ data }">
			<p :class="getDayType(data.day) == 'disabled' ? 'disabled' : ''">
				<!-- Display day number -->
				{{ data.day.split('-')[2] }}

				<!-- If day type is not available -->
			<div class="option">
				<el-icon v-if="getDayType(data.day) == 'cantJoinDay'">
					<close-bold />
				</el-icon>
				<el-icon v-if="getDayType(data.day) == 'kookingDay'">
					<dish />
				</el-icon>
				<el-icon v-if="getDayType(data.day) == 'dontLikeDay'" class="emoji-option">
					👎
				</el-icon>
				<el-icon v-if="getDayType(data.day) == 'likeDay'" class="emoji-option">
					👍
				</el-icon>
			</div>
			</p>
		</template>
	</el-calendar>
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { Dish } from '@element-plus/icons-vue'
import { SemiSelect } from '@element-plus/icons-vue'
import { Select } from '@element-plus/icons-vue'
let dateInfo = ref(new Date())
let choices = ref([])
let now = new Date()

// fill choices array with 0's of length 31
for (let i = 0; i < 31; i++) {
	choices.value.push(0)
}

function clearOptions() {
	choices.value = choices.value.map(() => 0)
}

function getDayType(dayString) {
	// parse int day
	let day = dayString.split('-')[2]
	day = parseInt(day)
	let date = new Date(dayString)

	// first check for days that are not in the current month
	if (dateInfo.value.getMonth() !== date.getMonth()) {
		return 'disabled'
	}

	// If the day is a friday, saturday or sunday
	if (date.getDay() === 5 || date.getDay() === 6 || date.getDay() === 0) {
		return 'disabled'
	}

	// If the day is in the cookDays array
	let options = ['neutral', 'cantJoinDay', 'kookingDay', 'dontLikeDay', 'likeDay']

	return options[choices.value[day - 1]]
}


watch(dateInfo, (newVal, oldVal) => {
	if (newVal) {
		let date = new Date(newVal)
		let day = date.getDate()

		// set the day in the choices array to the next value module 5 (0,1,2,3,4)
		choices.value[day - 1] = (choices.value[day - 1] + 1) % 5
		// day == 3 means 3rd of the month
	}
});
</script>

<style scoped>
.nameText {
	background: #FFEE00;
	background: linear-gradient(to left, #FFEE00 0%, #CF00C8 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.is-selected {
	color: #1989fa;
}

.disabled {
	/* disabled dark mode */
	color: #5b5c5d;
}

.option {
	color: #d416b6;
}

.emoji-option {
	color: transparent;
	text-shadow: 0 0 0 #d416b6;
}

.clearButton {
	margin-left: 10px;
}

.el-tag {
	color: #fff;
	background: #5e0f52;
	--el-tag-border-color: #5e0f52;
}
</style>