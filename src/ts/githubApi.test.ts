import { searchGithubUsers, getGithubUser, getGithubUserEvents, getGithubUserRepositories } from './githubApi'
import { GithubUserSummary, GithubUserDetails, GithubUserEvent, GithubUserRepository } from './githubApi'

test("basic use of searchGithubUsers", (done) => {

	const searchTerm = "Andy"

	const exampleGithubUserSummary: GithubUserSummary = {
		login: "test",
		id: 1,
	}

	searchGithubUsers(searchTerm)
		.then(gitHubUsers => {

			expect(gitHubUsers.length).toBeTruthy()

			const exampleReturnedGithubUser = gitHubUsers[0]

			// test that the fetched data has the expected keys
			// NOTE: this is only a shallow check
			// TODO: look into more comprehensive check that the structure
			// of the returned data is captured
			for (const key of Object.keys(exampleGithubUserSummary)) {
				expect(exampleReturnedGithubUser).toHaveProperty(key)
			}

			done()
		})
})

test("basic use of getGithubUser", (done) => {

	const testUserName = "AndrewJamesTurner"

	const exampleGithubUserDetails: GithubUserDetails = {
		login: "",
		id: 1,
		name: "",
		company: "",
		bio: "",
		avatar_url: "",
	}

	getGithubUser(testUserName)
		.then(githubUser => {

			// test that the fetched data has the expected keys
			// NOTE: this is only a shallow check
			// TODO: look into more comprehensive check that the structure
			// of the returned data is captured
			for (const key of Object.keys(exampleGithubUserDetails)) {
				expect(githubUser).toHaveProperty(key)
			}

			done()
		})
})

test("basic use of getGithubUserEvents", (done) => {

	const testUserName = "AndrewJamesTurner"

	const exampleGithubUserEvent: GithubUserEvent = {
		type: "",
		created_at: "",
		repo: {
			name: "",
		},
	}

	getGithubUserEvents(testUserName)
		.then(githubUserEvents => {

			expect(githubUserEvents.length).toBeTruthy()

			const exampleReturnedGithubUserEvent = githubUserEvents[0]

			// test that the fetched data has the expected keys
			// NOTE: this is only a shallow check
			// TODO: look into more comprehensive check that the structure
			// of the returned data is captured
			for (const key of Object.keys(exampleGithubUserEvent)) {
				expect(exampleReturnedGithubUserEvent).toHaveProperty(key)
			}

			done()
		})
})

test("basic use of getGithubUserRepositories", (done) => {

	const testUserName = "AndrewJamesTurner"

	const exampleGithubUserRepository: GithubUserRepository = {
		name: "",
		description: "",
		license: {
			name: "",
		},
		updated_at: "",
		language: "",
	}

	getGithubUserRepositories(testUserName)
		.then(githubUserRepositories => {

			expect(githubUserRepositories.length).toBeTruthy()

			const exampleReturnedGithubUserRepository = githubUserRepositories[0]

			// test that the fetched data has the expected keys
			// NOTE: this is only a shallow check
			// TODO: look into more comprehensive check that the structure
			// of the returned data is captured
			for (const key of Object.keys(exampleGithubUserRepository)) {
				expect(exampleReturnedGithubUserRepository).toHaveProperty(key)
			}

			done()
		})
})
