import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqItem'

import './index.css'

class About extends Component {
  state = {faqs: [], isLoading: true}

  componentDidMount() {
    this.getFaqsData()
  }

  getFaqsData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    console.log(response)
    const statusCode = await response.statusCode
    console.log(statusCode)
    const data = await response.json()
    console.log(data)
    const formattedData = data.faq.map(eachItem => ({
      answer: eachItem.answer,
      category: eachItem.category,
      qno: eachItem.qno,
      question: eachItem.question,
    }))
    console.log(formattedData)
    this.setState({faqs: formattedData, isLoading: false})
  }

  render() {
    const {faqs, isLoading} = this.state
    console.log(isLoading)

    return (
      <div className="about-container">
        <Header />
        <div className="about-container2">
          <h1 className="about-header">About</h1>
          <p className="about-para">Last update on March 28th 2021</p>
          <p className="about-para2">
            COVID-19 vaccines be ready for distribution
          </p>
          {isLoading ? (
            <div testId="aboutRouteLoader">
              <Loader type="TailSpin" color="#007BFF" height={50} width={50} />
            </div>
          ) : (
            <ul testId="faqsUnorderedList" className="faqs-Unordered-List">
              {faqs.map(item => (
                <FaqItem faq={item} key={item.question} />
              ))}
            </ul>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default About
