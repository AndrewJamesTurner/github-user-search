<template>
  <div class="about">
    <v-card>
      <v-card-title>
        <h2>Recent Activity</h2>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="activitySearch"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="tableHeaders"
          :items="githubUserEventDetails"
          :search="activitySearch"
          :custom-filter="tagTableSearchFilter"
          :items-per-page="-1"
          hide-default-footer
          :no-data-text="`${githubUsername} has no recent activities`"
        >
          <template v-slot:item.repo.name="{ item }">
            <a :href="`https://github.com/${item.repo.name}/`" target="_blank">{{item.repo.name}}</a>
          </template>
          <template v-slot:item.created_at="{ item }">
            {{formatDate(item.created_at)}}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import fuzzysort from 'fuzzysort'
import {getGithubUserEvents, GithubUserEvent } from '../ts/githubApi';
import {formatDate} from '@/ts/helper'

export default Vue.extend({

  name: 'Activity',

  props: {
    githubUsername: String,
  },

  data: () => ({

      githubUserEventDetails: [] as GithubUserEvent[],
      activitySearch: "", 

      tableHeaders: [
        { text: 'Type', value: 'type' },
        { text: 'Repository', value: 'repo.name' },
        { text: 'Date', value: 'created_at' },
      ],

      formatDate
  }),

  mounted() {

    this.$emit('updateGithubUsername', this.githubUsername)
    this.updateGithubUserEventDetails(this.githubUsername)

  },

  methods: {
    
    // used to update the state of githubUserEventDetails
    updateGithubUserEventDetails(githubUsername: string) {
      getGithubUserEvents(githubUsername)
      .then(userEventDetails => {
        this.githubUserEventDetails = userEventDetails
      })
      .catch(() => {
        // in case of error, return to the home page
        this.$router.push({name: 'home'})
      })
    },

    // method of overriding vuetify's default search
    // https://vuetifyjs.com/en/components/data-tables#custom-filtering
    // makes use of the fuzzysort library
    tagTableSearchFilter(value: string, search: string, item: GithubUserEvent){

      // if no search term is provided, show all results
      if(search == "") {
        return true
      }
      else {

        // search on the same GithubUserEvent used by the table itself
        const itemKeysToSearchOn = this.tableHeaders.map(x => x.value)

        const results = fuzzysort.go(
          search, 
          [item], 
          {
            keys: itemKeysToSearchOn
          }
        )
    
        // if fuzzysort finds any hits, show result in table
        return results.length > 0
      }
    },
  },

  watch: {
    githubUsername() {
      this.updateGithubUserEventDetails(this.githubUsername)
    }
  }
});

</script>