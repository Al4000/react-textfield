import './App.css'
import React, {useState} from 'react'

function App() {
  const [userText, setUserText] = useState('')
  const [result, setResult] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const classNames = ['red', 'green', 'blue', 'orange']
    const array = userText.split(' ')
    const tempArray = array.map((word, index) => {
      let className = classNames[Math.floor(Math.random() * classNames.length)];
      return <span className={className} key={index}>{word} </span>
    })
    setUserText(tempArray)
    setResult(true)
  }
  const handleChange = (e) => {
    setUserText(e.currentTarget.textContent)
  }
  const handleClear = () => {
    setUserText('')
    setResult(false)
  }

  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <div
          id="textarea"
          className={`textarea ${result ? 'hidden' : ''}`}
          onInput={handleChange}
          contentEditable
        />
        <div
          className={`textarea ${result ? '' : 'hidden'}`}
        >
          {userText}
        </div>
        <button className="button" type="submit">Анализировать</button>
        <button className="button" onClick={handleClear}>Очистить</button>
      </form>
    </div>
  )
}

export default App
