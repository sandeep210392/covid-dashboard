import './index.css'

const FaqItem = props => {
  const {faq} = props
  // eslint-disable-next-line
  const {answer, qno, question, category} = faq

  return (
    <div>
      <li>
        <h1 className="question">{question}</h1>
        <p className="answer">{answer}</p>
      </li>
    </div>
  )
}

export default FaqItem
