import { BrowserRouter as Router } from 'react-router-dom'
import { cache } from './cache';
import Header from './components/Header';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import AppRoutes from './AppRoutes';
import ConfirmationModalContextProvider from './components/ConfirmationContextModal';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ConfirmationModalContextProvider>
          <Router>
            <Header />
            <div className="container">
              <AppRoutes />
            </div>
          </Router>
        </ConfirmationModalContextProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
