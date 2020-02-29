<template>
  <div class="about">

    <v-card>
      
      <v-card-title>
        <h2>Repositories</h2>
      </v-card-title>

      <v-card-text>

        <v-data-table
          :headers="tableHeaders"
          :items="githubUserRepositories"
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
import {getGithubUserRepositories, GithubUserRepository } from '../ts/githubApi';
import {formatDate} from '@/ts/helper'


export default Vue.extend({

  name: 'Repositories',

  props: {
    githubUsername: String,
  },

  data: () => ({
      githubUserRepositories: [] as GithubUserRepository[],

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
  },

  watch: {
    githubUsername() {
      this.updateGithubUserRepositories(this.githubUsername)
    }
  }
});
</script>
