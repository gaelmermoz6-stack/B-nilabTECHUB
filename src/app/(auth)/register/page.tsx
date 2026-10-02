"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs/legacy";

type FormField = "firstName" | "lastName" | "email" | "phone" | "password" | "confirmPassword" | "terms";
type FormErrors = Partial<Record<FormField, string>>;
type FormStatus = { type: "error" | "success"; message: string } | null;

function getPasswordStrength(password: string) {
  if (!password) return 0;
  return [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
}

const strengthLabels = ["", "Faible", "Moyen", "Bon", "Excellent"];

export default function RegisterPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [password, setPassword] = useState("");
  const [verificationPending, setVerificationPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordStrength = getPasswordStrength(password);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!isLoaded) return;

    if (verificationPending) {
      const code = String(formData.get("verificationCode") ?? "").trim();
      if (!code) {
        setStatus({ type: "error", message: "Saisissez le code reçu par e-mail." });
        return;
      }
      setIsLoading(true);
      try {
        const result = await signUp.attemptEmailAddressVerification({ code });
        if (result.status === "complete" && result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          router.replace("/dashboard");
          router.refresh();
          return;
        }
        setStatus({ type: "error", message: "La vérification n’a pas abouti. Vérifiez le code et réessayez." });
      } catch (error) {
        const clerkError = error as { errors?: { longMessage?: string; message?: string }[] };
        setStatus({ type: "error", message: clerkError.errors?.[0]?.longMessage ?? clerkError.errors?.[0]?.message ?? "Le code est invalide ou expiré." });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const nextErrors: FormErrors = {};
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const termsAccepted = formData.get("terms") === "on";

    if (!firstName) nextErrors.firstName = "Le prénom est obligatoire.";
    if (!lastName) nextErrors.lastName = "Le nom est obligatoire.";
    if (!email) nextErrors.email = "L’adresse e-mail est obligatoire.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Saisissez une adresse e-mail valide.";
    }
    if (!phone) nextErrors.phone = "Le numéro de téléphone est obligatoire.";
    else if (!/^\+?[0-9\s().-]{7,20}$/.test(phone)) {
      nextErrors.phone = "Saisissez un numéro de téléphone valide.";
    }
    if (passwordStrength < 2) {
      nextErrors.password = "Choisissez un mot de passe d’au moins 8 caractères avec des lettres et des chiffres.";
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirmez votre mot de passe.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }
    if (!termsAccepted) nextErrors.terms = "Vous devez accepter les conditions pour continuer.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: "error", message: "Vérifiez les champs indiqués pour continuer." });
      return;
    }

    setStatus(null);
    setIsLoading(true);
    try {
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
        legalAccepted: termsAccepted,
        unsafeMetadata: { phone },
      });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerificationPending(true);
      setStatus({ type: "success", message: `Un code de vérification a été envoyé à ${email}.` });
    } catch (error) {
      const clerkError = error as { errors?: { longMessage?: string; message?: string }[] };
      setStatus({ type: "error", message: clerkError.errors?.[0]?.longMessage ?? clerkError.errors?.[0]?.message ?? "La création du compte a échoué. Réessayez." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="register-page">
      <section className="register-intro" aria-label="Présentation d’AfriLaunch">
        <div className="register-intro-inner">
          <Link className="register-brand" href="/" aria-label="AfriLaunch, accueil">
            <span className="register-brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>AfriLaunch</span>
          </Link>

          <div className="register-pitch">
            <p className="register-eyebrow">Rejoignez l’écosystème</p>
            <h1>Bâtissez<br />ce qui fera<br />grandir l’Afrique.</h1>
            <p className="register-description">
              Créez votre compte et connectez-vous aux partenaires, à la communauté et aux opportunités qui feront avancer votre projet.
            </p>
            <ul className="register-benefits">
              <li><span aria-hidden="true">✓</span> Présentez votre projet à des partenaires de confiance</li>
              <li><span aria-hidden="true">✓</span> Découvrez des financements et des opportunités de croissance</li>
              <li><span aria-hidden="true">✓</span> Rejoignez des entrepreneurs engagés</li>
            </ul>
          </div>

          <p className="register-footnote">Pensé pour les bâtisseurs d’Afrique.</p>
        </div>
      </section>

      <section className="register-form-panel" aria-labelledby="register-title">
        <div className="register-form-wrap">
          <div className="register-form-heading">
            <span className="register-mobile-brand">AfriLaunch</span>
            <p className="register-eyebrow register-eyebrow-dark">Votre prochaine étape commence ici</p>
            <h2 id="register-title">Commencez votre parcours</h2>
            <p>Quelques minutes suffisent pour vous lancer.</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit} noValidate>
            {verificationPending ? (
              <div className="register-field">
                <label htmlFor="verificationCode">Code reçu par e-mail</label>
                <input id="verificationCode" name="verificationCode" inputMode="numeric" autoComplete="one-time-code" placeholder="Saisissez le code" required />
              </div>
            ) : <>
            <div className="register-name-row">
              <div className="register-field">
                <label htmlFor="firstName">Prénom</label>
                <input id="firstName" name="firstName" autoComplete="given-name" placeholder="Votre prénom" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
                {errors.firstName && <span id="firstName-error" className="register-error">{errors.firstName}</span>}
              </div>
              <div className="register-field">
                <label htmlFor="lastName">Nom</label>
                <input id="lastName" name="lastName" autoComplete="family-name" placeholder="Votre nom" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
                {errors.lastName && <span id="lastName-error" className="register-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="email">Adresse e-mail</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email && <span id="email-error" className="register-error">{errors.email}</span>}
            </div>

            <div className="register-field">
              <label htmlFor="phone">Numéro de téléphone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+225 00 00 00 00 00" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
              {errors.phone && <span id="phone-error" className="register-error">{errors.phone}</span>}
            </div>

            <div className="register-field">
              <label htmlFor="password">Mot de passe</label>
              <input id="password" name="password" type="password" autoComplete="new-password" placeholder="Créez un mot de passe" value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby="password-strength password-error" />
              <div id="password-strength" className="register-strength" aria-live="polite">
                <div className="register-strength-bars" aria-hidden="true">
                  {[1, 2, 3, 4].map((level) => <span key={level} className={passwordStrength >= level ? `is-active strength-${passwordStrength}` : ""} />)}
                </div>
                <span>{password ? `Sécurité : ${strengthLabels[passwordStrength]}` : "8 caractères minimum"}</span>
              </div>
              {errors.password && <span id="password-error" className="register-error">{errors.password}</span>}
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Saisissez-le à nouveau" aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined} />
              {errors.confirmPassword && <span id="confirmPassword-error" className="register-error">{errors.confirmPassword}</span>}
            </div>

            <div className="register-terms-field">
              <label className="login-remember register-terms-label">
                <input type="checkbox" name="terms" />
                <span className="login-checkbox" aria-hidden="true" />
                <span>J’accepte les <Link href="/terms">conditions d’utilisation</Link> et la <Link href="/privacy">politique de confidentialité</Link>.</span>
              </label>
              {errors.terms && <span className="register-error">{errors.terms}</span>}
            </div>
            </>}

            <button className="register-submit" type="submit" disabled={isLoading || !isLoaded}>
              {isLoading ? <><span className="register-spinner" aria-hidden="true" />{verificationPending ? "Vérification…" : "Création en cours…"}</> : verificationPending ? <>Vérifier mon adresse <span aria-hidden="true">→</span></> : <>Créer mon compte <span aria-hidden="true">→</span></>}
            </button>
            {status && <p className={`register-status register-status-${status.type}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
          </form>

          <p className="register-login">Vous avez déjà un compte ? <Link href="/login">Se connecter</Link></p>
        </div>
      </section>
    </main>
  );
}
