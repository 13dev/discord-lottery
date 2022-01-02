import Discord, { ClientOptions, Intents, PresenceData } from 'discord.js'
import { Service } from 'typedi'

export interface BotSettings {
    presence: PresenceData
    clientOptions?: ClientOptions
    token?: string
    prefix: string
}

@Service()
class DiscordClient extends Discord.Client {
    private static instance: DiscordClient
    public config!: BotSettings
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ],
        })
    }

    public setConfig(Config: BotSettings): DiscordClient {
        this.config = Config
        return DiscordClient.instance
    }
}

export default DiscordClient
