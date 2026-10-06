export async function GET() {
  return Response.json({
    ok: true,
    service: "africlaunch-api",
    status: "healthy",
    version: "v1",
  });
}
