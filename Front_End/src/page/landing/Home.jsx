import React from 'react';
import {Link} from "react-router-dom";
const partnerCompanies = [
    {
        id: 1,
        code: 'INS',
        name: 'Ipsos',
        description: "Institut d'études marketing",
        badgeColor: 'bg-indigo-500/20 text-indigo-300',
        imageUrl: './images/Ipsos_logo.svg',
    },
    {
        id: 2,
        code: 'RET',
        name: 'Toluna',
        description: 'Grande distribution & FMCG',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
        imageUrl: '/images/toluna_full_color.png',
    },
    {
        id: 3,
        code: 'FIN',
        name: 'Kantar',
        description: 'Banque & services financiers',
        badgeColor: 'bg-sky-500/20 text-sky-300',
        imageUrl: '/images/Logo_kantar.jpg',
    },
    {
        id: 4,
        code: 'ALC',
        name: 'Nielsen',
        description: 'Banque & services financiers',
        badgeColor: 'bg-sky-500/20 text-sky-300',
        imageUrl: '/images/Nielsen_New_Logo_2021.png',
    },
    {
        id: 5,
        code: 'NAT',
        name: 'IFOP',
        description: 'Banque & services financiers',
        badgeColor: 'bg-sky-500/20 text-sky-300',
        imageUrl: '/images/Ifop.svg.png',
    },
];

