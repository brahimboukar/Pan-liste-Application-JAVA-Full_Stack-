import { useEffect, useState } from "react"
import Authentication from "../../Services/Authentication"

export default function RegisterForms() {
    const [sexe , setSexe]= useState([])
    const [region , setRegion]= useState([])

     const  getSexe = async() => {
        // eslint-disable-next-line no-useless-catch
       try {
        const data = await Authentication.getAllSexe();
        setSexe(data)
       } catch (error) {
        console.error("Erreur chargement sexe", error);
       }
    }
    const getRegion = async() => {
      try {
        const data = await Authentication.getAllRegion();
        setRegion(data)
       } catch (error) {
        console.error("Erreur chargement Region", error);
       }
    } 
    
    useEffect(() => {
       getSexe();
       getRegion();
    },[])
    const dispalySexe = () => {
        return sexe.map((sex, key) => {
            return <option key={key}>{sex.libelle}</option>
        })
    }
    const displayeRegion = () => {
      return region.map((reg,key) => {
        return <option key={key}>{reg.libelle}</option>
      })
    }
    return (
        <div className="flex w-full items-center justify-center px-4 py-10 lg:w-1/2">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            
            <h2 className="mb-6 text-lg font-semibold text-gray-800">
              Rejoignez Nous  la communauté <span className="text-indigo-600">Panéle Express</span>
            </h2>
            <form className="space-y-4">
            <div className="flex gap-3">
                <input type="text" placeholder="Prénom"
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
                <input type="text" placeholder="Nom"
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <input type="email" placeholder="E-mail"
                className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <div className="flex gap-3">
                <input type="text" placeholder="Telephone"
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
                <input type="date" placeholder="Data Naissance"
                  className="w-1/2 rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <select className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                {dispalySexe()}
              </select>
              <select className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                {displayeRegion()}
              </select>
              <select className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                <option>Choisissez Fonction</option>
                <option>France</option>
                <option>Maroc</option>
              </select>
              <select className="w-full rounded-md border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                <option>Choisissez Fonction Détailler</option>
                <option>France</option>
                <option>Maroc</option>
              </select>
              <input type="password" placeholder="Password"
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
          </div>
        </div>
    )
}