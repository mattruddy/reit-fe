import React, { useEffect } from 'react';
import {getAccount} from './data/api'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dividendState, emailState, investorState, isLoggedInState, tokenState, transactionState } from './store';
import { AUTH_TOKEN } from './utils/const';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from './page/Login';
import Header from './component/Header';
import Signup from './page/Signup';
import Home from './page/Home';
import Setting from './page/Setting';
import { Profile } from './utils/type';
import About from './page/About';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import GlobalToast from './component/GlobalToast';

function App() {
  const [token, setToken] = useRecoilState(tokenState)
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState)
  const setEmail = useSetRecoilState(emailState)
  const setTransactions = useSetRecoilState(transactionState)
  const setDividends = useSetRecoilState(dividendState)
  const setInvestor = useSetRecoilState(investorState)

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN)
    if (storedToken) {
      setToken(storedToken)
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [setLoggedIn, setToken])

  useEffect(() => {
    if (token) {
      ;(async () => {
        try {
          const resp = await getAccount(token) as Profile
          setEmail(resp.email)
          if (resp.investor) {
            setInvestor(resp.investor)
            setDividends(resp.investor.dividends)
            setTransactions(resp.investor.transactions)
          }
        } catch (error) {
        }
      })()
    }
  }, [setDividends, setEmail, setInvestor, setTransactions, token])

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    setToken(undefined)
    setLoggedIn(false)
    setInvestor(undefined)
    setDividends(undefined)
    setTransactions(undefined)
    setEmail(undefined)
  }

  return (
    <BrowserRouter>
      {loggedIn !== undefined &&
      <> <Header logOut={logout} />
      <div style={{marginTop: "60px"}}>
        <Switch>
          <Route path="/" render={() => 
            loggedIn ? <Home /> : <Redirect to="/login" />
          } exact />
          <Route path="/settings" render={() => 
            loggedIn ? <Setting /> : <Redirect to="/login" />
          } exact />
          <Route path="/login" render={() => (
            loggedIn ? <Redirect to="/" /> : <Login />
          )} exact />
          <Route path="/signup" render={() => (
            loggedIn ? <Redirect to="/" /> : <Signup />
          )} exact />
          <Route path="/about" component={About} />
        </Switch>
        <GlobalToast />
      </div> </>}
    </BrowserRouter>
  );
}

export default App;
