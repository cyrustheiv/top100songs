<template>
    <section id="filter">
        <form id="filter-form">
            <div class="grid grid--1-col grid--1-col__center">
                <label for="limit-select" title="limit-select" style="display: contents">
                    <select v-model="limitChange" class="filter__select-item border--top-bottom border--radius-0" name="limit" id="limit-select">
                        <option selected disabled value="">Top</option>
                        <option value="100">100</option>
                        <option value="75">75</option>
                        <option value="50">50</option>
                        <option value="25">25</option>
                        <option value="10">10</option>
                    </select>
                </label>
            </div>
            <div class="grid grid--4-col">
                <label for="main-input" title="main-input" style="display: flex">
                    <input v-model="mainInput" class="filter__input-text border--top-bottom border--radius-0" type="text" id="main-input" name="main-input" placeholder="Type someone special here..">
                </label>
                <label for="artist-select" title="artist-select">
                    <select v-model="artistChange" class="filter__select-item border--top-bottom border--radius-0" name="artist" id="artist-select">
                        <option disabled selected value="">Artist</option>
                        <option value="all">All</option>
                        <option v-for="artist in allArtists" :value="artist">{{artist}}</option>
                    </select>
                </label>
                <label for="price-select" title="price-select">
                    <select v-model="priceChange" class="filter__select-item border--top-bottom border--radius-0" name="price" id="price-select">
                        <option disabled selected value="">Price</option>
                        <option value="all">All</option>
                        <option v-for="price in allPrices" :value="price">{{price}}</option>
                    </select>
                </label>
                <label for="genre-select" title="genre-select">
                    <select v-model="genreChange" class="filter__select-item border--top-bottom border--radius-0" name="genre" id="genre-select">
                        <option disabled selected value="">Genre</option>
                        <option value="all">All</option>
                        <option v-for="genre in allGenres" :value="genre">{{genre}}</option>
                    </select>
                </label>
            </div>
        </form>

        <div class="result">
            <hr class="result__hr">
            <div class="result__group">
                <h2 class="result__group-count">{{results}}</h2>
                <h5 class="result__group-info" v-if="!filterIsLoading && filterResultCount === 0" >{{refineSearch}}</h5>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "FilterComponent",
        data() {
            return {
                wild: '',
                artist: '',
                price: '',
                genre: '',
                refineSearch: 'Please refine your search'
            }
        },
        computed: {
            ...mapState({
                    filterResultCount: state => state.filterResultCount,
                    allArtists: state => state.allArtists,
                    allPrices: state => state.allPrices,
                    allGenres: state => state.allGenres,
                    filterIsLoading: state => state.filterIsLoading
            }),
            results() {
                return this.filterIsLoading ? '..fetching' : this.filterResultCount + ' results';
            },
            mainInput: {
                get () {
                    return this.$store.state.mainInputValue;
                },
                set (val) {
                    this.$store.commit('resetOtherValuesBut', 'wild');
                    this.$store.commit('setMainInputValue', val);
                    this.$store.dispatch('filterChangeAction', {'value':val, 'type':'wild'});
                }
            },
            artistChange: {
                get () {
                    return this.$store.state.artistValue;
                },
                set (val) {
                    this.$store.commit('resetOtherValuesBut', 'artist');
                    this.$store.commit('setArtistValue', val);
                    this.$store.dispatch('filterChangeAction', {'value':val, 'type':'im:artist'});
                }
            },
            priceChange: {
                get () {
                    return this.$store.state.priceValue;
                },
                set (val) {
                    this.$store.commit('resetOtherValuesBut', 'price');
                    this.$store.commit('setPriceValue', val);
                    this.$store.dispatch('filterChangeAction', {'value':val, 'type':'im:price'});
                }
            },
            genreChange: {
                get () {
                    return this.$store.state.genreValue;
                },
                set (val) {
                    this.$store.commit('resetOtherValuesBut', 'category');
                    this.$store.commit('setGenreValue', val);
                    this.$store.dispatch('filterChangeAction', {'value':val, 'type':'category'});
                }
            },
            limitChange: {
                get () {
                    return this.$store.state.limitValue;
                },
                set (val) {
                    this.$store.commit('resetOtherValuesBut', 'limit');
                    this.$store.commit('setLimitValue', val);
                    this.$store.dispatch('getAllSongData', parseInt(val));
                }
            }
        }
    }
</script>

