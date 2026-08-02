import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Build credentials config only when explicit keys are provided.
// When running on AWS (EC2, ECS, Lambda, App Runner, etc.) with an IAM role,
// leave AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY unset and the SDK will
// automatically use the instance/task role via the default credential chain.
const explicitCredentials =
  process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }
    : {}

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? 'ap-southeast-1',
  ...explicitCredentials,
})

const BUCKET = process.env.AWS_S3_BUCKET_NAME ?? ''
const EXPIRES_IN = parseInt(process.env.AWS_PRESIGNED_URL_EXPIRES_IN ?? '3600', 10)

/**
 * Returns a presigned GET URL for the given S3 object key.
 * Returns null when the key is null / undefined / empty.
 */
export async function getPresignedUrl(key: string | null | undefined): Promise<string | null> {
  if (!key) return null
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key })
  return getSignedUrl(s3, command, { expiresIn: EXPIRES_IN })
}

/**
 * Maps an array of S3 keys to presigned URLs in parallel.
 * Null / empty keys produce null entries in the result array.
 */
export async function getPresignedUrls(
  keys: (string | null | undefined)[],
): Promise<(string | null)[]> {
  return Promise.all(keys.map(getPresignedUrl))
}
