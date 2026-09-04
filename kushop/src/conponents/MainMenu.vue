<template>
    <nav class="navbar navbar-expand-lg" style="background-color: aqua;">
    <div class="container-fluid">

        <router-link class="navbar-brand" to="/">
            Kushop
        </router-link>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <router-link class="nav-link" to="/">
                        Home
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/product">
                        Product
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/login">
                        Login
                    </router-link>
                </li>

            </ul>
        </div>

    </div>
</nav>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>