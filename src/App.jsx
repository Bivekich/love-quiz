import Quiz from "./components/Quiz/Quiz.jsx"
import {useState} from "react";

const App = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginError, setLoginError] = useState(false)

    const usersData = [
        { username: 'enfo4ka', password: '0101' },
        { username: 'enfo4ka', password: '54489654321DianaLevLove' },
    ]

    const handleLogin = (e) => {
        e.preventDefault()

        const foundUser = usersData.find((user) => user.username === username && user.password === password)

        if (foundUser) {
            setIsLoggedIn(true)
            setLoginError(false)
            console.log('Успешная авторизация')
        } else {
            setIsLoggedIn(false)
            setLoginError(true)
            console.log('Ошибка: неверные данные для входа')
        }

    }

  return (
      <>
          {isLoggedIn ? (
              <Quiz />
          ) : (
              <div className='login-container'>
                  <h2>Авторизация</h2>
                  <form onSubmit={handleLogin} className='login-form'>
                      <input className='input-field' type="text" placeholder='Имя пользователя' value={username}
                             onChange={(e) => setUsername(e.target.value)}/>
                      <input className='input-field' type="password" placeholder='Имя пользователя' value={password}
                             onChange={(e) => setPassword(e.target.value)}/>
                      <button className='login-button' type='submit'>Войти</button>
                      {loginError && <p className='error-message'>Неверные данные для входа!</p>}
                  </form>
              </div>

          )}

      </>
  )
}

export default App