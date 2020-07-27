<template>
    <section id="content">
        <ol :class="`grid grid--${colSize}-col`">
            <li v-if="!filterIsLoading" v-for="song in filteredSongData">
                <SongComponent :song="song"/>
            </li>
            <li v-if="filterIsLoading" v-for="n in colSize">
                <figure class="song song--default border--solid box--shadow">
                    <figcaption class="song__title song--default-title"></figcaption>
                    <div class="song--default-figure"></div>
                </figure>
            </li>
        </ol>
    </section>
</template>

<script>
    import {mapState} from "vuex";
    import SongComponent from "./SongComponent.vue";

    export default {
        name: "ResultsComponent",
        computed: {
            ...mapState({
                filteredSongData: state => state.filteredSongData,
                filterIsLoading: state => state.filterIsLoading
            }),
            colSize() {
                return this.filteredSongData.length < 3 ? 3 : this.filteredSongData.length > 5 ? 5 : this.filteredSongData.length;
            }
        },
        components: {
            SongComponent
        }
    }
</script>

<style scoped>

</style>