<template>
  <div class="home">
     <v-card>
      <v-card-title>
        <h2>Github User Search</h2>
      </v-card-title>
      <v-card-text>
        <p>Welcome to the GitHub user search app. This is a simple web application for search the activity and repositories of GitHub users.</p>
        <p>To use the app type the name of the GitHub user you wish to search for in the top bar. This will present a list of GitHub users which match your search. Then click on the GitHub user you wish to view, or type an alternative search.</p>
        
      </v-card-text>
     </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>
