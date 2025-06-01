import { zStringRequired } from '@glimmung/shared/src/zod'
import { zCreateChannelTrpcInput } from '../createChannel/input'

export const zUpdateChannelTrpcInput = zCreateChannelTrpcInput.extend({
  channelId: zStringRequired,
})
