import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { concatPagination } from '@apollo/client/utilities'
import chains from '../../misc/chains'

//
// Object.values(chains).forEach((c) => {
//   endpoints[`${c.symbol}bdjuno`] = c.graphqlHttpUrl
//   endpoints[`${c.symbol}djuno`] = c.djunoUrl
// })

export const endpoints = Object.values(chains).reduce((acc, c) => {
  return {
    ...acc,
    [`${c.symbol}bdjuno`]: c.graphqlHttpUrl,
    [`${c.symbol}djuna`]: c.djunoUrl,
  }
}, {})

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints,
      createHttpLink: () => (createHttpLink as any)(),
    }),
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: concatPagination(),
        },
      },
    },
  }),
})

export default client
