<template>
    <header>
        <div class="header">
            <h1 class="header__title">{{ pageTitle }}</h1>
        </div>
    </header>
</template>

<script>
    export default {
        name: "HeaderComponent",
        computed: {
            pageTitle() {
                return `Top ${this.$store.state.limitValue} songs`;
            }
        },
    }
</script>

<style scoped>

</style>