<template>
    <div class="row">
        <div v-for="(pd,pdId) in products" :key="pdId" class="col-lg-4 col-md-6 col-sm-12">
            <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ pd.pdName }}</h5>
    <p class="card-text">{{ pd.brand.brandName}} - {{ pd.pdPrice }}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
    </div>
    
   
</template>

<script setup>
import { ref } from 'vue';

const products = ref(
    [
    {
        "pdId": "002",
        "pdName": "Product2",
        "pdPrice": 2000,
        "pdRemark": null,
        "pdTypeId": "T01",
        "brandId": "B03",
        "brand": {
            "brandId": "B03",
            "brandName": "Brand C"
        },
        "pdt": {
            "pdTypeId": "T01",
            "pdTypeName": "สินค้าชนิดที่1"
        }
    },
    {
        "pdId": "003",
        "pdName": "Product3",
        "pdPrice": 3000,
        "pdRemark": null,
        "pdTypeId": "T01",
        "brandId": "B03",
        "brand": {
            "brandId": "B03",
            "brandName": "Brand C"
        },
        "pdt": {
            "pdTypeId": "T01",
            "pdTypeName": "สินค้าชนิดที่1"
        }
    }
]

)
</script>

<style lang="scss" scoped>

</style>