import axios from 'axios'

// The structure of the data returned by
// api.github.com/search/users
// Note: this is incomplete only the 
// properties used by this application
// are captured
export interface GithubUserSummary {
  login: string;
  id: number;
}

// The structure of the data returned by
// api.github.com/search/users/{username}
// Note: this is incomplete only the 
// properties used by this application
// are captured
export interface GithubUserDetails {
  login: string;
  id: number;
  name: string;
  company: string;
  bio: string;
  avatar_url: string;
}

// The structure of the data returned by
// api.github.com/search/users/{username}/events
// Note: this is incomplete only the 
// properties used by this application
// are captured
export interface GithubUserEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

// The structure of the data returned by
// api.github.com/search/users/{username}/repos
// Note: this is incomplete only the 
// properties used by this application
// are captured
export interface GithubUserRepository {
  name: string;
  description: string;
  license: {
    name: string;
  };
  updated_at: string;
  language: string;
}

export const searchGithubUsers = (searchTerm: string) => {

  return new Promise<GithubUserSummary[]>((resolve: (response: GithubUserSummary[]) => void, reject) => {

    axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
      .then(response => {
        resolve(response.data.items)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getGithubUser = (username: string) => {

  return new Promise<GithubUserDetails>((resolve: (response: GithubUserDetails) => void, reject) => {

    axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getGithubUserEvents = (username: string) => {

  return new Promise<GithubUserEvent[]>((resolve: (response: GithubUserEvent[]) => void, reject) => {

    axios.get(`https://api.github.com/users/${username}/events`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getGithubUserRepositories = (username: string) => {

  return new Promise<GithubUserRepository[]>((resolve: (response: GithubUserRepository[]) => void, reject) => {

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
