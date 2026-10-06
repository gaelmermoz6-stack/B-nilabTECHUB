# AfriLaunch Frontend

The Next.js application lives in `frontend/`. The Express API is maintained separately and is not included in this frontend deployment.

## Local development

Requirements: Node.js 20.9 or newer.

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Deploy on Vercel

Import this repository into Vercel and set **Root Directory** to `frontend`. Use the default Next.js build settings. Configure frontend environment variables in the Vercel project settings; never commit secrets.

Deploy the Express API separately if the frontend needs it. Set the frontend API URL and the API's allowed CORS origin in their respective deployment environments.