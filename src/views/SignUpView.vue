<template>
	<el-row>
		<!-- For the offset -->
		<el-col :xs="2" :md="8"></el-col>
		<el-col :xs="20" :md="8">
			<!-- Put a card in here -->
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<h2><span class="hey">Hey!</span> Maak hier een account aan</h2>
					</div>
				</template>
				<div>
					<el-form label-position="left">
						<el-form-item label="Naam">
							<el-input v-model="name" placeholder="Hans de Bans" type="text" />
						</el-form-item>
						<el-form-item label="Email">
							<el-input v-model="email" placeholder="email@email.email" type="email" />
						</el-form-item>
						<el-form-item label="Wachtwoord">
							<el-input v-model="pass" placeholder="123456" type="password" />
						</el-form-item>
						<el-form-item label="Herhaal wachtwoord">
							<el-input v-model="confirmPass" placeholder="123456" type="password" />
						</el-form-item>

						<el-form-item>
							<el-button type="primary" v-on:click="createAccount()">Maak account aan</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const pass = ref('');
const confirmPass = ref('');
const kookGroep = ref('');
const name = ref('');

function createAccount() {
	console.log('login');
	// min pass length of 6
}
</script>

<style scoped>
.hey {
	background: #BB00FF;
	background: linear-gradient(to left, #BB00FF 0%, #FF0000 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
