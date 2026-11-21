# 07. Deployment: new GitHub repo, existing Vercel project

**Goal:** keep https://andrescreation.vercel.app exactly as it is. The old GitHub repo is gone, the Vercel project still exists.

**Rule for the agent:** do NOT create a new Vercel project and do NOT delete the existing one. Deleting it frees the `andrescreation` subdomain and there is no guarantee of getting it back.

## Step 0. Try to restore the old repo (optional)
GitHub → Settings → Repositories → Deleted repositories. If the old repo is listed (within 90 days), restore it only if Andre wants the old code for reference. The new build still lives in the new repo.

## Step 1. New repo
1. Create the repo on GitHub (private is fine on Vercel Hobby), e.g. `andrescreation-portfolio`.
2. Push the project with the default branch `main`.
3. Add branch protection on `main` once CI exists (require the CI check to pass).

## Step 2. Connect it to the existing Vercel project
1. Vercel dashboard → the existing project → **Settings → Git**.
2. If the old repo is still shown, click **Disconnect**.
3. Click **Connect Git Repository** → GitHub → select the new repo. If it is not listed, go to GitHub → Settings → Applications → Vercel → Configure and grant access to the repo.
4. **Production Branch:** `main`.
5. **Settings → Build & Development:** Framework preset Next.js, default build and output settings, Node.js version matching the repo (`engines` field in `package.json`).
6. **Settings → Environment Variables:** delete every old variable (database URLs, admin secrets). The new site needs none.
7. **Settings → Domains:** confirm `andrescreation.vercel.app` is listed and assigned to production. Remove any domain you don't recognise.
8. **Settings → Deployment Protection:** keep protection on for Preview deployments.

## Step 3. First deploy
- Push to a feature branch first. Vercel builds a Preview URL. Run the manual checklist from `05_TESTING_QA.md` section 9 on it.
- When happy, merge to `main`. Vercel promotes it to production at andrescreation.vercel.app.
- If anything breaks: Vercel → Deployments → pick the previous good deployment → **Promote to Production** (instant rollback).

## Alternative: deploy from the CLI (no Git connection)
Only if the Git connection fails:
```bash
npm i -g vercel
vercel link
vercel deploy --prod
```
When `vercel link` asks, choose the existing project. Reconnect Git as soon as possible so deploys and rollbacks stay tracked.

## Account security (do this once)
- 2FA on GitHub and Vercel, with backup codes stored offline.
- Review GitHub → Settings → Applications and remove apps you don't use.
- Review Vercel → Team or Account Settings → Members and Tokens; delete unknown tokens.
- Use a password manager. Never share the Vercel login.
