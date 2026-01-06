import { Link } from "react-router";
import InputText from "../UI/InputText";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Authentication from "../../Services/Authentication.js";
import AlertDanger from "../Alert/AlertDanger.jsx";
import Loader from "../Loader/Loader.jsx";

export default function LoginForms() {

  const email = useRef('')
  const password = useRef('')
  const [error , setError] = useState(null)
  const [validationErreur , setValidationErreur] = useState({})
  const [loading , setLoading] = useState(false)

  const navigate = useNavigate();

  

  const handleSubmit = async(e) => {
     e.preventDefault()
     setValidationErreur({})
     setError('')
     let erreurObject = {}
     if(!email.current.value) {
      erreurObject.email = "Le Champ Email Est Obligatoire"
     }
      if (email.current.value &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email.current.value)) 
      {
      erreurObject.email = "Email N'est Pas Valide";
      }
     if(!password.current.value) {
      erreurObject.password = "Le Champ Password Est Obligatoire"
     }

     if(Object.keys(erreurObject).length > 0) {
      setValidationErreur(erreurObject);
      return;
     }
     
     setLoading(true)
     try {
        const userData = await Authentication.login(email.current.value,password.current.value)
        localStorage.setItem('token' , userData.token)
        localStorage.setItem('role' , userData.role)
        if(userData.role === 'ADMIN') {
          navigate('/dashbord')
        }
        else {
          navigate('/recomponse')
        }
     } catch (err) {
      if (err.response) {
      setError(err.response.data.error);
      email.current.value=''
      password.current.value=''
    } else {
      setError("Erreur serveur réessayez plus tard");
    }
     }
     finally {
      setLoading(false)
    }
  }
  
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Créer Votre Compte Gratuitement
              </h1>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <AlertDanger text={error}/>}
              <InputText label={"Adresse électronique *"} ref={email} error={validationErreur.email}   type={"text"} placeholder={"Votre@address.com"} />
              

              <InputText label={"Mot de passe *"}  ref={password} error={validationErreur.password}  type={"password"} placeholder={"Mot de passe"} />
              
            
              <div className="flex items-center justify-between">
                

                <span
                  className="text-sm text-brand-500 hover:text-brand-600"
                >
                  Mot de passe oublié ?
                </span>
              </div>
              <button
        type="submit"
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600"}
        `}
      >
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          "Se connecter"
        )}
      </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-700 dark:text-gray-400">
              Vous n&apos;avez pas de compte?{" "}
              <Link
                to="/inscreption"
                className="text-brand-500 hover:text-brand-600"
              >
              Inscrivez-vous
              </Link>
            </p>
          </div>
    )
}