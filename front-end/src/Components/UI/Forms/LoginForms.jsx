export default function LoginForms() {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Créer Votre Compte Gratuitement
              </h1>
              
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="info@gmail.com"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Password *
                </label>

                <div className="relative">
                  <input
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 pr-11 text-sm dark:border-gray-700 dark:text-white"
                  />

                  
                </div>
              </div>

            
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
              <span
                to="/signup"
                className="text-brand-500 hover:text-brand-600"
              >
                Sign Up
              </span>
            </p>
          </div>
    )
}