const URL_DEV_LOCAL = 'http://localhost:3004'
const URL_DEV = process.env.NEXT_PUBLIC_URL_DEV ?? ''
const URL_PRD = process.env.NEXT_PUBLIC_URL_PRD ?? ''
const URL_QA = process.env.NEXT_PUBLIC_URL_QA ?? ''

const URL_INTERNAL_DEV_LOCAL = 'http://localhost:3004'
const URL_INTERNAL_DEV = process.env.NEXT_PUBLIC_URL_INTERNAL_DEV ?? ''
const URL_INTERNAL_PRD = process.env.NEXT_PUBLIC_URL_INTERNAL_PRD ?? ''
const URL_INTERNAL_QA = process.env.NEXT_PUBLIC_URL_INTERNAL_QA ?? ''

const ENV = {
  DEV_LOCAL: { URL: URL_DEV_LOCAL, INTER_URL: URL_INTERNAL_DEV_LOCAL },
  DEV: { URL: URL_DEV, INTER_URL: URL_INTERNAL_DEV },
  PRD: { URL: URL_PRD, INTER_URL: URL_INTERNAL_PRD },
  QA: { URL: URL_QA, INTER_URL: URL_INTERNAL_QA }
}

export default ENV.DEV