function Home() {
    return (
        <>
            <style>
                {`
          @keyframes partner-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
            </style>
            <div className="min-h-screen bg-slate-950 text-slate-50">
                {/* Navbar */}
                <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-xl font-black tracking-tight">
                                P
                            </div>
                            <div>
                                <p className="text-sm font-semibold leading-tight text-slate-50">
                                    PanelConnect
                                </p>
                                <p className="text-xs text-slate-400">Application Panéliste</p>
                            </div>
                        </div>

                        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
                            <a href="#features" className="hover:text-indigo-400 transition">
                                Fonctionnalités
                            </a>
                            <a href="#pricing" className="hover:text-indigo-400 transition">
                                Tarifs
                            </a>
                            <a href="#faq" className="hover:text-indigo-400 transition">
                                FAQ
                            </a>
                        </nav>

                        <div className="flex items-center gap-3">

                                <Link to="/login">
                                    <button  className="hidden rounded-full px-4 py-2 text-xs font-medium text-slate-200 ring-1 ring-slate-700 hover:bg-slate-900 md:inline-flex">
                                        Se connecter
                                    </button>
                                </Link>


                                <button  className="rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400">
                                   Créer Votre Compte
                                </button>

                        </div>
                    </div>
                </header>

                {/* Hero */}
                <main className="mx-auto max-w-6xl px-4 pb-24 pt-16">
                    <section className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                <span>Nouveau · Rejoignez des études et gagnez des récompenses</span>
                            </div>

                            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                                Rejoignez des missions,
                                <span className="block bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                valorisez votre opinion.
              </span>
                            </h1>

                            <p className="mt-5 max-w-xl text-sm text-slate-300 sm:text-base">
                                Accédez a des enquêtes ciblées, répondez en quelques minutes et
                                cumulez des points échangeables contre des cadeaux ou des
                                virements.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <button className="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400">
                                    Commencer gratuitement
                                </button>
                                <button className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900">
                                    Voir la démo
                                </button>
                                <p className="w-full text-xs text-slate-400 sm:w-auto sm:text-[11px]">
                                    Inscription gratuite · 100% en ligne
                                </p>
                            </div>

                            <div className="mt-10 grid gap-6 text-xs text-slate-300 sm:grid-cols-3 sm:text-sm">
                                <div>
                                    <p className="text-2xl font-semibold text-slate-50">+3K</p>
                                    <p className="text-slate-400">panélistes actifs chaque mois</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-slate-50">+98%</p>
                                    <p className="text-slate-400">de missions validées</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-slate-50">&lt; 5 min</p>
                                    <p className="text-slate-400">pour compléter votre 1re mission</p>
                                </div>
                            </div>
                        </div>

                        {/* Right hero card */}
                        <div className="relative">
                            <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-gradient-to-br from-indigo-500/40 via-sky-400/10 to-emerald-400/20 opacity-60 blur-3xl" />
                            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-900/80">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium text-slate-200">
                                        Tableau de bord panéliste
                                    </p>
                                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                  Temps réel
                </span>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                                    <div className="rounded-2xl bg-slate-900/80 p-3">
                                        <p className="text-[11px] text-slate-400">Missions</p>
                                        <p className="mt-1 text-lg font-semibold text-slate-50">
                                            128
                                        </p>
                                        <p className="mt-1 text-[11px] text-emerald-400">
                                            +23 cette semaine
                                        </p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-900/80 p-3">
                                        <p className="text-[11px] text-slate-400">Taux de validation</p>
                                        <p className="mt-1 text-lg font-semibold text-slate-50">
                                            87%
                                        </p>
                                        <p className="mt-1 text-[11px] text-emerald-400">
                                            +8 pts vs moyenne
                                        </p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-900/80 p-3">
                                        <p className="text-[11px] text-slate-400">Points cumulés</p>
                                        <p className="mt-1 text-lg font-semibold text-slate-50">
                                            3 420
                                        </p>
                                        <p className="mt-1 text-[11px] text-slate-400">
                                            +180 cette semaine
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-sky-500/10 to-emerald-500/15 p-4">
                                    <p className="text-xs font-medium text-slate-100">
                                        Recommandation intelligente
                                    </p>
                                    <p className="mt-2 text-xs text-slate-200">
                                        Les missions de profil complété a 100% rapportent en moyenne
                                        <span className="font-semibold text-emerald-300"> +35%</span>{" "}
                                        de points.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Partenaires entreprises */}
                    <section className="mt-24">
                        <div className="border-t border-slate-800 pt-10">
                            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                                        Grandes entreprises d’études de marché qui nous font confiance.
                                    </h2>
                                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                                        PanelConnect collabore avec des instituts d&apos;études, des
                                        marques et des agences pour proposer des missions sérieuses et
                                        bien rémunérées à nos panélistes.
                                    </p>
                                </div>

                                <div className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs text-slate-300">
                                    <span className="font-semibold text-emerald-300">+40</span>{" "}
                                    entreprises actives ce mois-ci
                                </div>
                            </div>

                            <div className="mt-8 overflow-hidden">
                                <div
                                    className="flex min-w-max gap-12 md:gap-16"
                                    style={{
                                        animation: 'partner-scroll 22s linear infinite',
                                    }}
                                >
                                    {[...partnerCompanies, ...partnerCompanies].map((company, index) => (
                                        <div
                                            key={`${company.id}-${index}`}
                                            className="flex items-center gap-3 text-slate-400"
                                        >
                                            {company.imageUrl ? (
                                                <img
                                                    src={company.imageUrl}
                                                    alt={company.name}
                                                    className="h-7 object-contain opacity-70"
                                                />
                                            ) : (
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300/40 text-[10px] font-semibold opacity-70">
                                                    {company.code}
                                                </div>
                                            )}
                                            <span className="text-sm font-medium opacity-80">
                      {company.name}
                    </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Features */}
                    <section id="features" className="mt-24">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                                    Pensé pour les panélistes qui veulent des missions fiables.
                                </h2>
                                <p className="mt-2 max-w-xl text-sm text-slate-300">
                                    Du matching intelligent jusqu&apos;au paiement des gains, toute
                                    votre expérience est centralisée.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-3">
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                                    <span className="text-lg">⚡</span>
                                </div>
                                <h3 className="mt-4 text-sm font-semibold text-slate-50">
                                    Matching personnalisé
                                </h3>
                                <p className="mt-2 text-xs text-slate-300">
                                    Recevez des études adaptées a votre profil pour augmenter vos
                                    chances de validation.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                                    <span className="text-lg">📊</span>
                                </div>
                                <h3 className="mt-4 text-sm font-semibold text-slate-50">
                                    Suivi des gains en temps réel
                                </h3>
                                <p className="mt-2 text-xs text-slate-300">
                                    Suivez vos missions terminées, vos points cumulés et vos
                                    paiements en un seul endroit.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                                    <span className="text-lg">🔗</span>
                                </div>
                                <h3 className="mt-4 text-sm font-semibold text-slate-50">
                                    Récompenses flexibles
                                </h3>
                                <p className="mt-2 text-xs text-slate-300">
                                    Convertissez vos points en cartes cadeaux, transferts mobile ou
                                    virement bancaire.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="mt-24">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                                Des tarifs simples, sans surprise.
                            </h2>
                            <p className="mt-2 text-sm text-slate-300">
                                Commencez gratuitement, puis passez à un plan adapté à votre
                                équipe.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-stretch">
                            <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                                        Starter
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold text-slate-50">
                                        0€
                                        <span className="text-sm font-normal text-slate-400">
                    {" "}
                                            / mois
                  </span>
                                    </p>
                                    <p className="mt-2 text-xs text-slate-300">
                                        Idéal pour tester la plateforme ou pour des projets ponctuels.
                                    </p>

                                    <ul className="mt-4 space-y-2 text-xs text-slate-300">
                                        <li>• Accès aux missions standard</li>
                                        <li>• Bonus de bienvenue</li>
                                        <li>• Historique des récompenses</li>
                                        <li>• Support communautaire</li>
                                    </ul>
                                </div>

                                <button className="mt-6 w-full rounded-full border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900">
                                    Démarrer avec le plan gratuit
                                </button>
                            </div>

                            <div className="relative rounded-2xl border border-indigo-500/70 bg-gradient-to-br from-indigo-600/30 via-slate-900 to-slate-950 p-1">
                                <div className="rounded-2xl bg-slate-950/80 p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                                                Premium Panéliste
                                            </p>
                                            <p className="mt-3 text-3xl font-semibold text-slate-50">
                                                39€
                                                <span className="text-sm font-normal text-slate-400">
                        {" "}
                                                    / mois
                      </span>
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-semibold text-white">
                    Le plus populaire
                  </span>
                                    </div>

                                    <p className="mt-2 text-xs text-slate-300">
                                        Pour les panélistes qui veulent maximiser leurs opportunités
                                        et débloquer des récompenses premium.
                                    </p>

                                    <ul className="mt-4 space-y-2 text-xs text-slate-200">
                                        <li>• Accès prioritaire aux missions</li>
                                        <li>• Multiplicateur de points</li>
                                        <li>• Seuil de retrait réduit</li>
                                        <li>• Retraits accélérés</li>
                                        <li>• Missions partenaires exclusives</li>
                                        <li>• Support prioritaire</li>
                                    </ul>

                                    <button className="mt-6 w-full rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400">
                                        Passer au plan Pro
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>



                    {/* FAQ simple */}
                    <section id="faq" className="mt-24 border-t border-slate-800 pt-12">
                        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                                    Questions fréquentes
                                </h2>
                                <p className="mt-2 text-sm text-slate-300">
                                    Une autre question ? Contactez-nous et nous reviendrons vers
                                    vous sous 24h.
                                </p>
                            </div>

                            <div className="space-y-5 text-sm">
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                    <p className="font-medium text-slate-100">
                                        Est-ce que je peux tester gratuitement ?
                                    </p>
                                    <p className="mt-2 text-xs text-slate-300">
                                        Oui, vous pouvez utiliser le plan Starter gratuitement, sans
                                        carte bancaire, et passer au plan Pro uniquement si la
                                        plateforme vous convient.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                    <p className="font-medium text-slate-100">
                                        Comment suis-je payé ?
                                    </p>
                                    <p className="mt-2 text-xs text-slate-300">
                                        Vous pouvez retirer vos gains selon les options disponibles
                                        dans votre espace: carte cadeau, mobile money ou virement.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                    <p className="font-medium text-slate-100">
                                        Comment augmenter mes invitations ?
                                    </p>
                                    <p className="mt-2 text-xs text-slate-300">
                                        Complétez votre profil, répondez régulièrement et gardez un
                                        bon taux de qualité pour recevoir plus de missions ciblées.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-slate-800 bg-slate-950/90">
                    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>© {new Date().getFullYear()} PanelConnect. Tous droits réservés.</p>
                        <div className="flex gap-4">
                            <button className="hover:text-slate-300">Confidentialité</button>
                            <button className="hover:text-slate-300">CGU</button>
                            <button className="hover:text-slate-300">Contact</button>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Home;
