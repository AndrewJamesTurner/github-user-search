<template>
  <div class="about">

    <v-card>
      
      <v-card-title>
        <h2>Recent Activity</h2>
      </v-card-title>

      <v-card-text>

        <v-data-table
          :headers="tableHeaders"
          :items="githubUserEventDetails"
          :items-per-page="-1"
          hide-default-footer
          :no-data-text="`${githubUsername} has no recent activites`"
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
import {getGithubUserEvents, GithubUserEvent } from '../ts/githubApi';
import {formatDate} from '@/ts/helper'

export default Vue.extend({

  name: 'Activity',

  props: {
    githubUsername: String,
  },

  data: () => ({
      githubUserEventDetails: [] as GithubUserEvent[],

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
    updateGithubUserEventDetails(githubUsername: string) {
      getGithubUserEvents(githubUsername)
      .then(userEventDetails => {
        this.githubUserEventDetails = userEventDetails
      })
      .catch(() => {
        this.$router.push({name: 'home'})
      })
    },
  },

  watch: {
    githubUsername() {
      this.updateGithubUserEventDetails(this.githubUsername)
    }
  }

});
</script>