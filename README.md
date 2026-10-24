# SkillBridge AI — Complete Starter Prototype

A responsive student learning and career companion with a dark navy/electric-blue theme. This starter includes Overview, Student Profile, Skill Assessment, Career Guidance, Learning Roadmap, Projects, My Progress, AI Mentor, and Settings.

## What works without API credentials

- Student profile form with education level, course/stream, goal, weekly study hours and interests.
- Eight-question diagnostic quiz tailored to the selected stream (CSE/IT, ECE, Mechanical, Commerce, Science, or general learning).
- Real score calculation from submitted answers, missed-topic analysis, and score history.
- Career guidance explicitly reflects the latest assessment score, missed topics, strengths, education level, course, interests and goal. Without an assessment, recommendations are clearly labelled as general starting suggestions.
- Four-week roadmap built around missed topics, with beginner-friendly actions and checkable tasks; before an assessment, the starter plan tells the student to assess skills first.
- Project suggestions adapt to career goal and detected weak topics, with project difficulty informed by the latest score. Local progress tracking, theme settings, and JSON export/backup are included.
- Profile, attempts and task completion persist in the browser on that device using localStorage.

## AI/API limitation

The AI Mentor uses a Netlify server function and requires your own OpenAI API key. This project does **not** include a key, API credits, billing, or an already deployed backend. API usage can cost money. Do not paste a real key into `index.html` or commit it to GitHub. Put it in Netlify's private environment variables as `OPENAI_API_KEY`, then redeploy. Confirm the model configured in `OPENAI_MODEL` is available to your API account.

## Run as a static demo

1. Extract the ZIP.
2. Open `index.html` in Microsoft Edge.
3. Profile, quiz scoring, career recommendations, roadmap, project list, and local progress work without AI. AI Mentor will explain that backend access is not configured.

## Run locally with the AI function

1. Install a current Node.js LTS version.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Install Netlify CLI through the project's dev dependency (`npm install` installs it).
5. Create a private `.env` file based on `.env.example` and enter your API key locally. Never share the `.env` file.
6. Run `npx netlify dev` and open the local URL it prints.

## Deploy to Netlify

1. Create a GitHub repository and upload these project files, excluding `.env` and `node_modules`.
2. In Netlify, import the GitHub repository.
3. Set the publish directory to `.` if Netlify does not detect the included `netlify.toml` automatically.
4. In Netlify site settings, add environment variable `OPENAI_API_KEY` with your private key. Optionally set `OPENAI_MODEL` to a model available to your API account.
5. Trigger a new deploy, then test AI Mentor.
6. Monitor API usage and set limits/budgets in the provider account where available.

## Important limitations before public judging

- This is a prototype, not a validated psychometric or formal academic assessment. Questions are short sample items; expand and review them for each level and subject before claiming broad coverage.
- Career guidance is exploratory, not a guarantee of employment or admission.
- Data is saved only in the current browser/device. There are no user accounts, server database, cross-device sync, role permissions, or institutional admin dashboard yet. Add authentication and a database (for example Supabase) before storing real student records or deploying for real users.
- The sample quiz set is a starter set and does not cover every subject. For course-specific or official recommendations, provide verified syllabus/content sources.

## Assessment-driven personalization update

After a student submits the quiz, the score is calculated from their selected answers. Career guidance displays the score, missed topics and correctly answered topics; the roadmap prioritizes missed topics; and project suggestions include practice projects related to those gaps. Every quiz attempt shuffles the available questions. If no assessment is available, pages clearly identify their recommendations as general rather than pretending they are personalized.


## Pre-submission verification note

The HTML JavaScript and `functions/coach.js` passed Node.js syntax checks during packaging. This is a static syntax check only; it is not proof that all browser interactions or a live OpenAI API request have been tested. Before presenting, run `npm install`, configure a private `.env` from `.env.example`, and use `npx netlify dev` to test the AI function locally. Never commit `.env` or a real API key.

### Quick acceptance test

1. Save a profile and refresh the page.
2. Complete the assessment and verify score/incorrect topics.
3. Open Career Guidance, Learning Roadmap, and Projects and check they reflect the latest assessment.
4. Mark a roadmap task complete, refresh, and confirm local progress persists.
5. Ask the AI Mentor a question with the local Netlify server running and a valid API key configured.
6. Repeat the same tests on the deployed public URL.
