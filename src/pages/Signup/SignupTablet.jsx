import AuthForm from "../../components/AuthForm/AuthForm"
import "../Login/Login.css"

const SignupTablet = () => {

  return(
    <div className="login-form-tablet-container">
      <div className="forms-tablet">
        <img src="/Logo/Logo.svg" alt="Logo" />
        <AuthForm type={"signup"}/>
      </div>
    </div>
  )
}

export default SignupTablet;