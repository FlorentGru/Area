import getActions from "../Action"
import getReactions from "../Reaction"
import config from './config'

localStorage.setItem("address", config.ngrok)
localStorage.setItem("token", config.token)

// LOCAL STORAGE MARCHE PAS SUR LES TESTS

test('get actions', async () => {
    const response = await getActions()
    if (response !== 400)
    {
        expect(response.discord.length).toBe(2)
        expect(response.github.length).toBe(2)
        expect(response.dropbox.length).toBe(4)
        expect(response.gmail.length).toBe(0)
        expect(response.slack.length).toBe(0)
        expect(response.zoho.length).toBe(0)
        expect(response.timer.length).toBe(2)
    }
})

test('get reaction', async () => {
    const response = await getReactions()
    if (response !== 400)
    {
        expect(response.discord.length).toBe(1)
        expect(response.github.length).toBe(1)
        expect(response.dropbox.length).toBe(0)
        expect(response.gmail.length).toBe(1)
        expect(response.slack.length).toBe(1)
        expect(response.zoho.length).toBe(1)
        expect(response.timer.length).toBe(0)
    }
})