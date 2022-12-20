import { ref, reactive, computed } from "vue";
import { supabase } from "../supabase";
import { defineStore } from "pinia";
import { collapseItemProps } from "element-plus";

export const useAccountStore = defineStore("account", () => {
  let user = reactive({});
  let userName = computed(() => user.email.split("@")[0]);
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
              user = data.session.user;
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

  async function submitPreferences(data, updated, month, year) {
    await isLoggedIn();

    console.log(data);

    // map data according to index
    data = data.map((item, index) => {
      return {
        userId: user.id,
        date: `${year}-${month}-${index + 1}`,
        preference: item.preference,
      };
    });

    // make updated dinstict
    updated = [...new Set(updated)];
    console.log(updated);

    // filter out preference of 0 except when updated
    data = data.filter((item) => {
      return updated.includes(parseInt(item.date.split("-")[2]) - 1);
    });

    console.log(data);

    return new Promise((resolve, reject) => {
      // first delete all preferences for this month and user
      supabase
        .from("KookPreferences")
        .delete()
        .eq("userId", user.id)
        .gte("date", `${year}-${month}-01`)
        .lte("date", `${year}-${month}-31`)
        .in(
          "date",
          updated.map((item) => `${year}-${month}-${item + 1}`)
        )
        .then(({ good, error }) => {
          console.log(good, error);
          if (error) {
            reject(error.message);
          } else {
            data = data.filter((item) => item.preference !== 0);
            supabase
              .from("KookPreferences")
              .insert(data)
              .then(({ data, error }) => {
                if (error) {
                  reject(error.message);
                } else {
                  resolve(data);
                }
              });
          }
        });
    });
  }

  async function getPreferences(month, year) {
    await isLoggedIn();
    return new Promise((resolve, reject) => {
      supabase
        .from("KookPreferences")
        .select("*")
        .eq("userId", user.id)
        .gte("date", `${year}-${month}-01`)
        .lte("date", `${year}-${month}-31`)
        .then(({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
    });
  }

  function getKookGroups() {
    return new Promise((resolve, reject) => {
      supabase
        .from("KookGroups")
        .select("*")
        .then(({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
    });
  }

  return {
    login,
    isLoggedIn,
    submitPreferences,
    userName,
    getPreferences,
    getKookGroups,
  };
});
