Joseph Cyrus 100 Songs Exercise
-
### Journey

The user has the ability to overall choose between the Top 100, 75, 50, 25 & 10 songs on the charts. This is represented in a select box as the primary filter.

In addition, 4 more advanced search options are presented to the user underneath. 
- Wild card search - A free text field, filtering against the entire song title
    - v2 - Ability to filter against all properties, not just the title
- Artist select box - A select option of all artists included in the Top limit selected
- Price select box - A select option of all unique prices
    -  v2 - Rather than individual options, A range slider.
- Genre select box - A select option of all unique genres to filter by.

*if 0 results are returned, a prompt message to 'refine' the search is displayed 
 
Once results have been filtered, song 'cards' are presented in a grid system. Each song card includes:
- Title
- Image
- Song details (dropdown)
    - Artist
    - Release date
    - Price
    - Genre
    - Content
    - Rights
    
To conclude the user journey, the song artwork image can be clicked, which will redirect the user (in a new tab) to the official iTunes store.

### Main Tech
- Npm
- Webpack
- Vue.js
- Vuex
- HTML5
- BEM CSS, SASS
- ES6 js

### Dependencies
- vue: JavaScript Framework
- vue-loader & vue-template-compiler: Convert Vue files into JavaScript
- vuex: state manager for vue.js
- webpack: Bundler
- webpack-cli: To run Webpack commands
- webpack-dev-server: running the project from a development server
- babel-loader: ES6 => ES5
- @babel/core & @babel/preset-env: dependencies for babel-loader
- css-loader: Parse our CSS e.g. @import => import
- sass-loader: Compile our SCSS files to CSS
- node-sass: Along with sass-loader, allows to natively compile .scss files to css
- sass, fibers: Peers dependencies for sass-loader
- vue-style-loader: Injects our parsed CSS into the HTML file as style tags
- html-webpack-plugin: Will use my index.html and bundle JavaScript in the head
- reset-css: Resets all HTML tags to 0 padding,margin,border, font-size and alignments
- file-loader: Handles our image files into our output directory
- mini-css-extract-plugin: Extracts CSS into separate files

### Components
- App.vue
- HeaderComponent.vue
- FilterComponent.vue
- ResultsComponent.vue
- SongComponent.vue

### Stylesheets
- /base
    - /_base.scss
    - /_grid.scss
    - /_reset.scss
    - /_typography.scss
- /helpers
    - /_variables.scss
- /modules
    - /_filters.scss
    - /_footers.scss
    - /_header.scss
    - /_song.scss
- app.scss

### Vue/Vuex usage
- Our Vue components have been split out accordingly into 4 separate instances.
- Our application state, mutations and actions are all held inside our `store.js` container.
- To begin the journey, I start with the `beforeCreate()` lifecyle hook in `App.vue` to dispatch our api action `getAllSongData('limit')`.
    - This will trigger our api immediately after the Vue instance has been initialized.
    - A fetch() API is used to return our response from the iTunes api.
        - We `then` begin to commit all our mutation to the state i.e. our dropdown filter data, all of our song data and the number of songs returned.      
        - During our `fetch()` call, I implemented a state boolean value `filterIsLoading` & `filterIsNotLoading` to feedback if our filter is loading or not. This helps me to perform loaders/progress bars whilst there may be a delay in our API call.
        - *A delay of 1 second is applied to allow for breathing space between searches.
    - Song data is defaulted to limit 100 songs.
- When the limit is changed, I am dispatching our API action `getAllSongData('limit')` to refresh all song data.
- When a filter is changed, I am holding the song data in 2 buckets on the state (`allSongData` & `filteredSongData`).
    - `allSongData` - will always hold all songs as a default bucket.
    - `filteredSongData` - will perform a Es6 `filter()` function on the `allSongData` bucket and return to the frontend.

- Two-way binding was implemented to fulfill my requests from each filter. These Two-way computed properties were set up in `FilterComponent.vue`, with a getter (return state value) and setter (commit mutations).

### Testing
- Chrome extensions Validity & WAVE for semantics and accessibility testing
- Manual Browser testing on Chrome, Safari, IE
- Device testing on chromes device toolbar

### Favourite feature
The entire project. It was a challenge to get back into the groove of things, 
but honestly, these are the projects that I love the most. Ability to create a responsive interface that a 
user can interact with and filter results to bring forward the information they want.

To single out a specific feature however, I will go with the 'song details' dropdown. With the use of the `@mouseover` and
`@mouseleave` events, I would trigger a boolean property that would toggle the following css classes `song__label-open` and `song__label-hidden`. 
These classes have been styled to interchange the opacity & ease-in and out transition at .5s. 
This feature is simple for quick display purposes, hence the `@mouseleave` event.   

### Things I would do different
- Organising my work to commit my features as I go and avoid 'free coding'. 
I definitely got carried away during this exercise due to my eagerness to be back working.
- I would definitely look to optimise the advanced search. Creating more of a relationship between each individual filter.
- Creating a fun, more interactive interface to go with the music theme. Maybe implementing song previews, subtle animations in places and less dull.
- Implement Material Design framework like Vuetify that sits well with Vue.js to bring more consistency and flair to the app.
- Have a translation JSON file to hold all free-text to accommodate any translations needs in the future. 

### Final thoughts
Being away from work for 4 months and not touching Vue.js for almost a year, 
I had to dive into a little GDD (Google Driven Development) for this exercise to get me going. 

I can't stress this enough, but I really enjoyed getting back into it! 

I think it was my excitement being back and to continue developing the exercise which 
distracted me from your typical standards in a workplace i.e. committing code frequently, conducting industry 
standard testing and completing to a deadline (sorry for the delay). 

However, I hope I was able to present my abilities during these strange (C-19) times and the fact I simply find 
enjoyment in what I do; which is develop frontend code, UI design and pick new/existing skills up along the way.