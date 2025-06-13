import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zSignUpTrpcInput } from './input'
import { getPasswordHash } from '../../../utils/getPasswordHash'
import { signJWT } from '../../../utils/signJWT'
import { sendWelcomeEmail } from '../../../lib/emails'
import { ExpectedError } from '../../../lib/errors'

export const signUpTrpcRoute = trpcLoggedProcedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUserWithNick = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exUserWithNick) {
    throw new ExpectedError('User with this nick already exists')
  }
  const exUserWithEmail = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })
  if (exUserWithEmail) {
    throw new ExpectedError('User with this email already exists')
  }
  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
      email: input.email,
    },
  })

  void sendWelcomeEmail({ user })
  const token = signJWT(user.id)
  return { token }
})
