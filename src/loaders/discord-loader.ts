import DiscordClient from '@src/discord-client'
import {settings} from '@src/config'
import {Logger} from '@utils/logger'
import events from '@events/index'
import {Inject, Service} from 'typedi'

@Service()
export default class DiscordLoader {
    constructor(@Inject() private client: DiscordClient) {
        Logger.info('Initing bot!')

        client.setConfig(settings)

        this.initializeEvents(client)

        client.login(settings.token).then()
    }

    public initializeEvents(client: DiscordClient): void {
        for (const event of events) {
            // @ts-ignore
            const Event = new event(client)

            Logger.info('Event loaded', event)

            client.on(Event.type.toString(), (...args: string[]) => Event.run(args))
        }
    }

}


