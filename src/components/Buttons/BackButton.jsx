import "./Button.css"

const BackButton = ({color, handleClick}) => {

  return(
    <div 
      className={`main-back-button-container ${color}`}
      onClick={handleClick}
    >
      <div className="main-back-button">
        <i className="fa-solid fa-angle-left"></i>
      </div>

      <span className="main-back-text">Back</span>
    </div>
  )
}

export default BackButton;