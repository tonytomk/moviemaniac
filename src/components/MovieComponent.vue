<template>
<div>
<nav class="navbar navbar-light bg-light">
    <input type="text" v-model="query" v-on:keyup.enter="updateQuery()" title="fill movie name and press enter " placeholder="search movie name" />
    <button type="submit" @click="updateQuery()"><i class="fa fa-search"></i></button>
</nav>
<div  class="container">
    <div class="row">
    <div v-for = "(movie,id) in movies" :key="id">
   <div class="column">
  <div class="card" style="width: 19rem;">
  <img v-if=movie.poster_path class="card-img-top" :src="'http://image.tmdb.org/t/p/w185//' + movie.poster_path" alt="Card image cap">
   <img  v-else src="https://via.placeholder.com/150" class="card-img-top" >
  <div class="card-body">
    <h5 class="card-title">{{ movie.title }}</h5>
    <p v-if="ismoreInfo === false" class="card-text" v-bind="resizeDescription(movie)">{{lessInfo}}
     <br><button class="btn btn-outline-primary btn-sm" @click="moreInfoClicked()" :title="movie.overview" >More</button>
    </p>
     <p v-if="ismoreInfo === true" class="card-text">{{movie.overview}}
       <br><button class="btn btn-outline-primary btn-sm" @click="moreInfoClicked()" >Less</button>
     </p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Release Date : {{movie.release_date}}</li>
    <li class="list-group-item">Ratings : {{movie.vote_average}}</li>
    <li class="list-group-item">Vote Count : {{movie.vote_count}}</li>
  </ul>
  <div class="card-body">
    <a :href="'https://www.themoviedb.org/movie/'+movie.id" target="_blank" class="btn btn-primary" :title="movie.title">{{ movie.title.slice(0,15) }}</a>
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
 public lessInfo: string = '';
 public moreInfo: string = '';
 public ismoreInfo: boolean = false;
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
public  moreInfoClicked(movie: any) {
 this.ismoreInfo = (this.ismoreInfo === false) ? true : false;
}
public resizeDescription(descript: any) {
  const descr = descript.overview;
  this.lessInfo = descr.length < 100 ? descr : descr.slice(0 , 100);
  this.$forceUpdate();
}

public moreInfoDescription(descript: any) {
  this.moreInfo = descript.overview;
  this.$forceUpdate();
}
}
</script>
<style>

.row {
  display: flex;
 
}
.column {
  padding: 5px;
  margin-left: 25%;
}
.card-text,.list-group-item,.a {
  text-align: left;
}
.navbar {
  display: flex;
  flex: 1 1;
}
input {
    width: 97.9%;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>