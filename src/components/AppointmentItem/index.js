// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachList, toggleIsStarred} = props
  const {title, date, isStared, id} = eachList
  const returnStar = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const changeStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-details">
      <div className="title-star">
        <p className="name">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={changeStar}
        >
          <img src={returnStar} className="star-image" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
