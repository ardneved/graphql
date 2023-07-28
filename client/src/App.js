import { cache } from './cache';
import Clients from './components/Clients';
import Header from './components/Header';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import AddClientModal from './components/AddClientModal';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
