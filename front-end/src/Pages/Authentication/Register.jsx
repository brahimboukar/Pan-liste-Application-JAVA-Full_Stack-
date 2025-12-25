import { Link } from "react-router";
import InputText from "../../Components/UI/InputText";
import RegisterForms from "../../Components/Forms/RegisterForms";


export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        
        {/* LEFT SIDE */}
        <div className="flex w-full flex-col justify-center px-8 py-16 lg:w-1/2">
         

          <h1 className="mb-6 text-4xl font-bold leading-tight">
            Répondez à des enquêtes,<br />
            donnez votre avis et gagnez des{" "}
            <span className="text-green-600">récompenses</span>.
          </h1>

          <p className="mb-4 text-gray-600">
            Rejoignez Ipsos, l'une des principales sociétés d'études de marché mondiales.
          </p>

          <p className="text-gray-600">
            Votre voix compte et vous en serez récompensé !
          </p>
        </div>

      <RegisterForms />
        
      </div>
    </div>
  );
}
