<template>
<div>
<nav class="navbar navbar-light bg-light">
    <input type="text" v-model="query" v-on:keyup.enter="updateQuery()" title="fill movie name and press enter " placeholder="movie name" />
</nav>
<div  class="container">
    <div class="row">
    <div v-for = "(movie,id) in movies" :key="id">
   <div class="column">
  <div class="card" style="width: 18rem;">
  <img v-if=movie.poster_path class="card-img-top" :src="'http://image.tmdb.org/t/p/w185//' + movie.poster_path" alt="Card image cap">
   <img  v-else src="https://via.placeholder.com/150" class="card-img-top" >
  <div class="card-body">
    <h5 class="card-title">{{ movie.title }}</h5>
    <p class="card-text">{{ movie.overview }}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Release Date : {{movie.release_date}}</li>
    <li class="list-group-item">Ratings : {{movie.vote_average}}</li>
    <li class="list-group-item">Vote Count : {{movie.vote_count}}</li>
  </ul>
  <div class="card-body">
    <a :href="'https://www.themoviedb.org/movie/'+movie.id" class="btn btn-primary">{{ movie.title }}</a>
  </div>
</div>
</div>
</div>       
</div>
</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component, Inject } from 'vue-property-decorator';
import {} from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import axios, {AxiosPromise} from 'axios';
import {VueApiServices} from '../services/VueApiServices';
@Component({
  components: { },
})
export default  class MovieComponent extends Vue {
 public query: string = '';
 public movies: any = [];

  @Inject('vueApiServices')
  private vueApiServices!: VueApiServices;

//  public updateQuery(): any {
//       const query = this.query;
//       const url = 'https://api.themoviedb.org/3/search/movie?api_key=1dd2fa567bab9c7180a9944d7cf5f3ea&query=';
//       axios.get(url + query).then((response) => {
//           this.movies = response.data.results;
//           this.$forceUpdate();
//       });
// }
public updateQuery(): any {
if (!this.vueApiServices) {
    return;
}
this.vueApiServices.getMovieDetails(this.query).then((response) => {
  if (response.data) {
    this.movies = response.data.results;
    this.$forceUpdate();
  }
});
}
}
</script>
<style>

.row {
  display: flex;
   flex-wrap: wrap;
}
.column {
  flex: 33.33%;
  width: 100%;
  padding: 5px;
 
}
.card-text,.list-group-item,.a {
  text-align: left;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>