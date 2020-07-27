import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        allSongData: [],
        filteredSongData: [],
        allArtists: [],
        allPrices: [],
        allGenres: [],
        filterResultCount: 0,
        filterIsLoading: false,
        mainInputValue: '',
        artistValue: '',
        priceValue: '',
        genreValue: '',
        limitValue: '100',
    },
    mutations: {
        setAllSongData (state, songs) {
            state.allSongData = songs;
            state.filteredSongData = songs;
        },
        updateFilterResultCount (state, count) {
            state.filterResultCount = count;
        },
        setAllArtists (state, artists) {
            state.allArtists = artists;
        },
        setAllPrices (state, prices) {
            state.allPrices = prices;
        },
        setAllGenres (state, genres) {
            state.allGenres = genres
        },
        setMainInputValue (state, value) {
            state.mainInputValue = value;
        },
        setArtistValue (state, value) {
            state.artistValue = value;
        },
        setPriceValue (state, value) {
            state.priceValue = value;
        },
        setGenreValue (state, value) {
            state.genreValue = value;
        },
        setLimitValue (state, value) {
            state.limitValue = value;
        },
        resetOtherValuesBut (state, value) {
            if(value !== 'artist') {
                state.artistValue = ''
            }
            if(value !== 'price') {
                state.priceValue = ''
            }
            if(value !== 'category') {
                state.genreValue = ''
            }
            if(value !== 'wild') {
                state.mainInputValue = ''
            }
        },
        filterChangeMutation (state, filter) {
            // filter allSongData bucket and assign to filteredSongData bucket

            if(filter.value === 'all') {
                // reset filtered song data
                state.filteredSongData = state.allSongData
            } else if (filter.type === 'wild') {
                // filter wild value on song titles
                let songTitles = state.allSongData.map(song => song.title.label);
                let wildValue = `*${filter.value}*`;
                let filteredResults = filterBy(songTitles, wildValue);

                // using allSongData, check and return if a title is included in the filtered song titles
                state.filteredSongData = state.allSongData.filter(song => filteredResults.includes(song.title.label));
            } else if (filter.type === 'category') {
                state.filteredSongData = state.allSongData.filter(song => song[filter.type].attributes.label === filter.value);
            } else if (filter.type === 'im:price') {
                state.filteredSongData = state.allSongData.filter(song => song[filter.type].label === `\$${filter.value}`);
            } else {
                state.filteredSongData = state.allSongData.filter(song => song[filter.type].label === filter.value);
            }

            // assign result count from filtered song data
            state.filterResultCount = state.filteredSongData.length;
        },
        filterIsLoading (state) {
            state.filterIsLoading = true
        },
        filterIsNotLoading (state) {
            state.filterIsLoading = false
        }
    },
    actions: {
        getAllSongData (commit, limit) {
            const URL = 'https://itunes.apple.com/us/rss/topalbums/limit=';

            store.commit('filterIsLoading');
            fetch(URL + limit + '/json')
                .then((response) => response.json())
                .then(response => {
                    // set artist filter list
                    store.commit('setAllArtists', buildFilter(response.feed.entry, 'im:artist'));
                    // set price filter list
                    store.commit('setAllPrices', buildFilter(response.feed.entry, 'im:price'));
                    // set genre filter list
                    store.commit('setAllGenres', buildFilter(response.feed.entry, 'category'));
                    // set all song data
                    store.commit('setAllSongData', response.feed.entry);
                    // update result count
                    store.commit('updateFilterResultCount', response.feed.entry.length);

                    setTimeout(() => {
                        store.commit('filterIsNotLoading');
                    }, 1000);

                })
                .catch(error => {
                    console.log(error);
                    store.commit('filterIsNotLoading');
                });
        },
        filterChangeAction (commit, filter) {
            store.commit('filterIsLoading');

            // apply slight load delay before mutation
            setTimeout(() => {
                store.commit('filterChangeMutation', filter);
                store.commit('filterIsNotLoading');
            }, 1000);
        }
    }
});

// used to build filter values for 'artist', 'price' & 'genre'
const buildFilter = (data, filterType) => {
    let list = [];

    // find all items matching 'filterType' and sort alphabetically
    if (filterType === 'category') {
        list = data.map(song => song[filterType].attributes.label).sort();
    } else if (filterType === 'im:price') {
        // assign price as a Number and remove $ to sort
        list = data.map(song => Number(song[filterType].label.replace(/(^\$)/g,''))).sort(compareNumbers);
    } else {
        list = data.map(song => song[filterType].label).sort();
    }
    // return all unique values
    return Array.from(new Set(list))
};

// sort the array in ascending order
const compareNumbers = (a, b) => {
    return a - b;
};

// filter any matched characters at the start '^' or at the end '$' of an item.
const filterBy = (items, str) => {
    return items.filter(item => new RegExp('^' + str.replace(/\*/g, '.*') + '$').test(item));
};