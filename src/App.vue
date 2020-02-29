  <template>
    <v-app>
      <v-app-bar
        app
        color="primary"
        dark
      >
        <v-combobox
          :items="githubUsers"
          label="Search Github Users"
          single-line
          prepend-icon="search"
          append-icon=""
          hide-details
          item-text="login"
          item-value="id"
          @change="userSearchUpdated"
        ></v-combobox>
      </v-app-bar>

      <v-content>
        <v-container>
          <router-view
            @updateGithubUsername="selectedGithubUserUpdated"
          ></router-view>
        </v-container>
      </v-content>
      <v-bottom-navigation
      v-model="bottomNav"
      fixed
      app
      grow
    >      
      <v-btn value="profile" @click="profileSelected">
        <span>Profile</span>
        <v-icon>mdi-emoticon-outline</v-icon>
      </v-btn>

      <v-btn value="activity" @click="activitySelected">
        <span>Activity</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn value="repositories" @click="repositoriesSelected">
        <span>Repositories</span>
        <v-icon>mdi-source-repository-multiple</v-icon>
      </v-btn>
    </v-bottom-navigation>
    </v-app>
  </template>

  <script lang="ts">

  import Vue from 'vue';

  import {GithubUserSummary, searchGithubUsers, getGithubUser} from './ts/githubApi'

  export default Vue.extend({
    
  name: 'App',

    data: () => ({
      bottomNav: 'profile',
      selectedGithubUsername: "",
      githubUsers: [] as GithubUserSummary[]
    }),
        
    methods: {
      
      // used to handle interaction with the user search box.
      // Searching by string search the github users API.
      // Clicking on a found user selects that user.
      userSearchUpdated(newSelection: string|GithubUserSummary) {

        if(typeof newSelection === 'string') {
          
          searchGithubUsers(newSelection)
            .then(accountDetails => { this.githubUsers = accountDetails })
        }
        else {
           getGithubUser(newSelection.login)
            .then(userDetails => {
              
              this.selectedGithubUsername = userDetails.login
              this.profileSelected()
            })
        }
      },

      // helper function for handling app level navigation
      // in case of error it navigates to the home page
      navigateTo(destination: string, githubUsername: string) {
        this.$router.push(
          {
            name: destination, 
            params: { 
              githubUsername: githubUsername
            } 
          },
          undefined,
          (error) => {
            
            if(error.name != "NavigationDuplicated") {

              this.closeSearchBox()
              this.bottomNav = 'profile'
              this.$router.push({name: 'home'})
            }            
          }
        )
      },

      // Force a click outside of the combobox
      // to close the on screen mobile keyboard
      // TODO: see if there is a more elegant solution.
      closeSearchBox() {
        
        const appElement = document.getElementById('app')

        if(appElement) {
          appElement.click();
        }
      },

      // used by router-view to handle the case where a
      // inner component needs to change the app level 
      // selectedGithubUsername. For instance when 
      // directly navigating to a users repositories
      // rather than though the search field. 
      selectedGithubUserUpdated(newUsername: string) {
        this.selectedGithubUsername = newUsername
      },


      // the following three functions are used to handle 
      // clicks on the bottom navigation
      profileSelected() {
        this.bottomNav = 'profile'
        this.navigateTo('profile', this.selectedGithubUsername)
      },
      activitySelected() {
        this.bottomNav = 'activity'
        this.navigateTo('activity', this.selectedGithubUsername)
      },
      repositoriesSelected() {
        this.bottomNav = 'repositories'
        this.navigateTo('repositories', this.selectedGithubUsername)
      },
    }
  });
  </script>
