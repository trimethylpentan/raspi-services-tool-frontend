import React, {useState} from "react";
import cookie from "cookie";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const userName = React.createRef();
  const password = React.createRef();

  const submit = (event) => {
    event.preventDefault();

    fetch('http://testing.raspi-services-tools.local/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        "user-name": userName.current.value,
        "password": password.current.value
      }),
    })
      .then((result) => result.json())
      .then((jsonResult) => {
        console.log(jsonResult);
        props.setCredentials(jsonResult.token);
        document.cookie = cookie.serialize('token', jsonResult.token);
        setLoggedIn(true);
      })
      .catch((error) => setError(error))

  }

  if (isLoggedIn) {
    //TODO: Redirect
  }

  return <div className={'row col-12'}>
    {error && <div className={'alert alert-danger'}>An error occurred: {error.toString()}</div>}
    <form className={'col-6'} onSubmit={submit}>
      <div className={'form-group col-6'}>
        <label htmlFor={'user-name'} className={'text-light'}>Username</label>
        <input type={'text'} name={'user-name'} placeholder={'Username'} className={'form-control'} ref={userName}/>
      </div>
      <div className={'form-group col-6'}>
        <label htmlFor={'password'} className={'text-light'}>Password</label>
        <input type={'password'} name={'password'} placeholder={'Password'} className={'form-control'} ref={password}/>
      </div>
      <input type={'submit'} value={'Login'} className={'col-2'}/>
    </form>
  </div>
}

export default Login;