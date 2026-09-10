
<template>

    <!-- vue.js form ถ้าไม่กำหนด @submit.prevent จะทำการเปลี่ยนหน้าเมื่อ submit -->
    <form @submit.prevent="searchProduct">
        <div class="row">
            <div class="h1 col-md-6 col-sm-12 text-danger">
                ผลิตภัณฑ์ของเรา
            </div>

            <div class="col-md-4 col-sm-6">
                <input
                    type="text"
                    class="form-control"
                    v-model="stext"
                >
            </div>

            <div class="col">
                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    ค้นหา
                </button>
            </div>
        </div>
    </form>

    <div class="row">
        <div
            v-for="pd in products"
            :key="pd.pdId"
            class="col-lg-4 col-md-6 col-sm-12"
        >
            <div
                class="card mt-3"
                style="width: 18rem; background-color: #EEEEEE;"
            >
          <img
    :src="`http://localhost:3000/img_pd/${pd.pdId}.jpg`"
    class="card-img-top"
    alt=""
>

                <div class="card-body">
                    <h5 class="card-title">
                        {{ pd.pdName }}
                    </h5>

                    <p class="card-text">
                        {{ pd.brand?.brandName || "ไม่ระบุยี่ห้อ" }}
                        -
                        {{ pd.pdPrice }}
                    </p>

                    <a href="#" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const products = ref([])
const stext = ref("")

onMounted(async () => {
    await axios.get(`http://localhost:3000/product`)
        .then(res => {
            products.value = res.data
        })
        .catch(err => console.log(err.message))
})

const searchProduct = async () => {
    await axios.get(`http://localhost:3000/product/search/${stext.value}`)
        .then(res => {
            products.value = res.data
        })
        .catch(err => console.log(err.message))
}
</script>

<style lang="scss" scoped>

</style>

