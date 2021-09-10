
/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react';
import {fontFamily, fontSize, gray2} from './Styles';
import {HomePage} from './Homepage';
import { Header } from './Header';
function App() {
  return (
    <div 
      css ={css`
      font-family: ${fontFamily};
      font-size: ${fontSize};
      color: ${gray2}   
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
