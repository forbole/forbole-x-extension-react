import WebSocket from 'isomorphic-ws'
import { ApolloClient, InMemoryCache, split, HttpLink, ApolloLink, concat } from '@apollo/client'
import { getMainDefinition, concatPagination } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import { useMemo } from 'react'
import cryptocurrencies from '../misc/cryptocurrencies'

const defaultOptions: any = {
  watchQuery: {
    // fetchPolicy: 'no-cache',
    // errorPolicy: 'ignore',
  },
  query: {
    // fetchPolicy: 'no-cache',
    // errorPolicy: 'all',
  },
}

let apolloClient:any

const links:any = {}
Object.keys(cryptocurrencies).forEach((crypto) => {
  const httpLink = new HttpLink({
    uri: cryptocurrencies[crypto].graphqlHttpUrl,
  })

  const wsLink = new WebSocketLink({
    uri: cryptocurrencies[crypto].graphqlWsUrl,
    options: {
      reconnect: true,
      lazy: true,
      inactivityTimeout: 30000,
    },
    webSocketImpl: WebSocket,
  })

  const link =
    typeof window !== 'undefined'
      ? split(
          ({ query }) => {
            const { kind, operation }: any = getMainDefinition(query)
            return kind === 'OperationDefinition' && operation === 'subscription'
          },
          wsLink,
          httpLink
        )
      : httpLink

  links[crypto] = link
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {},
  })

  return forward(operation)
})

const directiveMiddleware = new ApolloLink((operation) => {
  // TODO: custom directive is not supported in Hasura 2.0, need to rewrite structure for handling multi endpoint

  // const { query } = operation

  // const definition = getMainDefinition(query)

  // const foundDirective =
  //   'operation' in definition &&
  //   definition.directives?.find((item) => Object.keys(cryptocurrencies).includes(item.name.value))
  // const directive = foundDirective ? foundDirective.name.value : 'default'
  // if (!links[directive]) {
  //   return null
  // }
  // return links[directive].request(operation)
  return (Object.values(links)[0] as any).request(operation)
})

function createApolloClient() {
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, directiveMiddleware),
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

  client.defaultOptions = defaultOptions

  return client
}

export function initializeApollo(initialState = null) {
  // eslint-disable-next-line
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState,
    })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
