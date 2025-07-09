# Guide: Feature development workflow

## Goal

To guide you, the AI assistant, in following a process for every new feature request. This will accompany the process until the feature is complete.

---

## Process - Initiation

For every new feature that the user is requesting:

### Verify stability

- Make sure that there are no linting errors, no uncommited changes. If any found - Stop and suggest to wrap before moving forward.
- If the previous feature is incomplete - warn the user and ask what to do, including forking from the existing feature branch. 1.**Ensure branch:**
- If not on 'main' branch - ask to merge curren branch.

### Receive a brief

- If the user has not provided a brief or an issue description, ask the user for it.

### Name the feature

- Describe what you understood from the brief.
- Assign this feature a unique slug, make sure it doesn’t conflict with an existing slug under docs/features, and suggest it to the user.
- Remember this slug for the rest of the feature development process.

### Prepare for feature

- Create a git branch using the slug as a branch name
- Then create a folder under docs/features for this feature docs, named [date]-[featureslug] (E.g: 20250218-photo-sharing). If the feature is based on an issue, use [date]-#[issue-number]-[featureslug] (E.g: 20250218-#104-photo-sharing)

### Maintain a scratchpad

- Create a scratchpad-[featureslug].md under the feature docs folder.
  When working on a feature, maintain a scratchpad file as a persistent log of everything important that happens during development. This file acts as your internal memory, especially useful if context is lost and the session is resumed later. As you work, incrementally log any instructions the user gives you (even small ones), decisions you make and why, facts or constraints you discover, progress on specific tasks, bugs and how you fixed them, questions you faced and how they were resolved, and any deferred items or technical debt you identify. Keep your notes short and structured, and always use a consistent prefix so they can be parsed or summarized later. Format your notes as bullet points in the file, like this:

```
- 📣 **INSTRUCTION**: Skip offline support for now
- ☝️ **DECISION**: Using Cloudinary since it's already integrated in media-utils
- 📌 **TODO**: Add tests for ShowEditDialog
```

Here are some examples of note types you can use (but add others as needed):

- 📣 INSTRUCTION - when instructed by the user
- ☝️ DECISION - when you had options and made a decision
- 📝 NOTE - something you need to remember
- 🏁 TASK STARTED - when you start a task
- ✅ TASK COMPLETED - when you complete a task
- 📌 TODO - when you want to mark a task as todo
- 🐞 BUG - when you find a bug
- 🔍 ANALYSIS - when you analyze something
- 🧪 TESTING - when you test something
- ✨ LINT - when you lint something
- 🎉 COMPLETION - when you complete the entire request

---

## Process – Planning

### Understand the problem and the goal

You must ask clarifying questions to fully understand what the feature should achieve and why it matters. Focus on the "what" and "why" (not the "how"). Log both your questions and the user’s answers in the scratchpad. If relevant, check past PRs or summaries to identify related work. When the user answers your questions, continue

### Create a plan document

Create a file named `plan-[featureslug].md` inside the feature docs folder. Log this file's path in your scratchpad. The plan should include the following sections:

**Introduction / Overview**
Briefly explain what this feature does, why it’s needed, and how it fits into the broader product. Write it as if you're explaining to a teammate unfamiliar with this context.

**User Stories**
Write 2–5 user stories that reflect both end-user goals and internal workflows. Use this format:

> As a **[type of user]**, I want **[action]**, so that [benefit].
> This will help define feature scope and testing needs.

**Tests**
For each major outcome, define what will be tested, how, and why it matters. Use this format:

- **What:** What’s being tested
- **How:** Manual, automated, lint, visual, puppeteer,etc.
- **Why:** The risk or goal it protects
  Be specific and test behavior, not just structure.

**Non-Goals (Out of Scope)**
List anything that might reasonably be assumed to be in scope but isn't. Clarify boundaries to avoid scope creep later.

**Technical Considerations**
Mention architectural constraints, performance risks, naming decisions, integrations, or assumptions. Note if any parts are fragile or rely on side effects. Only include this section if there’s meaningful content.

**Related Files**
List **existing** files/modules/configs that this feature is expected to affect. For each, explain:

- What it currently does
- How this feature may modify, extend, or depend on it

Do not list new files here — those belong in the feature summary after implementation.

**Open Questions** _(optional)_
List any assumptions or unknowns you’re making. This helps the user clarify before implementation.

**Tasks**
Write a clear breakdown of the implementation steps. Each task should reflect part of the plan and be written so a junior developer can follow it. Include TODOs for testing, docs, and cleanup. Organize as numbered tasks and subtasks. e.g.

```
- 1.
  - 1.1
  - 1.2
  ...
- 2.
  - 2.1
  ...
```

### Review the Plan

When the plan is complete, stop and ask the user to review and approve it. Highlight any questions or concerns you have before implementation begins.

### Prepare to collect feedback

- Create a file called 'feedback.md' in the feature docs folder. The file will be used to collect feedback from the user.

---

## Process - Implementation

### Implement tasks

- One sub-task at a time - Do NOT start the next sub‑task until you are done with the previous one.
- Remember to maintain the scratchpad as described above.

### Pause for critical decisions

- If you need to make a critical decision, see a tradeoff or a risk, pause and ask the user for approval or feedback.

### Maintain feedback loop

