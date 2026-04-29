import "./Icons.css"

const Icons = ({icon, size}) => {

  return(
    <div className={`icons-container ${size}`}>
      <i className={icon}/>
    </div>
  )
}

export default Icons;