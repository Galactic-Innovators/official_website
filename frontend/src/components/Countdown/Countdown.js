import React, { Component } from "react";
import "./Timer.css";

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    this.state = {
      days: 0,
      minutes: 0,
      hours: 0,
      seconds: 0,
      time_up: "",
    };
    this.x = null;
    this.deadline = null;
  }

  count() {
    var now = new Date().getTime();
    var t = this.deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);

    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    this.setState({ days, minutes, hours, seconds });

    if (t < 0) {
      clearInterval(this.x);
      this.setState({
        days: "00",
        minutes: "00",
        hours: "00",
        seconds: "00",
        time_up: "TIME IS UP",
      });
    }
  }

  componentDidMount() {
    // Set the deadline from props
    this.deadline = new Date(this.props.deadline).getTime();
    // Set the interval to call count every second
    this.x = setInterval(this.count, 1000);
  }

  componentWillUnmount() {
    // Clear the interval to prevent memory leaks
    clearInterval(this.x);
  }

  render() {
    const { days, hours, minutes, seconds, time_up } = this.state;
    return (
      <div id="countdown">
        <div className="col-4">
          <div className="box">
            <p id="day">{days}</p>
            <span className="text">Days</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="hour">{hours}</p>
            <span className="text">Hours</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="minute">{minutes}</p>
            <span className="text">Minutes</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="second">{seconds}</p>
            <span className="text">Seconds</span>
          </div>
        </div>
        {time_up && <div id="time-up">{time_up}</div>}
      </div>
    );
  }
}

export default CountDown;
