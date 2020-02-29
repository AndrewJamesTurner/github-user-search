<template>
  <div class="home">
     <v-card>
      <v-card-title>
        <h2>Github User Search</h2>
      </v-card-title>
      <v-card-text>
        <p>Welcome to the GitHub user search app. This is a simple web application for search the activity and repositories of GitHub users.</p>
        <p>To use the app type the name of the user you wish to query. This will present a list of current GitHub users which match your search. You then click on the user you wish to view, or type an alternative search.</p>
        
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
