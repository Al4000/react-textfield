import './App.css'
import React, {useState} from 'react'

function App() {
  const [userText, setUserText] = useState('')
  const [result, setResult] = useState(false)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/response.json")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        }
      )
    setResult(true)
  }
  const handleClear = () => {
    setResult(false)
    setUserText('')
    setData([])
  }
  const handleHighlight = (arg) => {
    setFilter(arg)
  }

  return (
    <div className="App">
      <form action="">
        {result
          ? (
            <div className="control-block">
              <div className="control-block__item" onClick={() => handleHighlight('unique')}>
                <span className="control-block__item__round red"/> <span
                className="control-block__item__text">Уникальность</span>
              </div>
              <div className="control-block__item" onClick={() => handleHighlight('spam')}>
                <span className="control-block__item__round blue"/> <span
                className="control-block__item__text">Заспамленность</span>
              </div>
              <div className="control-block__item" onClick={() => handleHighlight('stop')}>
                <span className="control-block__item__round green"/> <span
                className="control-block__item__text">Стоп-слова</span>
              </div>
              <div className="control-block__item" onClick={() => handleHighlight('error')}>
                <span className="control-block__item__round yellow"/> <span
                className="control-block__item__text">Ошибки</span>
              </div>
            </div>
          )
          : null
        }
        <div
          className="textarea"
          contentEditable={!result}
          suppressContentEditableWarning={true}
        >
          {!result ? userText
            : data.map((el, index)=> {
              let className = "el"

              if (el.spam && filter === 'spam') {
                className += ' spam'
              }
              if (el.unique && filter === 'unique') {
                className += ' unique'
              }
              if (el.stop && filter === 'stop') {
                className += ' stop'
              }
              if (el.error && filter === 'error') {
                className += ' error'
              }
              return <span className={className} key={index}>{el.word}</span>
            })
          }
        </div>
        {!result
          ? <button className="button" type="submit" onClick={handleSubmit}>Анализировать</button>
          : <button className="button" type="reset" onClick={handleClear}>Очистить</button>
        }
      </form>
    </div>
  )
}

export default App
