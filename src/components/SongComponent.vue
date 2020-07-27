<template>
    <figure class="song border--solid box--shadow">
        <figcaption class="song__title">
            <h3>{{ song.title.label }}</h3>
        </figcaption>

        <a :href="song.link.attributes.href" target="_blank">
            <img :src="getImage" :alt="song.title.label" class="song__img">
        </a>

        <div class="grid grid--1-col">
            <h4 @mouseover="songDetailsActive = true" @mouseleave="songDetailsActive = false" class="song__label-header" :class="songDetailsActive?'song__label-open':'song__label-hidden'">Song Details ▾</h4>
            <div class="song__info-group">
                <div class="song__info-group-single">
                    <h4 class="song__detail-label">Artist:</h4>
                    <h4>{{ song['im:artist'].label }}</h4>
                </div>

                <div class="song__info-group-single">
                    <h4 class="song__detail-label">Released:</h4>
                    <h4>{{ song['im:releaseDate'].attributes.label }}</h4>
                </div>

                <div class="song__info-group-single">
                    <h4 class="song__detail-label">Price:</h4>
                    <h4>{{ song['im:price'].label }}</h4>
                </div>

                <div class="song__info-group-single">
                    <h4 class="song__detail-label">Genre:</h4>
                    <h4>{{ song.category.attributes.label }}</h4>
                </div>

                <div class="song__info-group-single">
                    <h4 class="song__detail-label">Content:</h4>
                    <h4>{{ song['im:contentType']['im:contentType'].attributes.label }}</h4>
                </div>

                <div class="song__info-group-single">
                    <h4 class="song__detail-label">Rights:</h4>
                    <h4 class="song__detail-value">{{ song.rights.label }}</h4>
                </div>
            </div>
        </div>
    </figure>
</template>

<script>
    export default {
        name: "SongComponent",
        data() {
            return {
                songDetailsActive: false
            };
        },
        props: {
            song: Object
        },
        computed: {
            getImage() {
                // return index 2 from [50,60,170]
                return this.song['im:image'][2].label
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>