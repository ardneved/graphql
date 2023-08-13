import { BrowserRouter as Router } from 'react-router-dom'
import { cache } from './cache';
import Header from './components/Header';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import AppRoutes from './AppRoutes';
import ConfirmationModalContextProvider from './components/ConfirmationContextModal';
import { Container } from 'react-bootstrap';

const client = new ApolloClient({
  // uncomment for dev api
  // uri: 'http://localhost:3000/graphql',
  uri: 'http://3.234.21.115:3001/graphql',
  cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ConfirmationModalContextProvider>
          <Router>
            <Header />
            <Container>
              <AppRoutes />
            </Container>
          </Router>
        </ConfirmationModalContextProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
