import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Les identifiants sont invalides.",
          },
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        ok: true,
        message: "Le point d'entrée de connexion est prêt, mais la session réelle n'est pas encore activée.",
        payload: {
          email: parsed.data.email,
        },
      },
      { status: 202 },
    );
  } catch {
    return Response.json(
      {
        ok: false,
        error: {
          code: "INVALID_JSON",
          message: "Le corps de la requête est invalide.",
        },
      },
      { status: 400 },
    );
  }
}
