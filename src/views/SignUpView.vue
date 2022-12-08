<template>
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
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import { supabase } from '../supabase'

const email = ref('');
const pass = ref('');
const confirmPass = ref('');
const kookGroep = ref('K1');
const name = ref('');

function createAccount() {
	// min pass length of 6
	if (pass.value.length < 6) {
		ElMessage({
			message: 'Wachtwoord moet minimaal 6 karakters lang zijn.',
			type: 'error',
		})
		return;
	}

	// check if pass and confirm pass are the same
	if (pass.value !== confirmPass.value) {
		ElMessage({
			message: 'Wachtwoorden komen niet overeen.',
			type: 'error',
		})
		return;
	}

	// Check if all form values are not empty
	if (email.value === '' || pass.value === '' || confirmPass.value === '' || kookGroep.value === '' || name.value === '') {
		ElMessage({
			message: 'Vul alle velden in',
			type: 'error',
		})
		return;
	}

	supabase.auth.signUp({
		email: email.value,
		password: pass.value,
	})
		.then(({ data, error }) => {
			if (error) {
				ElMessage({
					message: error,
					type: 'error',
				})
				return;
			}
			console.log(data);
			ElMessage({
				message: 'Account aangemaakt! Check je email om je account te activeren.',
				type: 'success',
			})
		})
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
