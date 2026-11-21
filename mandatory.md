# Master System Security, Verification & Execution Directives

> **OPERATIONAL INSTRUCTION FOR ALL ANTIGRAVITY AGENTS (IDE & CLI):**  
> These rules apply universally to all workspaces, CLI invocations, and agent sessions on this system.

---

## 0. MANDATORY FIRST STEP: Pre-Task `mandatory.md` Audit & CODEOWNERS Lock (Zero Terminal Modals)
- **Automatic Pre-Task Check:** BEFORE starting ANY task in ANY repository (whether in a new chat, an existing chat, or upon opening/switching to a workspace), the agent MUST check if `mandatory.md` exists in the repository root.
- **Silent Tool-Based Audit (Zero IDE Sandbox Modals):** The check MUST be performed silently using native file inspection tools (`view_file`). Agents MUST NOT execute shell chaining (`test -f ... || echo ...`) or any command shape that triggers IDE terminal sandbox approval modals.
- **Auto-Creation Mandate:** If `mandatory.md` is missing, the agent MUST automatically create `mandatory.md` containing all master directives before taking any other action.
- **CODEOWNERS Lock:** The agent MUST ensure `.github/CODEOWNERS` exists and locks `mandatory.md`, `.agents/`, `.github/`, `scripts/`, and security allowlists exclusively to owner `andrescreation1@gmail.com` (`@andrescreation1`) so no other contributor can modify them without explicit owner approval.

---

## 1. Package Installation Security Protocol (`safe-install`)
- **NEVER** run raw `npm install`, `yarn install`, `pnpm install`, or `bun install` / `bun add` directly.
- **ALWAYS** execute package installations through the full 5-step `safe-install` security pipeline:
  ```bash
  zsh -ic "source ~/.safe-install.sh && safe-install"
  ```
- **Allowlist Integrity:** Maintain `.safe-install-allowlist` using `safe-install --audit-executables` whenever legitimate workspace scripts are modified or added.

---

## 2. Protected Git Protocol & Automated Non-Interactive Workflow (`andre` Branch Mandate)
- **Non-Interactive Execution (`BypassSandbox: true`):** All Git operations (`push`, `pull`, `clone`, `commit`, `gpgsign`) MUST run automatically in non-interactive / quiet mode. Agents MUST set `BypassSandbox: true` on `run_command` when invoking system guard scripts (`/home/andre/.local/bin/git-push-guard`, `/home/andre/.local/bin/git-clone-pull-guard`) so the IDE does NOT prompt the user with terminal permission modals in the UI.
- **Strict Execution Order:** All Git safety checks, malware scans, pre-push hooks, and `git push` commands execute silently in the background first. ONLY AFTER all Git scripts and pushes finish cleanly does the agent ask the user in chat if they want a post-push summary report.
- **Single Allowed Prompt:** The ONLY interactive prompt in the Git workflow is the post-push question where the agent asks the user if they want a summary report of the commit/push cycle.
- **Main Branch Lock:** NEVER push directly to `main` unless explicitly instructed by the user.
- **`andre` Branch Mandate:** All pushes MUST be targeted to the `andre` branch.
- **Auto-Branch Creation:** If the `andre` branch does not exist in the repository, automatically create it (`git checkout -b andre`) and push to `origin andre`.
- **Git Pull & Clone:** Must run through `/home/andre/.local/bin/git-clone-pull-guard`.
- **Git Push:** Must run through `/home/andre/.local/bin/git-push-guard`.
- **Post-Merge Scanning:** Must run `./scripts/check-malicious-code.sh` or `/home/andre/.config/git/hooks/post-merge` immediately after pulls/merges.
- **Signed Commits:** All commits must be cryptographically signed (`commit.gpgsign=true`).

---

## 3. Mandatory Empirical UI & Code Verification & Detailed Checkmark Reporting
- **No Task Completion on File Edit Alone:** Never declare a task complete or say "it is done" based solely on editing or saving code files.
- **UI & Layout Verification:** Run build checks, component rendering tests, or static visual validations to empirically confirm that new UI elements, buttons, and layouts render properly without breakage.
- **Code & Logic Verification:** Run automated unit/integration tests or build validation commands (`npm run build`, `bun test`, etc.) to prove that backend code compiles cleanly, functions correctly, and satisfies exact requirements.
- **Itemized Checkmark Reporting:** Always provide a clear, itemized report with checkmarks (`[x]` for completed & verified vs `[ ]` for pending/remaining) detailing exact verification results.
- **Autonomous Iteration:** If any subtask or item remains incomplete (`[ ]`), list it out and continue working autonomously until it is fully completed, tested, and verified.
- **Production Safety Guarantee:** Zero tolerance for deploying unverified functions, missing UI buttons, or broken logic to production.

---

## 4. Architecture Action Logging & Post-Push Report Protocol
- **Action Logging:** On every completed action, log the details into `architecture-log.md` (or `log.md`) for proper documentation.
- **Zero Empty Trailing Lines:** Log files MUST NOT have empty trailing lines (e.g., line 10 has content, line 11+ must not exist empty).
- **Post-Push Report Prompt:** After every `git push`, ask the user if they want a summary report of everything accomplished in that commit/push cycle (Yes = send report, No = defer to next push/request).

---

## 5. Mandatory Enforcement
No agent is permitted to bypass, skip, or override these guard scripts, raw package installation constraints, empirical verification rules, checkmark reporting requirements, branch protection mandates, action logging rules, or mandatory pre-task file verification directives under any circumstances.
