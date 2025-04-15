import { z } from 'zod'
import { zCreateChannelTrpcInput } from '../createChannel/input'

export const zUpdateChannelTrpcInput = zCreateChannelTrpcInput.extend({
  channelId: z.string().min(1),
})
