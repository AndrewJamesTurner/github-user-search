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

    components: {
      
    },

    data: () => ({
      bottomNav: 'profile',
      selectedGithubUsername: "",
      githubUsers: [] as GithubUserSummary[]
    }),
    
    mounted() {
      // this.githubUsers = [{login:"sdfsdf", id:1}]
    },
    
    methods: {
      
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
      closeSearchBox() {
        
        const appElement = document.getElementById('app')

        if(appElement) {
          appElement.click();
        }

      },

      selectedGithubUserUpdated(newUsername: string) {
        this.selectedGithubUsername = newUsername
      },

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
      }
    }
  });
  </script>
