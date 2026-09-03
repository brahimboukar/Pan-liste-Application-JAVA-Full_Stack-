import {Link} from "react-router-dom";
import FormLogin from "../../components/Forms/FormLogin.jsx";

export default function Login() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-50">
                <div className="grid w-full max-w-5xl gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">

                    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/80">
                        <div className="mb-6 text-center md:text-left">
                            <h1 className="mt-2 text-3xl font-bold">Connexion</h1>
                            <p className="mt-2 text-sm text-slate-300">
                                Connectez-vous avec votre email et mot de passe pour accéder à votre espace panéliste.
                            </p>
                        </div>
                        <FormLogin />

                        <p className="mt-6 text-center text-sm text-slate-300 md:text-left">
                            Vous n&apos;avez pas de compte ?{' '}
                            <Link
                                to="/register"
                                className="font-semibold text-indigo-400 hover:text-indigo-300"
                            >
                                Créer un compte
                            </Link>
                        </p>
                    </div>

                    {/* Right animated image */}
                    <div className="relative hidden h-full items-center justify-center md:flex">
                        <div className="relative h-[520px] w-full max-w-md rounded-[2.3rem] bg-slate-900/40 p-3 shadow-2xl shadow-slate-950/70">
                            <div
                                className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-900"
                                style={{ animation: 'login-float 6s ease-in-out infinite' }}
                            >
                                <img
                                    src="/images/logo_image.png"
                                    alt="Panélistes connectés"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* small decorative dots */}
                            <div className="pointer-events-none absolute -left-8 top-8 h-12 w-12 rounded-full border border-slate-700/60" />
                            <div className="pointer-events-none absolute -right-6 bottom-10 h-10 w-10 rounded-full border border-indigo-500/40" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
