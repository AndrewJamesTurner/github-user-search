<template>
  <div class="about">

    <v-card>
      
      <v-card-title>
        <h2>Repositories</h2>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="repositorySearch"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-card-text>

        <v-data-table
          :headers="tableHeaders"
          :items="githubUserRepositories"
          :search="repositorySearch"
          :custom-filter="repositoryTableSearchFilter"
          :items-per-page="-1"
          hide-default-footer
          show-expand
          single-expand
          :expanded.sync="tableExpanded"
          :no-data-text="`${githubUsername} has no repositories`"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <p>
                <a :href="item.homepage" target="_blank">{{item.homepage}}</a>
              </p>
              <p>{{item.description}}</p>
            </td>
          </template>
          
          <template v-slot:item.updated_at="{ item }">
            {{formatDate(item.updated_at)}}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import fuzzysort from 'fuzzysort'
import {getGithubUserRepositories, GithubUserRepository } from '../ts/githubApi';
import {formatDate} from '@/ts/helper'


export default Vue.extend({

  name: 'Repositories',

  props: {
    githubUsername: String,
  },

  data: () => ({
      githubUserRepositories: [] as GithubUserRepository[],
      repositorySearch: "",

      tableHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'License', value: 'license.name' },
        { text: 'Last Updated', value: 'updated_at' },
        { text: 'Language', value: 'language' },
        { text: '', value: 'data-table-expand' },
      ],

      tableExpanded: [],

      formatDate
  }),

  mounted() {

    this.$emit('updateGithubUsername', this.githubUsername)
    this.updateGithubUserRepositories(this.githubUsername)

  },

  methods: {
    
    updateGithubUserRepositories(githubUsername: string) {
      getGithubUserRepositories(githubUsername)
      .then(userRepositories => {
        this.githubUserRepositories = userRepositories
      })
      .catch(() => {
        this.$router.push({name: 'home'})
      })
    },

    // method of overriding vuetify's default search
    // https://vuetifyjs.com/en/components/data-tables#custom-filtering
    // makes use of the fuzzysort library
    repositoryTableSearchFilter(value: string, search: string, item: GithubUserRepository){

      // if no search term is provided, show all results
      if(search == "") {
        return true
      }
      else {

        // search on the same GithubUserRepository used by the table itself
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
      this.updateGithubUserRepositories(this.githubUsername)
    }
  }
});
</script>
