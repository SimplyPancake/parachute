<template>
	<el-row>
		<!-- For the offset -->
		<el-col :xs="2" :md="8"></el-col>
		<el-col :xs="20" :md="8">
			<!-- Put a card in here -->
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<h2><span class="hey">Hey!</span> Log hier in</h2>
					</div>
				</template>
				<div>
					<el-form label-position="left">
						<el-form-item label="Email">
							<el-input v-model="email" placeholder="email@email.email" type="email" />
						</el-form-item>
						<el-form-item label="Wachtwoord">
							<el-input v-model="pass" placeholder="123456" type="password" />
						</el-form-item>

						<el-form-item>
							<el-button type="primary" v-on:click="login()">Login</el-button>
							<el-button v-on:click="gotoSignup()">Maak account aan</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
import { ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const accountStore = useAccountStore();
const email = ref('');
const pass = ref('');

function login() {
	console.log('login');
	// min pass length of 6
	if (pass.value.length < 6) {
		ElMessage.error('Wachtwoord moet minimaal 6 karakters lang zijn');
		return;
	}
	accountStore.login(email.value, pass.value)
		.then(() => {
			ElMessage.success('Je bent ingelogd!');
			router.push('/');
		})
		.catch((err) => {
			ElMessage.error(err);
		});
}

function gotoSignup() {
	console.log('gotoSignup');
}
</script>

<style scoped>
.hey {
	background: #FF0000;
	background: linear-gradient(to right, #FF0000 0%, #FF9900 43%, #FFF700 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.linkje,
.linkje:active,
.linkje:visited,
.linkje:hover {
	background: #BB00FF;
	background: linear-gradient(to left, #BB00FF 0%, #FF0000 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.centerCard {
	top: 50vh;
}
</style>
