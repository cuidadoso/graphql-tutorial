import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloProvider, graphql} from 'react-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
    makeExecutableSchema,
    addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
    // link: new HttpLink(mockNetworkInterface),
    link: new HttpLink({uri: `https://dev.icontact.one/api/graphql`}),
    cache: new InMemoryCache(),
    networkInterface: mockNetworkInterface,
});

const ChannelsList = ({data: {loading, error, channels}}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return <ul>
        {channels.map(ch => <li key={ch.id}>{ch.name}</li>)}
    </ul>;
};

const channelsListQuery = gql`
    query ChannelsListQuery {
        channels {
            id
            name
        }
    }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

const apiList = ({data: {loading, error, apis}}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return <ul>
        {apis.map(ch => <li key={ch.value}>{ch.title}</li>)}
    </ul>;
};

const apiListQuery = gql`
    query getApi {
        ApiList {
            edges {
                node {
                    title,
                    api
                }
            }
        }
    }
`;

const ApiListWithData = graphql(apiListQuery)(apiList);

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to Apollo</h1>
                    </header>
                    <ApiListWithData/>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
