// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    min: 25,
    sec: 0,
    min1: 25,
    changeBtn: false,
  }

  playBtn = () => {
    this.setState({changeBtn: true})
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {min1, sec} = this.state
    if (min1 === 0 && sec === 0) {
      clearInterval(this.timerId)
    } else {
      const second = min1 * 60 - 1 + sec
      const m = Math.floor(second / 60)
      const s = second % 60
      this.setState({sec: s, min1: m})
    }
  }

  pauseBtn = () => {
    this.setState({changeBtn: false})
    clearInterval(this.timerId)
  }

  decrementTime = () => {
    const {changeBtn, min} = this.state
    if (!changeBtn) {
      if (min > 1) {
        this.setState(prevState => ({
          min: prevState.min - 1,
          min1: prevState.sec === 0 ? prevState.min1 - 1 : prevState.min1,
        }))
      }
    }
  }

  incrementTime = () => {
    const {changeBtn} = this.state
    if (!changeBtn) {
      this.setState(prevState => ({
        min: prevState.min + 1,
        min1: prevState.sec === 0 ? prevState.min1 + 1 : prevState.min1,
      }))
    }
  }

  timerReset = () => {
    clearInterval(this.timerId)
    this.setState({changeBtn: false, sec: 0, min1: 25, min: 25})
  }

  render() {
    const {changeBtn, sec, min} = this.state
    let {min1} = this.state
    if (!changeBtn && sec === 0) {
      min1 = min
    }
    const result = sec > 9 ? `${min1}:${sec}` : `${min1}:0${sec}`
    const status = changeBtn ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="h1">Digital Timer</h1>
        <div className="container">
          <div className="timer-container">
            <div className="content-card">
              <h1 className="min">{result}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="buttons-container">
            <div className="start-reset">
              {!changeBtn && (
                <div className="start">
                  <button type="button" className="btn" onClick={this.playBtn}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="icon"
                      alt="play icon"
                    />
                    Start
                  </button>
                </div>
              )}
              {changeBtn && (
                <div className="start">
                  <button type="button" className="btn" onClick={this.pauseBtn}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="icon"
                      alt="pause icon"
                    />
                    Pause
                  </button>
                </div>
              )}

              <div className="start">
                <button type="button" className="btn" onClick={this.timerReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="time-limit">Set Timer limit</p>
            <div className="limit-setter">
              <button
                type="button"
                className="button"
                onClick={this.decrementTime}
              >
                -
              </button>
              <p className="time-set">{min}</p>
              <button
                type="button"
                className="button"
                onClick={this.incrementTime}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
