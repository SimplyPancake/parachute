<template>
	<h1 class="specialMonthText">Kookrooster deze maand</h1>
	<el-row :gutter="20">
		<el-col :span="12">
			<el-card class="box-card">
				<div>
					<!-- Use timeline thats scrollable -->
				</div>
			</el-card>
		</el-col>
		<el-col :span="12">
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

<script lang="ts" setup>

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
</style>