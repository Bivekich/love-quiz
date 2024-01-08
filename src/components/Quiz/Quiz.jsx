import './Quiz.css'
import {useRef, useState} from "react"
import {data} from "../../assets/data.js";
const Quiz = () => {

    let [index, setIndex] = useState(0)
    let [question, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)

    let option_array = [Option1, Option2, Option3]

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add('correct')
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add('wrong')
                setLock(true)
                option_array[question.ans-1].current.classList.add('correct')
            }
        }
    }

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true)
                return 0
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove('wrong')
                option.current.classList.remove('correct')
                return null
            })
        }
    }

    const reset = () => {
      setIndex(0)
      setQuestion(data[0])
      setScore(0)
      setLock(false)
      setResult(false)
    }

  return (
      <div className='container'>
          <h1>Любовный тест</h1>
          <hr/>
          {result ? <>
              <h2>Малышка, ты набрала {score} из {data.length} балов</h2>
              <button onClick={reset}>Начать заново</button>
          </> : <>
              <h2>{index + 1}. {question.question}</h2>
              <ul>
                  <li ref={Option1} onClick={(e) => {
                      checkAns(e, 1)
                  }}>{question.option1}</li>
                  <li ref={Option2} onClick={(e) => {
                      checkAns(e, 2)
                  }}>{question.option2}</li>
                  <li ref={Option3} onClick={(e) => {
                      checkAns(e, 3)
                  }}>{question.option3}</li>
              </ul>
              <button onClick={next}>Дальше</button>
              <div className='index'>{index + 1} из {data.length} вопросов</div>
          </>}



      </div>
  )
}

export default Quiz