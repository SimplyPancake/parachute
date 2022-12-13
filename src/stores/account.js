import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
  let user = null;
  let session = null;
  let _isLoggedIn = ref(false);

  function isLoggedIn() {
    return new Promise((resolve, reject) => {
      if (_isLoggedIn.value) {
        resolve(true);
      }

      supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
          reject(false);
        } else {
          if (data) {
            user = data.user;
            session = data.session;
            _isLoggedIn.value = true;
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

  function login(email, pass) {
    return new Promise((resolve, reject) => {
      supabase.auth
        .signInWithPassword({
          email: email,
          password: pass,
        })
        .then(({ data, error }) => {
          console.log(data, error);
          if (error) {
            reject(error);
          } else {
            // Set the user and session
            user = data.user;
            session = data.session;
            _isLoggedIn.value = true;
            resolve(data);
          }
        });
    });
  }

  return { login, isLoggedIn };
});
