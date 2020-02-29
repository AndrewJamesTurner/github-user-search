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
      <v-btn value="home" @click="homeSelected">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

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

    <v-snackbar
      v-model="snackbar"
    >
      You must first select a user
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    </v-app>
  </template>

  <script lang="ts">

  import Vue from 'vue';

  import {GithubUserSummary, searchGithubUsers, getGithubUser} from './ts/githubApi'

  export default Vue.extend({
    
  name: 'App',

    data: () => ({
      bottomNav: 'home',
      selectedGithubUsername: "",
      githubUsers: [] as GithubUserSummary[],
      snackbar: false,
    }),
        
    methods: {
      
      // used to handle interaction with the user search box.
      // Searching by string search the github users API.
      // Clicking on a found user selects that user.
      userSearchUpdated(newSelection: string|GithubUserSummary|null) {

        if(newSelection === null) {
          return
        }

        else if(typeof newSelection === 'string') {
          
          if(newSelection == "") {
            this.selectedGithubUsername = ""
            this.homeSelected()
          }
          else {
            searchGithubUsers(newSelection)
              .then(accountDetails => { this.githubUsers = accountDetails })
          }
        }
        else {
           getGithubUser(newSelection.login)
            .then(userDetails => {
              
              this.selectedGithubUsername = userDetails.login
              this.profileSelected()
              this.snackbar = false
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


      // the following functions are used to handle 
      // clicks on the bottom navigation
      homeSelected() {
        
        // there was an issue with the bottom nav selection not updating.
        // delaying this assignment to a future event fixed this.
        // TODO: look into this further to see if there is a more elegant solution
        setTimeout(() => {this.bottomNav = 'home'})
        
        this.navigateTo('home', this.selectedGithubUsername)
      },
      profileSelected() {

        if(this.selectedGithubUsername) {
          this.bottomNav = 'profile'
          this.navigateTo('profile', this.selectedGithubUsername)
        }
        else {
          this.homeSelected()
          this.snackbar = true
        }
      },
      activitySelected() {

        if(this.selectedGithubUsername) {
          this.bottomNav = 'activity'
          this.navigateTo('activity', this.selectedGithubUsername)
        }
        else {
          this.homeSelected()
          this.snackbar = true
        }
      },
      repositoriesSelected() {

        if(this.selectedGithubUsername) {
          this.bottomNav = 'repositories'
          this.navigateTo('repositories', this.selectedGithubUsername)
        }
        else {
          this.homeSelected()
          this.snackbar = true
        }
      },
    }
  });
  </script>
