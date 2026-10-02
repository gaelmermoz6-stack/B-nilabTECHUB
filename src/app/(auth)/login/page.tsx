"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasError(false);
    if (!isLoaded) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    setIsLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status !== "complete" || !result.createdSessionId) {
        setHasError(true);
        return;
      }
      await setActive({ session: result.createdSessionId });
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="register-page">
      <section className="register-intro" aria-label="Présentation d’AfriLaunch">
        <div className="register-intro-inner">
          <Link className="register-brand" href="/" aria-label="AfriLaunch, accueil">
            <span className="register-brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span>AfriLaunch</span>
          </Link>

          <div className="register-pitch">
            <p className="register-eyebrow">L’écosystème vous attend</p>
            <h1>Vos ambitions<br />ont leur place<br />ici.</h1>
            <p className="register-description">
              Retrouvez vos projets, vos opportunités et les personnes qui font avancer vos idées.
            </p>
            <ul className="register-benefits">
              <li><span aria-hidden="true">✓</span> Reprenez là où vous en étiez</li>
              <li><span aria-hidden="true">✓</span> Suivez vos opportunités en un seul endroit</li>
              <li><span aria-hidden="true">✓</span> Continuez à faire grandir votre projet</li>
            </ul>
          </div>

          <p className="register-footnote">Pensé pour les bâtisseurs d’Afrique.</p>
        </div>
      </section>

      <section className="register-form-panel" aria-labelledby="login-title">
        <div className="register-form-wrap login-form-wrap">
          <div className="register-form-heading">
            <span className="register-mobile-brand">AfriLaunch</span>
            <p className="register-eyebrow register-eyebrow-dark">Votre espace AfriLaunch</p>
            <h2 id="login-title">Heureux de vous revoir.</h2>
            <p>Connectez-vous pour retrouver votre espace.</p>
          </div>

          <form className="register-form login-form" onSubmit={handleSubmit} noValidate>
            {hasError && (
              <div className="login-error" role="alert">
                <span className="login-error-icon" aria-hidden="true">!</span>
                <span>Adresse e-mail ou mot de passe incorrect. Réessayez.</span>
              </div>
            )}

            <div className="register-field">
              <label htmlFor="login-email">Adresse e-mail</label>
              <input id="login-email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" required />
            </div>

            <div className="register-field">
              <div className="login-password-heading">
                <label htmlFor="login-password">Mot de passe</label>
                <Link href="/forgot-password">Mot de passe oublié ?</Link>
              </div>
              <div className="login-password-control">
                <input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Saisissez votre mot de passe" required />
                <button type="button" className="login-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            <label className="login-remember">
              <input type="checkbox" name="remember" />
              <span className="login-checkbox" aria-hidden="true" />
              <span>Se souvenir de moi</span>
            </label>

            <button className="register-submit" type="submit" disabled={isLoading || !isLoaded}>
              {isLoading ? <><span className="login-spinner" aria-hidden="true" />Connexion…</> : <>Se connecter <span aria-hidden="true">→</span></>}
            </button>
          </form>

          <p className="register-login">Vous n’avez pas encore de compte ? <Link href="/register">Créer un compte</Link></p>
        </div>
      </section>
    </main>
  );
}
