import ENV from '@enviroment'
import { LoginInput } from '@generated/graphql'

async function useGetLoginSys({PASSWORD, USERNAME} :LoginInput) {
    try {
        const results = await fetch(ENV.URL + '/graphql', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                query: `mutation Login($input: LoginInput!) {
            login(input: $input) {
              data {
                USER_ID
                USERNAME
                ROLES
                SEDE_ID
                token
              }
              errors {
                field
                message
              }
            }
          }
        `,
                variables: {
                    input: {
                        PASSWORD,
                        USERNAME
                    }
                }
            })
        })
        const data = await results.json()
        return data
    } catch (e) {
        return { error: 'ERROR' }
    }
}

export { useGetLoginSys }
