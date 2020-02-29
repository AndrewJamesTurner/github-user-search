<template>
  <div class="userProfile">
    <v-card>
      <v-card-title>
        <h2>{{githubUsername}}</h2>
      </v-card-title>
      <v-card-text>
        <div v-if="githubUserDetails">
          <a style="font-size: 12px" :href="githubUserDetails.html_url">{{githubUserDetails.html_url}}</a>
          <v-row>
            <v-col cols="5">
              <img 
              :src="githubUserDetails.avatar_url" 
              alt="avatar"
              style="max-width:30vw; max-height: 200px"
            >
            </v-col>
            <v-col>
              <v-row v-for="detail in details.filter(x => githubUserDetails[x.key])" :key="detail.key">
                <v-col cols="1">
                  <v-icon>{{detail.icon}}</v-icon>
                </v-col>
                <v-col style="padding-left: 20px;">
                  {{githubUserDetails[detail.key]}}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="text-align: center" v-for="stat in stats" :key="stat.name">
              <p style="margin-bottom: 0px">{{stat.name}}</p>
              <p>{{githubUserDetails[stat.key]}}</p>
            </v-col>
          </v-row>
          <v-row v-if="githubUserDetails">
            <v-col>
              {{githubUserDetails.bio}}
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { getGithubUser, GithubUserDetails } from '../ts/githubApi';

export default Vue.extend({

  name: 'UserProfile',

  props: {
    githubUsername: String,
  },

  data: () => ({
      githubUserDetails: null as null|GithubUserDetails,
      
      details: [
        {
          icon: "mdi-account",
          key: "name"
        },
        {
          icon: "mdi-briefcase",
          key: "company"
        },
        {
          icon: "mdi-map-marker",
          key: "location"
        },
        {
          icon: "mdi-post-outline",
          key: "blog"
        },
      ],

      stats: [
        { 
          name: "Following",
          key: "following"
        },
        { 
          name: "Followers",
          key: "followers"
        },
        { 
          name: "Repositories",
          key: "public_repos"
        },
        { 
          name: "Gists",
          key: "public_gists"
        }
      ]
    }),

  mounted() {

    this.$emit('updateGithubUsername', this.githubUsername)
    this.updateGithubUserDetails(this.githubUsername)
  },

  methods: {

    // used to update the state of githubUserDetails
    updateGithubUserDetails(githubUsername: string) {
      getGithubUser(githubUsername)
      .then(userDetails => {
        this.githubUserDetails = userDetails
      })
      .catch(() => {
        this.$router.push({name: 'home'})
      })
    }
  },

  watch: {
    githubUsername() {
      this.updateGithubUserDetails(this.githubUsername)
    }
  }
});

</script>
