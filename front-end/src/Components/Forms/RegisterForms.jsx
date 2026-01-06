import { useEffect, useState } from "react"
import Authentication from "../../Services/Authentication"
import ToastSucces from "../Toasts/ToastSucces";
import { Toaster } from "react-hot-toast";

export default function RegisterForms() {
  const [toastMsg,setToastMsg] = useState('')
  const [afficheToast , setAfficheToast] = useState(false)
  const [formData , setFormData] = useState({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      id_sexe: "",
      id_region: "",
      id_fonction: "",
      id_fonction_details: "",
      dateNaissance: "",
      password: "",
  })
  const handleInputChange = (e) => {
    const {name,value} = e.target;

    if(name.startsWith("id_")) {
      setFormData({
        ...formData,
        [name]: value ? { id: Number(value) } : "",
      })
    } else {
      setFormData({
      ...formData, [name] : value
    });
    }
   
  }
    const [sexeListe , setSexeListe]= useState([])
    const [regionListe , setRegionListe]= useState([])
    const [fonctionListe , setFonctionListe]= useState([])
    const [selectedFonction, setSelectedFonction] = useState("");
    const [fonctionDetailerListe , setFonctionDetailerListe]= useState([])

     const  fetchSexe = async() => {
        // eslint-disable-next-line no-useless-catch
       try {
        const data = await Authentication.getAllSexe();
        setSexeListe(data)
       } catch (error) {
        console.error("Erreur chargement sexe", error);
       }
    }
    const fetchRegion = async() => {
      try {
        const data = await Authentication.getAllRegion();
        setRegionListe(data)
       } catch (error) {
        console.error("Erreur chargement Region", error);
       }
    }
    const fetchFonction = async() => {
      try {
        const data = await Authentication.getAllFonction();
        setFonctionListe(data)
       } catch (error) {
        console.error("Erreur chargement Fonction", error);
       }
    }
    const fetchFonctionDetailler  = async(keyFonction) => {
      try {
        const data = await Authentication.getAllFonctionDetailler(keyFonction);
        setFonctionDetailerListe(data)
       } catch (error) {
        console.error("Erreur chargement Fonction détailler", error);
       }
    } 
    
    useEffect(() => {
       fetchSexe();
       fetchRegion();
       fetchFonction();
       
    },[])
    useEffect(() => {
      if(selectedFonction === "1" || selectedFonction === "2") {
        fetchFonctionDetailler(selectedFonction)
       }
       else {
        setFonctionDetailerListe([])
       }
    },[selectedFonction])
    const dispalySexe = () => {
        return sexeListe.map((sex, key) => {
            return <option value={sex.id}  key={key}>{sex.libelle}</option>
        })
    }
    const displayeRegion = () => {
      return regionListe.map((reg,key) => {
        return <option value={reg.id} key={key}>{reg.libelle}</option>
      })
    }
    const displayFonction = () => {
      return fonctionListe.map((fon) => {
        return <option key={fon.id} value={fon.id}>{fon.libelle}</option>
      })
    }
    const displayFonctionDetailler = () => {
      return fonctionDetailerListe.map((fond) => {
        return <option key={fond.id} value={fond.id}>{fond.libelle}</option>
      })
    }
    const handleFonctionChange = (e) => {
    const value = e.target.value;

    setSelectedFonction(value);

    setFormData({
        ...formData,
        id_fonction: value ? { id: Number(value) } : "",
        id_fonction_details: ""
    });
    }
    const handleSubmit = async (e) => {
      e.preventDefault();

      const token = localStorage.getItem("token");

      try {
        const res = await Authentication.register(formData, token);

        switch (res.statusCode) {
          case 200:
          case 201:
            setFormData({
              nom: "",
              prenom: "",
              email: "",
              telephone: "",
              id_sexe: "",
              id_region: "",
              id_fonction: "",
              id_fonction_details: "",
              dateNaissance: "",
              password: "",
            });

            setToastMsg(res.msg || "Inscription réussie ");
            break;

          case 400:
            setToastMsg(res.msg || "Données invalides");
            break;

          case 401:
            setToastMsg("Non autorisé ");
            break;

          case 409:
            setToastMsg(res.msg || "Email déjà existant ");
            break;

          case 422:
            setToastMsg("Champs manquants ou invalides ");
            break;

          case 500:
            setToastMsg("Erreur serveur ");
            break;

          default:
            setToastMsg("Une erreur inconnue est survenue ");
        }

        setAfficheToast(true);

      } catch (error) {
        console.error("Erreur inscription :", error);

        // cas Axios
        if (error.response) {
          setToastMsg(error.response.data?.msg || "Erreur serveur ");
        } else {
          setToastMsg("Impossible de contacter le serveur 🌐");
        }

        setAfficheToast(true);
      }
};

    return (
          <form className="space-y-4" onSubmit={handleSubmit}>
          {afficheToast && <ToastSucces title={toastMsg} message="D'abbord vous pouver Accéer à application." onClose={() => setAfficheToast(false)} />}
            <div className="flex gap-3">
                <input type="text" placeholder="Prénom" name="prenom" onChange={handleInputChange}
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
                <input type="text" placeholder="Nom" name="nom" onChange={handleInputChange}
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <input type="email" placeholder="E-mail" name="email" onChange={handleInputChange}
                className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <div className="flex gap-3">
                <input type="text" placeholder="Telephone" name="telephone" onChange={handleInputChange}
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
                <input type="date" placeholder="Data Naissance" name="dateNaissance" onChange={handleInputChange}
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <select value={formData.id_sexe?.id || ""} name="id_sexe" onChange={handleInputChange} className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
              <option  value={""} disabled selected>Choisissez Votre Sexe</option>
                {dispalySexe()}
              </select>
              <select value={formData.id_region?.id || ""} name="id_region" onChange={handleInputChange} className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                <option  value={""} disabled selected>Choisissez Votre Région</option>
                {displayeRegion()}
              </select>
              <select value={formData.id_fonction?.id || ""} name="id_fonction"  onChange={handleFonctionChange} className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                <option value={""} disabled selected>Choisissez Votre Fonction</option>
                {displayFonction()}
              </select>
             {
              (selectedFonction === "1" || selectedFonction === "2") && (
                 <select  value={formData.id_fonction_details?.id || ""} name="id_fonction_details" onChange={handleInputChange}  className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                <option  value={""} disabled selected>Choisissez Votre Fonction Détailler</option>
               {displayFonctionDetailler()}
              </select>
              )
             }
              <input type="password" placeholder="Password" name="password" onChange={handleInputChange}
                className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              {/* Checkboxes */}
              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                J'ai lu et j'accepte les{" "}
                <span className="text-indigo-600">Conditions générales</span>
              </label>

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                J'accepte la{" "}
                <span className="text-indigo-600">Politique de confidentialité</span>
              </label>

              {/* Button */}
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Inscrivez-vous gratuitement
              </button>

            </form>
    )
}