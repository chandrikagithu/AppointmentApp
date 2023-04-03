// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], stared: false}

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  submitDetails = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStared: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  changeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  changeDateInput = event => {
    this.setState({date: event.target.value})
  }

  changeBackground = () => {
    this.setState(prevState => ({stared: !prevState.stared}))
  }

  getFilteredList = () => {
    const {appointmentList, stared} = this.state
    if (stared) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStared === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, stared} = this.state
    const filteredAppointmentList = this.getFilteredList()

    return (
      <div className="container">
        <div className="app-container">
          <div className="input-container">
            <form className="form form-container" onSubmit={this.submitDetails}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label-name">
                TITLE
              </label>
              <input
                id="title"
                value={title}
                className="input-value"
                placeholder="Title"
                onChange={this.changeTitleInput}
              />
              <label htmlFor="Date" className="label-name">
                DATE
              </label>
              <input
                type="date"
                id="Date"
                className="input-value"
                value={date}
                onChange={this.changeDateInput}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />

          <div className="appointment-container">
            <h1 className="appoint-title">Appointments</h1>
            <button
              type="button"
              className={stared ? 'unstarred starred' : 'unstarred'}
              onClick={this.changeBackground}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filteredAppointmentList.map(eachList => (
              <AppointmentItem
                key={eachList.id}
                eachList={eachList}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
