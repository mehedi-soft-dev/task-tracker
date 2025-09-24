import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  RequestParameters,
  Variables,
} from 'relay-runtime';

const HTTP_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2900/graphql';

const fetchFn: FetchFunction = async (
  request: RequestParameters,
  variables: Variables
) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  const json = await resp.json();

  if (json.errors) {
    throw new Error(
      `Error fetching GraphQL query '${
        request.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors
      )}`
    );
  }

  return json;
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();