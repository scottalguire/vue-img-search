<template>
  <div>
    <h1>
      Search
      <a href="https://pixabay.com/">pixabay</a> for free high-quality images
    </h1>
    <a class="logo" href="https://pixabay.com/">
      <img src="https://pixabay.com/static/img/public/leaderboard_a.png" alt="Pixabay">
    </a>
    <div class="container search-container">
      <form action>
        <label for="search-box">Search</label>
        <input
          v-model="query"
          id="search-box"
          class="search"
          type="text"
          placeholder="Example: Red Balloon"
        >
        <button v-on:click="search" type="submit" class="btn btn-submit search-input">Search Pixabay</button>
      </form>
    </div>
    <p v-if="hits">{{hits}} results matched your search for: "{{prevQuery}}"</p>
    <transition-group
      class="grid-container"
      tag="div"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
    >
      <div
        v-bind:key="img.id"
        v-for="(img, index) in imgs"
        v-bind:data-index="index"
        class="img-wrapper"
        v-bind:style="{backgroundImage: 'url(' + img.webformatURL + ')'}"
      >
        <a v-bind:href="img.pageURL" class="link">Download</a>
        <div class="likes">{{img.likes}} Likes</div>
      </div>
    </transition-group>
    <button class="btn" v-on:click="loadNext" v-if="moreImgs">load more results</button>
  </div>
</template>



<script>
const API_KEY = "371483-f45e93963512d691fbc8bdcb7";

export default {
  name: "ImageGrid",
  data() {
    return {
      imgs: [],
      query: "Coffee",
      prevQuery: "",
      pageNum: 1,
      hits: "",
      moreImgs: true,
      perPage: "40"
    };
  },
  computed: {},
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.scaleX = 1.5;
      el.style.scaleY = 1.5;
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 50;
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 1, scaleX: 1.05, scaleY: 1.05 },
          { complete: done }
        );
        Velocity(el, { opacity: 1, scaleX: 1, scaleY: 1 }, { complete: done });
      }, delay);
    },
    search: function(event = null) {
      if (event != null) {
        event.preventDefault();
      }
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          this.query
        )}&per_page=${this.perPage}&page=1`
      )
        .then(res => res.json())
        .then(json => {
          this.moreImgs = true;
          this.prevQuery = this.query;
          this.imgs = json.hits;
          this.hits = json.total;
        });
    },
    loadNext: function() {
      if (event != null) {
        event.preventDefault();
      }
      this.pageNum++;
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          this.query
        )}&per_page=${this.perPage}&page=${this.pageNum}`
      )
        .then(res => res.json())
        .then(json => {
          this.imgs.push(...json.hits);
          if (json.hits.length < this.perPage) {
            this.moreImgs = false;
          }
        });
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

h1 {
  color: #fff;
  padding: 1em 0;
  max-width: 75%;
  margin: 0 auto;
  line-height: 1.5;
}
h1 a {
  color: palevioletred;
  border-bottom: 3px solid palevioletred;
  padding-bottom: 0.2em;
  border-bottom-style: dotted;
  text-decoration: none;
}
.container {
  padding: 2em;
  display: flex;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
  margin-bottom: 2em;
}
img {
  /* min-width: 100%; */
  /* max-width: 100%; */
}
.img-wrapper {
  position: relative;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  background-color: var(--bg-color);
  opacity: 0;
  border-radius: 5px;
  overflow: hidden;
}
.img-wrapper:before {
  content: "";
  padding-bottom: 100%;
  display: block;
}
.likes {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 1em;
  color: #fff;
  transform: translateY(100%);
}
.link {
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 1em;
  color: #fff;
  text-decoration: none;
  opacity: 0;
}
.img-wrapper:hover .link,
.img-wrapper:hover .likes {
  transform: none;
  transition: var(--transition-main);
  opacity: 1;
}
input[type="text"] {
  padding: 1em 2em;
  border: 3px solid transparent;
  /* width: 100%; */
  border-radius: 5px 0 0 5px;
  /* box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.3); */
  color: #fff;
  background: var(--input-bg-color);
  transition: 0.2s all;
  flex: 2;
}
input[type="text"]:focus {
  transition: var(--transition-main);
  background: #f5f5f5;
  color: #000;
  outline: 0;
  border: 3px solid palevioletred;
}
.search-container button {
  background: palevioletred;
  border: 3px solid transparent;
  border-radius: 0 5px 5px 0;
  color: #fff;
  font-weight: bold;
  flex: 1;
  transition: var(--transition-main);
}
.search-container button:hover {
  background: hsl(340, 57%, 44%);
  transition: var(--transition-main);
}
.search-container {
  justify-content: center;
}
form {
  display: flex;
  flex: 1;
  max-width: 800px;

  /* align-items: center; */
}
label {
  visibility: hidden;
  height: 0;
  width: 0;
}
.btn {
  background: palevioletred;
  border: 3px solid transparent;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  padding: 1em;
  cursor: pointer;
  transition: var(--transition-main);
}
.btn:hover,
.btn:active {
  background-color: hsl(340, 57%, 44%);
  transition: var(--transition-main);
}
.logo img {
  max-width: 100%;
  max-height: 50px;
}
</style>