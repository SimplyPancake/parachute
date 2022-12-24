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
						<el-form-item label="Kookgroep">
							<el-select v-model="kookGroep" class="m-2" placeholder="Select" v-if="showKookGroups">
								<el-option v-for=" item in kookGroups" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
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
import { ref, reactive, computed } from 'vue';
import { ElMessage } from 'element-plus'
import { supabase } from '../supabase'
import { useAccountStore } from '@/stores/account';
const accountStore = useAccountStore();

const email = ref('');
const pass = ref('');
const confirmPass = ref('');
const kookGroep = ref('');
const name = ref('');
let kookGroups = reactive({});
const showKookGroups = ref(false)

// get all kook groups
accountStore.getKookGroups()
	.then((groups) => {
		kookGroups = groups.map((group) => {
			return {
				value: group.id,
				label: group.GroupName
			}
		});
		showKookGroups.value = true;
	})
	.catch((err) => {
		console.log(err)
		ElMessage.error(err.message);
	});

function createAccount() {
	// Check if all form values are not empty
	if (email.value === '' || pass.value === '' || confirmPass.value === '' || kookGroep.value === '' || name.value === '') {
		ElMessage.error('Vul alle velden in!');
		return;
	}
	// min pass length of 6
	if (pass.value.length < 6) {
		ElMessage.error('Wachtwoord moet minimaal 6 tekens lang zijn');
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


	supabase.auth.signUp({
		email: email.value,
		password: pass.value,
	})
		.then(({ data, error }) => {
			if (error) {
				ElMessage.error(error.message);
				return;
			}
			let userId = data.user.id;
			// then map the kookgroep to the id
			// update user with name and kookgroep
			supabase.from('profiles').update({
				name: name.value,
				kookgroup: kookGroep.value
			}).eq('id', userId)
				.then(({ data, error }) => {
					if (error) {
						ElMessage.error(error.message);
						return;
					}
					ElMessage.success('Account aangemaakt! Check even je email om je account te activeren');
				})
				.catch((err) => {
					console.log(err)
					ElMessage.error(err.message);
				});
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
