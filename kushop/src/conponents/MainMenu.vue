<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: azure;">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Kushop</a>
      <button
        class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/"><div class="nav-link">Home</div></router-link>
          </li>
          <li class="nav-item">
           <router-link to="/product" ><div class="nav-link">Product</div></router-link>
          </li>
           <li class="nav-item" v-if="login">
            <router-link to="/pagemember" style="text-decoration: none">
              <div class="nav-link fw-bold">{{ memName }}</div>
            </router-link>
          </li>
          <li class="nav-item" v-if="login">
            <a href="#" @click="memLogout()" style="text-decoration: none">
              <div class="nav-link fw-bold">ลงชื่อออก</div>
            </a>
          </li>
          <li class="nav-item" v-if="!login">
            <router-link to="/login" style="text-decoration: none">
              <div class="nav-link">Login</div>
            </router-link>
          </li>

          
          
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

axios.defaults.withCredentials = true;

const authStore = useAuthStore();
const router = useRouter();

const member = ref(null);
const memEmail = ref(null);
const memName = ref(null);
const dutyId = ref(null);

const login = computed(() => authStore.isLogin);

watch(
  () => authStore.isLogin,
  () => {
    console.log("Watch");
    getMember();
  }
);

onMounted(async () => {
  await getMember();
});

const getMember = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/members/details"
    );

    member.value = res.data;

    memEmail.value = member.value.memEmail;
    memName.value = member.value.memName;
    dutyId.value = member.value.dutyId;

  } catch (err) {
    console.log(err.message);
  }
};

const memLogout = async () => {
  const cf = window.confirm("ต้องการออกจากระบบ?");

  if (cf) {
    try {
      await axios.get(
        "http://localhost:3000/members/logout"
      );

      // เปลี่ยนสถานะใน Pinia
      authStore.logout();

      // กลับหน้า Home
      router.push("/");

    } catch (err) {
      console.log(err);
    }
  }
};
</script>
<style></style>
