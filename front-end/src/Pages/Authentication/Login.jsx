import LoginForms from "../../Components/Forms/LoginForms";


export default function Login() {
  return (
    <div className="relative z-10 bg-white p-6 dark:bg-gray-900 sm:p-0">
      <div className="relative flex h-screen w-full flex-col justify-center dark:bg-gray-900 lg:flex-row">
        
        
        <div className="flex w-full flex-1 flex-col lg:w-1/2">
          <LoginForms />
        </div>

        <div className="relative hidden h-full w-1/2 items-center bg-brand-950 lg:grid">
          <div className="z-10 flex flex-col items-center">
            <img
              src="img/auth-logo.svg"
              alt="Logo"
              className="mb-4 w-56"
            />
            <p className="text-center text-gray-400">
              Free and Open-Source Tailwind CSS Admin Dashboard Template
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