- The 'feedback.md' in the feature docs folder contains a list of feedback items that you received from the user, ordered by priority.
- When you think you're done with the latest request or a subtask, go over the list, pick items that make sense next and fix them without asking for confirmation. Ignore ones that start with ✅ or `//`.
- When you believe you fixed a feedback item, mark it as ✅.

### Task completion protocol

- When you believe you finished a task, check for lint errors and try to fix them.
- **CRITICAL**: Before marking any feature as complete, ALWAYS test the running application to verify the implementation works as expected
- **CRITICAL**: Never declare a feature complete without validating that the dev server runs without errors and the UI functions properly
- When you finish a sub‑task, mark it as completed by adding ✅ in the beginning of the line.
- If all subtasks underneath a parent task are now ✅, also mark the parent task as completed by adding ✅ in the beginning of the line.
- If while working on a task, there was a change in plan by the user, revisit the plan and update it after the user's approval.
- When you finish a task, move on to the next task without waiting for user approval.
- When you're done with all tasks, ask the user if you should wrap the feature.

---

## Process - Wrap up

When the user asks to wrap the feature, follow these steps one by one:

### Comprehensive testing

- Create puppeteer tests for the feature, based on the testing plan. Place them under the right folder:
  - If it's specific for this feature, place it under `/scripts/puppeteer-tests/features/[featureslug]`
  - If you feel the test is an E2E test, place it under `/scripts/puppeteer-tests/e2e`
- Run the tests, log results in the scratchpad and fix any critical failures. If taking screenshots, place them under `/temp/test-screenshots`.

### Cleanup

- Look for leftover debugging lines, test files, environment parameters, and mocks that are no longer needed and remove them.
- Delete the feedback file from the feature docs folder, unless it has unresolved items.

### Lint check

- Run `npm run lint` to ensure no linting errors exist.
- Fix any errors before proceeding.
- Warnings are acceptable but errors must be resolved.

### Code review

- Checks diff summary and explain any non-obvious changes.
- Review all changes to see if the code is healthy. Check for
  - bugs
  - documentation
  - style
  - maintainability
  - adherence to coding standards
  - security
  - performance
- Flag any issues and suggest improvements as needed.

### Readme update

- Update the readme files in the relevant code folders if any of the changes made during the feature development are relevant to the readme.

### Address unfinished tasks

- If there are tasks that were not solved, suggest: retry, defer (log as debt as described below in this doc), or delete (if obsolete).

### Summarize scratchpad

- Go over your scratchpad, looking for important decisions, insights, lessons learned, debt and future tasks. Summarize them alongside what you've done, and save them to a file named summary-[featureslug].md under the feature docs folder.

### Update feature index

- Go over the docs/features/feature-index.md file and append a new entry for this feature at the end of the file.
- follow this format:

  ```
  ---
  ## Title
  Description

  - **Dates:** [startDate] - [endDate]
  - **Folder:** [folderName]
  - **Github:** [issue links], [PR link]
  - **Main Files:**
    - `file 1`
    - `file 2`
    - ...
  - **Dependencies:**
    - `dependency 1`
    - `dependency 2`
    - ...
  - **Highlights:**
    - Highlight 1
    - Highlight 2
    - ...
  ```

  - **Dates**
    - Use YYYY-MM-DD format for dates
    - Take the start date from the folder name
    - Use the date from the next feature as the end date
  - **Folder**
    - The name of the feature folder as is
  - **Github**
    - List all issues and PRs related to this feature. Most likely there will be 1 issue and 1 PR.
    - Supported formats:
      - `No issue | No PR`
      - `Issues [62](https://github.com/user/repo/issues/62), [63](https://github.com/user/repo/issues/62) | PR [93](https://github.com/user/repo/pull/93)`
      - `Issue [62](https://github.com/user/repo/issues/62) | No PR`
  - **Core files**
    - List the key source files created or modified in this feature. For each file, briefly describe its role or purpose (1 phrase). Group them if it helps (e.g., UI, API, hooks, etc.). Include only implementation files—not plan or scratchpad files.
    - Example format:

  ```
  -`ShowCreateDialog.tsx` – Modal form for creating a new show
  -`showApi.ts` – CRUD operations for shows
  ```

  - **Dependencies**
    - List any systems, libraries, modules, APIs, or internal features this feature depends on. Be specific enough to help someone estimate integration risks or shared boundaries.
    - Examples: “Uses React-Admin for form rendering”, “Relies on media-utils for uploads”, “Reads from shows table in Supabase”.
  - **Highlights**
    - Include specific implementation decisions, technical solutions, known limitations, UX or API behaviors, and any reusable logic. Avoid general statements like “added X feature” unless accompanied by how/why it works.
    - Think of this section as the TL;DR of the plan, decisions, caveats, and what might help or break if someone builds on this.
    - Pro tip: Include items that answer: What was architecturally interesting? What tradeoffs were made? What’s fragile or tricky? What’s especially reusable?

### Git related tasks

- Commit the branch, including a description of the changes.
- Push the branch to Github remote
- File a descriptive pull request. Attach the contents of the summary file to the PR description.
- Ask the user to review the PR, and wait for confirmation before continuing,
- Update the feature index file with the PR link, and commit this change.
- Shift back to main branch
- Look for the github issue that was opened for this feature. Add the summary file contents as a comment and close the issue.
- Merge branch into main and delete the feature branch.
