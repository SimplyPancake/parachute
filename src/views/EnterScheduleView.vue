<template>
	<h1 class="nameText">{{ beginText }}</h1>
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
	<!-- add a card -->
	<el-card class="big-card">
		<el-calendar v-model="dateInfo" class=".noselect"
			:range="[new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)]">
			<template #date-cell="{ data }">
				<p :class="getDayType(data.day) == 'disabled' ? 'disabled' : ''">
					<!-- Display day number -->
					{{ data.day.split('-')[2] }}

					<!-- If day type is not available -->
					<span class="option">
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
					</span>
				</p>
			</template>
		</el-calendar>
	</el-card>

	<el-result title="Indienen" sub-title="">
		<template #icon>
			<el-image :src="getGif()" style="width: 50%; height: 50%" fit="fill" />
		</template>
		<template #extra>
			<el-button type="primary" @click="submitChoices()">Dien hier je schema in!</el-button>
		</template>
	</el-result>
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { Dish } from '@element-plus/icons-vue'
import { useAccountStore } from '@/stores/account';
import { ElMessage } from 'element-plus'
const accountStore = useAccountStore();
const beginText = ref("Welke dagen kan je koken volgende maand?");
// now = first day of next month
let now = new Date()
now.setMonth(now.getMonth() + 1)
now.setDate(1)
// set to first monday of next month
while (now.getDay() !== 1) {
	now.setDate(now.getDate() + 1)
}

let dateInfo = ref(now)
let choices = ref([])
let clickedOutside = false;
let updated = [];
let receivedData = [];

// fill choices array with 0's of length 31
for (let i = 0; i < 31; i++) {
	choices.value.push(0)
}

let month = now.getMonth() + 1
let year = now.getFullYear()
accountStore.getPreferences(month, year).then((res) => {
	// then convert this data to the choices array
	receivedData = res;

	// check if the size of res is 0
	if (res.length === 0) {
		return
	}

	beginText.value = "Wijzig je schema voor volgende maand"

	// select the result to the choices array
	res.forEach(element => {
		choices.value[element.date.split("-")[2] - 1] = element.preference
	});
})

function clearOptions() {
	choices.value = choices.value.map(() => 0)
	// set changes TODO!
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
		if (clickedOutside) {
			clickedOutside = false;
			return
		}
		let date = new Date(newVal)
		// stop if the month is not the same
		if (date.getMonth() !== oldVal.getMonth()) {
			dateInfo.value = now;
			clickedOutside = true;
			return
		}
		let day = date.getDate()

		// set the day in the choices array to the next value module 5 (0,1,2,3,4)
		choices.value[day - 1] = (choices.value[day - 1] + 1) % 5
		updated.push(day - 1)
		// day == 3 means 3rd of the month
	}
});

// Submit the choices to the backend
function submitChoices() {
	// get an object with a date and the preference (0,1,2,3,4)
	let choicesToSend = choices.value.map((choice, index) => {
		let date = now;
		date.setDate(index + 1)
		return {
			date: date,
			preference: choice
		}
	})

	// send the choices to the backend
	let month = now.getMonth()
	let year = now.getFullYear()
	accountStore.submitPreferences(choicesToSend, updated, month, year)
		.then((response) => {
			ElMessage({
				type: 'success',
				message: 'Je keuzes zijn opgeslagen!'
			})
		}, (error) => {
			ElMessage({
				type: 'error',
				message: 'Er is iets fout gegaan, probeer het later nog eens!' + error
			})
		});
}


// list gifs for the submit button
let gifs = [
	"https://media.tenor.com/I7GuZXfrYmkAAAAi/peach-goma.gif",
	"https://media.tenor.com/P3_wSFss_CMAAAAi/airfryer-philips-airfryer.gif",
	"https://media.tenor.com/tjvq17RHACIAAAAi/banana-yellow.gif",
	"https://media.tenor.com/sTrAGBcLuD8AAAAi/peeling-banana-ricky-berwick.gif",
	"https://media.tenor.com/aOEqri2i2uQAAAAi/rationalag-rational.gif",
	"https://media.tenor.com/kowsaLgux0kAAAAi/healthy-food-airfryer.gif",
	"https://media.tenor.com/9SxLP1yRJfoAAAAj/askb-bernardson.gif",
	"https://media.tenor.com/ZREsOE6a51IAAAAj/shaking-sarah-hyland.gif",
	"https://media.tenor.com/THUGXauW8E0AAAAi/overcooked-overcooked2.gif",
	"https://media.tenor.com/UcG6bMhzRlkAAAAi/dancing-in-the-kitchen-motoki-maxted.gif",
	"https://media.tenor.com/2-Uowk717wUAAAAi/cook-masak.gif",
	"https://media.tenor.com/8dKdH7JyEL0AAAAi/heart-love.gif",
	"https://media.tenor.com/vvSFm6EK4i8AAAAi/kirby-jam.gif"
]

// get a random gif
function getGif() {
	return gifs[Math.floor(Math.random() * gifs.length)]
}
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

<!-- Modify calendar here -->
<style>
.big-card .el-card__body {
	/* no left and right */
	padding: 0 !important;
	padding-left: 0px;
	padding-right: 0px;
}

.is-selected {
	color: #fff;
}

.is-today {
	--el-color-primary: #d416b6;
}

.is-selected .is-today {
	--el-color-primary: #fff !important;
	color: #fff !important;
}

.el-calendar-table td.is-selected {
	--el-calendar-selected-bg-color: #5e0f5244;
	/* Modify the variable */
	--el-calendar-selected-color: #fff;
}

.el-calendar-table .el-calendar-day:hover {
	--el-calendar-selected-bg-color: #5e0f5244;
	/* Modify the variable */
	--el-calendar-selected-color: #fff;
}

/* el-button colors */
.el-button {
	--el-color-primary: #5e0f52;
}
</style>