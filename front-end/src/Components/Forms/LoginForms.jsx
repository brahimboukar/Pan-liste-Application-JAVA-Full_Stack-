import { Link } from "react-router";
import InputText from "../UI/InputText";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Authentication from "../../Services/Authentication.js";

export default function LoginForms() {

  const email = useRef('')
  const password = useRef('')
  const [error , setError] = useState(null)

  const navigate = useNavigate();

  

  const handleSubmit = async(e) => {
     e.preventDefault()
     try {
      const userData = await Authentication.login(email.current.value,password.current.value)
      if(userData.token) {
        localStorage.setItem('token' , userData.token)
        localStorage.setItem('role' , userData.role)
        if(userData.role === 'ADMIN') {
          navigate('/dashbord')
        }
        else {
          navigate('/recomponse')
        }
      }
      else {
        setError(userData.error)
      }
     } catch (error) {
      console.log(error)
      setError(error)
      setTimeout(() => {
        setError('')
      },5000)
      
     }
  }
  
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Créer Votre Compte Gratuitement
              </h1>
              {error}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputText label={"Email *"}  ref={email}  type={"text"} placeholder={"Email"} />


              <InputText label={"Password *"}  ref={password} type={"password"} placeholder={"Password "} />

            
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center text-sm text-gray-700 dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  Keep me logged in
                </label>

                <span
                  className="text-sm text-brand-500 hover:text-brand-600"
                >
                  Forgot password?
                </span>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-500 py-3 text-sm font-medium text-white hover:bg-brand-600"
              >
                Créer compte
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-700 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/inscreption"
                className="text-brand-500 hover:text-brand-600"
              >
                Sign Up
              </Link>
            </p>
          </div>
    )
}