<template>
    <div id="app">
        <main>
            <HeaderComponent/>
            <FilterComponent/>
            <ResultsComponent/>
        </main>
        <footer>
            <h5 class="copyright">&copy; {{ copyright }}</h5>
        </footer>
    </div>
</template>

<script>
    import HeaderComponent from './components/HeaderComponent.vue'
    import FilterComponent from './components/FilterComponent.vue'
    import ResultsComponent from './components/ResultsComponent.vue'

    export default {
        data() {
            return {
                copyright: 'Joseph Cyrus 2020'
            };
        },
        components: {
            HeaderComponent,
            FilterComponent,
            ResultsComponent
        },
        beforeCreate() {
            this.$store.dispatch('getAllSongData', 100);
        },
    };
</script>

<style lang="scss">
    @import "./stylesheets/app.scss";
</style>