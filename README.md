# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

To deploy manually, you can use the following command:

```bash
npm run deploy
```

This will build the application and push the contents of the `dist` folder to the `gh-pages` branch. GitHub Pages will then serve the application from this branch.

**Important:**
1. Ensure that your repository is configured to deploy from the `gh-pages` branch in the GitHub repository settings (Settings > Pages > Build and deployment > Source).
2. The application will be available at `https://<your-username>.github.io/<repository-name>/`. For this project, it should be `https://<your-username>.github.io/carotid-stenosis-grader/`.
