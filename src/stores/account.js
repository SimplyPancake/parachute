import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
  let user = null;
  let session = null;
  let _isLoggedIn = false;

  // Ugly nested approach, could be improved
  async function isLoggedIn() {
    return new Promise((resolve, reject) => {
      if (_isLoggedIn) {
        resolve(true);
        return;
      }

      supabase.auth.getSession().then(({ data, error }) => {
        console.log(data, error);
        if (error) {
          resolve(false);
        } else {
          if (data) {
            if (data.session) {
              user = data.user;
              session = data.session;
              _isLoggedIn = true;
              resolve(true);
            }
            resolve(false);
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
            _isLoggedIn = true;
            resolve(data);
          }
        });
    });
  }

  return { login, isLoggedIn };
});
