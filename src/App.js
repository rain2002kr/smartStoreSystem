import React,{Component, Fragment} from 'react';
import './App.css';
import { HeadContainer } from './in_component/Header/HeadContainer.js';
import { AsideContainer } from './in_component/Aside/AsideContainer.js';
import { BodyContainer } from './in_component/Body/BodyContainer.js';
import { FooterContainer } from './in_component/Footer/FooterContainer.js';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => console.log(res))
      .catch(err => console.log(err,'test'));
  }
  
  callApi = async () => {
    const response = await fetch('/api/user/lkh');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  
   /*  
   async componentWillMount() {
    //fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
  }
  
  /* handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  }; */

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
            <div>{this.state.response ? this.state.response : "response loading" }</div>
            {/* <div>{this.state.post ? this.state.post : "post loading"}</div>
            <div>{this.state.responseToPost ? this.state.responseToPost : "responseToPost loading"}</div> */}

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
