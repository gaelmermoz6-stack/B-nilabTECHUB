"use client";

import { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import Link from "next/link";

function PasswordResetForm() {
  const { isLoaded, signIn } = useSignIn();
  const [step, setStep] = useState<"email" | "code" | "password" | "complete">("email");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handlePasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoaded) return;

    const formData = new FormData(event.currentTarget);
    setStatus(null);
    setIsLoading(true);
    try {
      if (step === "email") {
        const address = String(formData.get("email") ?? "").trim();
        const result = await signIn.create({ strategy: "reset_password_email_code", identifier: address });
        const emailFactor = result.supportedFirstFactors?.find((factor) => factor.strategy === "reset_password_email_code");
        if (!emailFactor || !("emailAddressId" in emailFactor)) {
          throw new Error("Aucune adresse e-mail ne permet de réinitialiser ce compte.");
        }
        await signIn.prepareFirstFactor({ strategy: "reset_password_email_code", emailAddressId: emailFactor.emailAddressId });
        setEmail(address);
        setStep("code");
        setStatus({ type: "success", message: "Si cette adresse correspond à un compte, un code de vérification a été envoyé." });
      } else if (step === "code") {
        const code = String(formData.get("code") ?? "").trim();
        await signIn.attemptFirstFactor({ strategy: "reset_password_email_code", code });
        setStep("password");
        setStatus({ type: "success", message: "Code vérifié. Choisissez votre nouveau mot de passe." });
      } else if (step === "password") {
        const password = String(formData.get("password") ?? "");
        const confirmation = String(formData.get("confirmPassword") ?? "");
        if (password.length < 8 || password !== confirmation) {
          setStatus({ type: "error", message: password !== confirmation ? "Les mots de passe ne correspondent pas." : "Le mot de passe doit contenir au moins 8 caractères." });
          return;
        }
        await signIn.resetPassword({ password });
        setStep("complete");
        setStatus({ type: "success", message: "Votre mot de passe a été modifié." });
      }
    } catch (error) {
      const clerkError = error as { errors?: { longMessage?: string; message?: string }[] };
      setStatus({ type: "error", message: clerkError.errors?.[0]?.longMessage ?? clerkError.errors?.[0]?.message ?? "Cette étape a échoué. Vérifiez les informations puis réessayez." });
    } finally {
      setIsLoading(false);
    }
  }

  if (step === "complete") {
    return <div className="register-form"><p className="register-status register-status-success" role="status">{status?.message}</p><Link className="register-submit" href="/login">Retour à la connexion <span aria-hidden="true">→</span></Link></div>;
  }

  return (
    <form className="register-form" onSubmit={handlePasswordReset}>
      {step === "email" && <div className="register-field"><label htmlFor="reset-email">Adresse e-mail</label><input id="reset-email" name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" /></div>}
      {step === "code" && <div className="register-field"><label htmlFor="reset-code">Code reçu par e-mail</label><input id="reset-code" name="code" inputMode="numeric" autoComplete="one-time-code" required placeholder="Saisissez le code" /><span className="register-strength">Code envoyé à {email}</span></div>}
      {step === "password" && <>
        <div className="register-field"><label htmlFor="reset-password">Nouveau mot de passe</label><input id="reset-password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
        <div className="register-field"><label htmlFor="reset-confirm-password">Confirmez le mot de passe</label><input id="reset-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></div>
      </>}
      <button className="register-submit" type="submit" disabled={isLoading || !isLoaded}>
        {isLoading ? "Veuillez patienter…" : step === "email" ? "Envoyer un code" : step === "code" ? "Vérifier le code" : "Modifier le mot de passe"} <span aria-hidden="true">→</span>
      </button>
      {status && <p className={`register-status register-status-${status.type}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
    </form>
  );
}

export function PreviewForm({ mode }: { mode: "contact" | "password" }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (mode === "password") {
    return <PasswordResetForm />;
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-field"><label htmlFor="contact-name">Nom</label><input id="contact-name" name="name" autoComplete="name" required /></div>
      <div className="register-field"><label htmlFor="contact-email">Adresse e-mail</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
      <div className="register-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={5} required /></div>
      <button className="register-submit" type="submit">Prévisualiser l’envoi <span aria-hidden="true">→</span></button>
      {submitted && <p className="register-status register-status-info" role="status">Message non envoyé : ce formulaire est un aperçu frontend.</p>}
    </form>
  );
}
