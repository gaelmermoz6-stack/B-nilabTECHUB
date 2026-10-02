import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Les données soumises sont invalides.",
          },
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        ok: true,
        message: "Le point d'entrée d'inscription est prêt, mais l'implémentation métier n'est pas encore activée.",
        payload: parsed.data,
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
