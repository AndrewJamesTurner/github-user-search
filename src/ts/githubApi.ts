import axios from 'axios'

export interface GithubUserSummary {
    login: string;
    id: number;
}

export interface GithubUserDetails {
    login: string;
    id: number;
    name: string;
    company: string;
    bio: string;
    avatar_url: string;
}

export interface GithubUserEvent {
    x: number;
}

export interface GithubUserRepository {
    x: number;
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
                console.log(response.data)
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
                console.log(response.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
