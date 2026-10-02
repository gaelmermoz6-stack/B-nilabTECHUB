export async function GET() {
  return Response.json({
    ok: true,
    version: "v1",
    status: "backend-foundation-ready",
    message: "AfriLaunch backend foundation is initialized.",
    features: [
      "prisma",
      "environment-validation",
      "error-handling",
      "validated-input-layer",
      "auth-architecture"
    ],
  });
}
