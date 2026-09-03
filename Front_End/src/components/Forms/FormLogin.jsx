import React, {useState} from 'react';
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {axiosClient} from "../../api/axios.js";
import { useNavigate} from "react-router-dom";
const formSchema = z.object({
    email: z.string().email("Email Invalid").min(2).max(30),
    password: z.string().min(4,"\"Minimum 4 caractères\"").max(30)
})
function FormLogin() {
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const form = useForm({
        resolver : zodResolver(formSchema),
        defaultValues : {
            email: "",
            password: "",
        }
    })
    const dec = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const payload = JSON.parse(jsonPayload);
            return payload.role;
        } catch (error) {
            console.error("Token invalide", error);
            return null;
        }
    };
    const { formState: { isSubmitting } } = form
    const onSubmit = async (values) => {
        setErrors("");
        try {
            const res = await axiosClient.post('api/auth/login', values);
            if(res.data.statusCode === 200) {
                localStorage.setItem('token', res.data.token);
                const role = dec(res.data.token);
                if(role === "ROLE_ADMIN") {
                    navigate('/admin/dashboard');
                }
                else {
                    navigate('/recomponse')
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                setErrors(error.response.data.error);
                form.reset();
            } else {
                setErrors("Erreur serveur");
                form.reset();
            }
        }
    }
   return  <>
       {isSubmitting && (
           <div
               className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 backdrop-blur-sm"
               role="status"
               aria-live="polite"
               aria-busy="true"
           >
               <div className="flex flex-col items-center gap-4">
                   <div
                       className="h-14 w-14 rounded-full border-4 border-dashed border-yellow-400 animate-spin"
                       style={{ animationDuration: '0.9s' }}
                   />
                   <p className="text-sm font-medium text-slate-200">
                       Vérification en cours…
                   </p>
               </div>
           </div>
       )}
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           {errors && (
               <div className="bg-red-500 text-white p-2 rounded">
                   {errors}
               </div>
           )}
           <div>
               <label
                   htmlFor="email"
                   className="mb-1 block text-sm font-medium text-slate-200"
               >
                   Email
               </label>
               <input {...form.register('email')}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="exemple@email.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-400"
               />
               {form.formState.errors.email && (
                   <p className="text-red-500 text-sm">
                       {form.formState.errors.email.message}
                   </p>
               )}
           </div>

           <div>
               <label
                   htmlFor="password"
                   className="mb-1 block text-sm font-medium text-slate-200"
               >
                   Mot de passe
               </label>
               <input {...form.register('password')}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-400"
               />
               {form.formState.errors.password && (
                   <p className="text-red-500 text-sm">
                       {form.formState.errors.password.message}
                   </p>
               )}
           </div>

           <div className="flex items-center justify-between text-xs">
               <label className="flex items-center gap-2 text-slate-300">
                   <input type="checkbox" className="h-4 w-4 accent-indigo-500" />
                   Se souvenir de moi
               </label>
               <button
                   type="button"
                   className="text-indigo-400 hover:text-indigo-300"
               >
                   Mot de passe oublié ?
               </button>
           </div>

           <button
               type="submit" disabled={isSubmitting}
               className="w-full rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400"
           >
               Se connecter
           </button>
       </form>
   </>
}

export default FormLogin;