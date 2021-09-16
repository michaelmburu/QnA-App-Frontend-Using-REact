
/** @jsxRuntime classic */
/** @jsx jsx */
import { lazy, Suspense } from 'react';
import {jsx, css} from '@emotion/react';
import {fontFamily, fontSize, gray2} from './Styles';
import {HomePage} from './Homepage';
import {QuestionPage} from './QuestionPage';
import {HeaderWithRouter as Header} from './Header';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {SearchPage} from './SearchPage';
import {SignInPage} from './SignInPage';
import {NotFoundPage} from './NotFoundPage';
const AskPage = lazy(() => import('./AskPage'))
function App() {


  return (
    <div 
      css ={css`
      font-family: ${fontFamily};
      font-size: ${fontSize};
      color: ${gray2}   
      `}
    >  
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
      <Redirect from="/home" to="/" />
      <Route path="/" exact component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/ask" component={AskPage} >
        <Suspense
          fallback={
            <div
              css={css`
                margin-top: 100px;
                text-align: center;
              `}
            >
            Loading....
            </div>
          }
        >
        <AskPage/>
        </Suspense>
      </Route>
      <Route path="/signin" component={SignInPage} />
      <Route path="/questions/:questionId" component={QuestionPage} />
      <Route component={NotFoundPage}/>
      </Switch>    
    </div>
  </BrowserRouter>
    </div>
  );
}

export default App;
