<template>
	<h1 class="specialWeekText">Kookrooster deze week</h1>
	<el-card class="box-card">
		<div>
			<el-timeline>
				<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp"
					:hollow="activity.isMe">
					<div v-if="activity.isMe" class="specialWeekText">
						<h2>
							{{ activity.content }}
						</h2>
					</div>
					<div v-else>
						<h2>
							{{ activity.content }}
						</h2>
					</div>
				</el-timeline-item>
			</el-timeline>
		</div>
	</el-card>
</template>

<script setup>
const activities = [
	{
		content: 'Fedde kookt',
		timestamp: 'Maandag 5 december',
	},
	{
		content: 'Jij kookt',
		timestamp: 'Dinsdag 6 december',
		isMe: true,
	},
	{
		content: 'Lotte kookt',
		timestamp: 'Woensdag 7 december',
	},
	{
		content: 'Sven kookt',
		timestamp: 'Donderdag 8 december',
	},
]
</script>

<style scoped>
.specialWeekText {
	background: #00FF00;
	background: linear-gradient(to left, #00FF00 75%, #00FFFF 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>