<template>
	<h1 class="specialMonthText">Kookrooster deze maand</h1>
	<el-row :gutter="20">
		<el-col :xs="24" :md="12">
			<el-card class="box-card scroll-dates">
				<div>
					<el-timeline>
						<el-timeline-item v-for="(activity, index) in activities" :key="index"
							:timestamp="activity.timestamp" :hollow="activity.isMe" size="large">
							<div v-if="activity.isMe" class="specialMonthText">
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
		</el-col>
		<el-col :xs="24" :md="12">
			<el-card class="box-card">
				<div>
					<h2>Voel je je geinspireerd?</h2>
					<h3 class="recommendation">Vul het rooster voor volgende maand in</h3>
					<el-button type="info" size="large" color="#05FFFF">Vul in</el-button>
				</div>
			</el-card>
		</el-col>
	</el-row>
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
.specialMonthText {
	background: #FF0090;
	background: linear-gradient(to left, #FF0090 75%, #05FFFF 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.fillInButton {
	background: #FF0000;
	background: linear-gradient(to right, #FF0000 0%, #FF9900 43%, #FFF700 100%);
}

.recommendation {
	color: var(--el-text-color-secondary);
	font-weight: 400;
	/* italic */
	font-style: italic;
}

.scroll-dates {
	overflow-y: scroll;
	height: 80vh;
	margin-bottom: 20px;
}

@media (min-width: 768px) {
	.scroll-dates {
		height: 40vh;
	}
}
</style>