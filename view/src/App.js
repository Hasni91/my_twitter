import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Inscription from './component/register/Inscription';
import Connection from './component/register/Connection';
import Password from "./component/register/Password";
import HomePage from './component/Home/HomePage';
import Profile from './component/Home/Profile';
import Explore from "./component/Home/Explore";
import Messages from "./component/Home/Messages";
import User from "./component/Home/User";
import ID from './redux/ReduxId';
import Id_user from "./redux/ReduxId_user";
import Infos from "./redux/Redux_InfosUser";
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
const store = createStore(combineReducers({ID,Infos,Id_user}));
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Inscription/> }/>
          <Route path="*" element={<Inscription/>}/>
          <Route path="/connection" element={ <Connection/> }/>
          <Route path="/HomePage" element={ <HomePage/> }/>
          <Route path="/Profile" element={ <Profile/> }/>
          <Route path="/Password" element ={<Password/>}/>
          <Route path="/Explore" element ={<Explore/>}/>
          <Route path="/Messages" element ={<Messages/>}/>
          <Route path="/User" element ={<User/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;