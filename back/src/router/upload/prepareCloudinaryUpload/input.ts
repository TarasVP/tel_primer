import { cloudinaryUploadTypes } from '@glimmung/shared/src/cloudinary'
import { getKeysAsArray } from '@glimmung/shared/src/getKyesAsArray'
import { z } from 'zod'

export const zPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
})