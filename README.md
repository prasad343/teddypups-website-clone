# TeddyPups React Website — Technical Assignment Starter

**Status:** Original learning starter created to help implement the assignment. **Not a verified pixel-perfect or feature-complete clone.** You must compare every page with the reference, replace temporary photographs with properly authorized assets, implement any missing behavior, test the project, and document your own decisions.

Reference: https://puppy.instabizweb.com/

## Start here (Windows, beginner instructions)

1. Install **Node.js LTS** from https://nodejs.org/ (download the LTS version). Restart VS Code after installing.
2. Install **Visual Studio Code** from https://code.visualstudio.com/.
3. Extract this ZIP. In VS Code, choose **File -> Open Folder**, then choose `teddypups-react-starter`.
4. At the top menu choose **Terminal -> New Terminal**.
5. Type these commands one by one:

   ```bash
   npm install
   npm run dev
   ```

6. A local URL such as `http://localhost:5173/` appears. Hold Ctrl and click it, or paste it into Chrome.
7. To stop the server, press `Ctrl + C` in the terminal.
8. Before deployment, test your build with `npm run build`. A `dist` folder will be created.

**If `npm` is not recognized:** Install Node.js LTS, close VS Code completely, reopen, and try again.

## Files, in plain English

- `index.html`: the page that starts the app.
- `src/main.jsx`: page layouts, navigation, interactions, form behavior and components.
- `src/data.js`: puppy records, images, questions and captions.
- `src/style.css`: design and mobile responsiveness.
- `public/fallback-puppy.svg`: placeholder if a puppy photo cannot load.
- `public/_redirects` and `vercel.json`: deep-link support on Netlify and Vercel.
- `AI_PROMPTS.md`: starter log instructions for recording actual AI use.
- `TESTING_CHECKLIST.md`: items to verify before submission.

## Routes included

Home `/`, Puppies `/puppies`, Puppy detail `/puppies/<slug>`, Happy families `/happy-families`, How it works `/how-it-works`, FAQ `/faq`, Contact `/contact`, Gone home `/gone-home`, Delivery `/delivery`.

## Interactive features included

- Mobile menu and responsive navigation.
- Hero puppy controls.
- Puppy card navigation, list search and location/breed filters.
- Puppy photo gallery with previous/next buttons.
- FAQ search and click-to-expand answers.
- Local/imported journey tabs.
- Demo enquiry forms with required-field validation.
- WhatsApp deep links (demo number — replace only with a number you are authorized to use).

**Important:** The enquiry form currently opens an email compose window. It does not post to a database or email API. The recipient is the placeholder `your-email@example.com`; change it to an address you control before testing. You must not claim to have built a real backend submission service. If the original functionality requires server-side handling, build and test your own backend or connect an authorized form service.

**Important:** Puppy photos use temporary external `images.unsplash.com` URLs and are **not** the reference site's photos. The names, ages and other content are starting data for practice. Review the reference in your own browser; replace with properly authorized images and correct content. Some external images may fail or show a dog of a different breed; use the provided fallback, then improve the data.

## Publish with GitHub + Vercel (recommended)

1. Visit https://github.com/new while signed in.
2. Repository name: `teddypups-clone-prasad`. Choose Public (if comfortable sharing code), then Create repository.
3. In VS Code terminal, inside the project folder:

   ```bash
   git init
   git add .
   git commit -m "Build responsive TeddyPups replica"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/teddypups-clone-prasad.git
   git push -u origin main
   ```

   Replace `YOUR_GITHUB_USERNAME` with your username. If Git prompts you to log in, use the authorized browser flow; don't paste account passwords into your project.

4. Open https://vercel.com/new, sign in with GitHub, select your repository, and choose Import.
5. Framework should be Vite; Build Command should be `npm run build`, Output Directory should be `dist`.
6. Click Deploy. Wait for the successful completion page and copy the live `.vercel.app` URL.
7. Test the live **home page and a puppy detail page directly** (paste each URL into an incognito tab). Verify mobile view too.

Alternative: use https://app.netlify.com/start to import the GitHub repo. `public/_redirects` is included.

## Record the Loom video

1. Visit https://www.loom.com/ and sign in.
2. Start a screen recording. Explain project structure, use of React and CSS, how you tested it, how you deployed it, what AI tools helped, and **actual exact prompts**.
3. Show your live website and GitHub repository. Open Chrome DevTools and show a mobile view.
4. End recording, copy the shareable Loom link, and verify the link opens in a private window.

## Send email to Blutec AI

- To: `careers@blutec.ai`
- Cc: `neelnsoni1306@gmail.com`
- Exact subject: `Technical Assignment Submission – Prasad Patil – Blutec AI`
- Body: include Live Website URL, GitHub Repository URL and Loom Video URL.

The **48-hour clock starts when you send your acceptance email**, not when you receive this starter.

## Common fixes

- `npm` not found: install Node.js LTS and restart VS Code.
- Browser page blank: inspect the VS Code terminal for errors; check that `npm install` succeeded.
- Image missing: the image URL may be unavailable; update `src/data.js` with an authorized image path.
- Vercel 404 on subpages: ensure `vercel.json` is at the project root, redeploy and re-test.
- Git push asks for password: use GitHub's normal browser authentication or a Git Credential Manager; do not share secrets.
- Form doesn't save anywhere: it is a demo mailto form; a real backend is a separate task.

**Be truthful in your Loom**: this starter was created with AI assistance; explain what you independently tested, edited and understood. AI use is explicitly permitted by the employer.
