import { ref, reactive, computed } from "vue";
import { supabase } from "../supabase";
import { defineStore } from "pinia";
import { collapseItemProps } from "element-plus";

export const useAccountStore = defineStore("account", () => {
  let user = reactive({});
  let userName = computed(() => extraData.name);
  let kookGroup = computed(() => extraData.kookGroupName);
  let isAdmin = computed(() => extraData.is_admin);
  let session = null;
  let _isLoggedIn = false;
  let extraData = reactive({});

  // Ugly nested approach, could be improved
  async function isLoggedIn() {
    return new Promise((resolve, reject) => {
      if (_isLoggedIn) {
        resolve(true);
        return;
      }

      supabase.auth.getSession().then(async ({ data, error }) => {
        console.log(data, error);
        if (error) {
          resolve(false);
          return;
        } else {
          if (data) {
            if (data.session) {
              user = data.session.user;
              session = data.session;
              _isLoggedIn = true;
              await getExtraData();
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
        .then(async ({ data, error }) => {
          console.log(data, error);
          if (error) {
            reject(error);
          } else {
            // Set the user and session
            user = data.user;
            session = data.session;
            _isLoggedIn = true;
            await getExtraData();
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
      let nextMonth = month + 1 > 12 ? 1 : month + 1;
      let nextMonthYear = month + 1 > 12 ? year + 1 : year;
      supabase
        .from("KookPreferences")
        .delete()
        .eq("userId", user.id)
        .gte("date", `${year}-${month}-01`)
        .lte("date", `${nextMonthYear}-${nextMonth}-31`)
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
      let nextMonth = month + 1 > 12 ? 1 : month + 1;
      let nextMonthYear = month + 1 > 12 ? year + 1 : year;
      supabase
        .from("KookPreferences")
        .select("*")
        .eq("userId", user.id)
        .gte("date", `${year}-${month}-01`)
        .lte("date", `${nextMonthYear}-${nextMonth}-01`)
        .then(({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
    });
  }

  function getUsers() {
    return new Promise((resolve, reject) => {
      if (!isAdmin.value) {
        reject("Not admin");
      }

      supabase.rpc("get_users").then(({ data, error }) => {
        if (error) {
          reject(error);
        } else {
          data = data.map((item) => {
            return item.j;
          });

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

  function logout() {
    supabase.auth.signOut();
    user = {};
    session = null;
    _isLoggedIn = false;
  }

  async function getExtraData() {
    return new Promise((resolve, reject) => {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .then(async ({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            console.log(data);
            extraData.name = data[0].name;
            extraData.kookGroupId = data[0].kookgroup;
            extraData.is_admin = data[0].is_admin;

            // Get kook group name
            await supabase
              .from("KookGroups")
              .select("*")
              .eq("id", data[0].kookgroup)
              .then(({ data, error }) => {
                if (error) {
                  reject(error);
                } else {
                  extraData.kookGroupName = data[0].GroupName;
                }
              });
            resolve(data);
          }
        });
    });
  }

  async function getRooster(groupId, month, year) {
    // Get users in group
    return new Promise(async (resolve, reject) => {
      // Get users in group
      let usersData = await supabase
        .from("profiles")
        .select("*")
        .eq("kookgroup", groupId)
        .then(async ({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });

      if (usersData.length == 0) {
        reject("No users in group");
      }

      // then get the schedule for this kook group
    });
  }

  return {
    login,
    isLoggedIn,
    submitPreferences,
    userName,
    getPreferences,
    getKookGroups,
    logout,
    extraData,
    kookGroup,
    isAdmin,
    getUsers,
    getRooster,
  };
});
