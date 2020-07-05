import React,{Component, Fragment} from 'react';
import './App.css';
import { HeadContainer } from './in_component/Header/HeadContainer.js';
import { AsideContainer } from './in_component/Aside/AsideContainer.js';
import { BodyContainer } from './in_component/Body/BodyContainer.js';
import { FooterContainer } from './in_component/Footer/FooterContainer.js';


class App extends Component {
 
  render()  
  {
  var headComponent = <HeadContainer/>;
  var asideComponent = <AsideContainer/>;
  var mainComponent = <BodyContainer/>;
  var footComponent = <FooterContainer/>;
  
  return (
    <Fragment key="App">
      <div className="main-container">
        <header className="App-header">
              {headComponent}
        </header>
        <div className="sub-container">
        <aside className="App-aside">
            {asideComponent}
        </aside>
        <main className="App-main">   
            {mainComponent}
        </main>
        </div>
        <footer className="App-footer">
          {footComponent}
        </footer>
      </div>
    </Fragment>
    );
  }
}
export default App;
