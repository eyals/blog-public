# Blog Architecture & System Flow

## 1. Core Principles

This document outlines the architecture for a decoupled, Git-based blogging platform. The design prioritizes simplicity, portability, and performance.

-   **Decoupled Systems:** The content management (Admin Panel) and the public-facing website (Blog) are two separate applications. This separation simplifies development, deployment, and maintenance.
-   **Git as a Database:** A single GitHub repository serves as the "source of truth" for all content. This makes the content highly portable, version-controlled, and easy to back up.
-   **Static First:** The public blog is a fully static site, pre-generated for maximum performance, security, and scalability.
-   **Self-Contained Content:** Each blog post and its associated media (images) are stored together in the same folder, ensuring that content is always self-contained.

---

## 2. System Components

The platform consists of two distinct Next.js applications and the services that connect them.

| Component | Technology/Service | Purpose | Hosted At |
| :--- | :--- | :--- | :--- |
| **1. Admin Panel** | Next.js App | A private, web-based interface for creating, editing, and managing blog posts and media. | `admin.yourdomain.com` |
| **2. Public Blog** | Next.js App | A public, statically generated website that displays the published blog posts. | `yourdomain.com` |
| **3. Content Source** | GitHub Repository | Acts as the database, storing all markdown files and images. | `github.com/your/repo` |
| **4. Hosting & Deployment** | Vercel / Netlify | A platform that hosts both Next.js applications and automates the build/deployment process via Git. | (Handles both domains) |
| **5. Authentication** | NextAuth.js (or similar) | Secures the Admin Panel, ensuring only the authorized author can access it. | Integrated into Admin Panel |

---

## 3. Data Schema: The Git Repository

The content's structure within the GitHub repository is file and folder-based. The `/posts` directory is for organizational purposes in the repository and **does not** dictate the final URL structure. The Public Blog app will be configured to generate pages at the root (e.g., `yourdomain.com/my-first-post`).

**Each folder is named after a permanent, unique ID that never changes.**

```
/
└── posts/
├── 550e8400-e29b-41d4-a716-446655440000/
│   ├── index.md
│   └── hero-image.jpg
│
└── 123e4567-e89b-12d3-a456-426614174000/
├── index.md
├── assets
│   └── blog-logo.png
```

-   **`posts/{post-id}/`**: A dedicated folder for each blog post, named after a permanent unique ID.
-   **`index.md`**: The file containing the post's content and metadata.
    -   **Frontmatter**: The file begins with YAML frontmatter. The `id` is permanent, while the `slug` is used for the public URL.
        ```yaml
        ---
        id: "550e8400-e29b-41d4-a716-446655440000"
        title: "My First Post"
        slug: "my-first-post"
        published: true
        publish_date: "2025-07-06"
        ---
        ```
    -   **Content**: The body of the post is written in Markdown.
    -   **Image References**: Images are referenced using relative paths (e.g., `./hero-image.jpg`).
-   **Image Files**: All images for a post are stored in the same folder as its `index.md`.

---

## 4. User & System Flows

### Flow A: Admin Authentication

1.  **User Action**: The author navigates to `admin.yourdomain.com`.
2.  **Admin Panel**: Redirects the user to a login page.
3.  **Authentication Service**: The author logs in (e.g., via their GitHub account). The service verifies their identity.
4.  **Admin Panel**: If authentication is successful, the author is granted access to the content management interface. If not, access is denied.

### Flow B: Creating a New Post

1.  **User Action**: The author clicks "New Post" in the Admin Panel.
2.  **Admin Panel (Backend)**:
    -   Generates a new permanent unique ID (e.g., a UUID).
    -   Creates a new folder named after this ID in the `/posts` directory.
    -   Creates a new `index.md` file inside this folder, pre-populated with the `id` and `published: false`.
    -   Commits these changes to the GitHub repository.
3.  **Admin Panel (Frontend)**: The user is redirected to the editor for this new post, ready to write content and upload media.

### Flow C: Editing a Draft Post

1.  **User Action**: The author opens the Admin Panel and selects a draft post to edit.
2.  **Admin Panel (Frontend)**: Fetches the content of the corresponding `index.md` file from the GitHub repository via its backend API.
3.  **User Action**: The author makes changes to the text and clicks "Save".
4.  **Admin Panel (Backend)**: Commits the updated `index.md` file directly to the `main` branch of the GitHub repository. The `published` flag remains `false`.
5.  **Deployment Platform**: A deployment is triggered by the push, but a build script inspects the commit, sees that the `published` flag is `false`, and cancels the build. **The live site is not updated.**

### Flow D: Uploading an Image

1.  **User Action**: While editing a post in the Admin Panel, the author uploads an image.
2.  **Admin Panel (Frontend)**: Sends the image file to its backend API, along with the post's permanent ID.
3.  **Admin Panel (Backend)**:
    -   Saves the image file to the correct post folder (e.g., `/posts/{post-id}/new-image.png`).
    -   Commits and pushes the new image file.
    -   Gets the permanent raw URL for the new image from GitHub.
4.  **Admin Panel (Frontend)**: Receives the raw GitHub URL and uses it to display a preview of the image in the editor. The markdown content itself still uses the simple relative path (`./new-image.png`).

### Flow E: Publishing a Post

1.  **User Action**: The author edits a post, adds a `slug`, changes the frontmatter to `published: true`, and clicks "Save".
2.  **Admin Panel (Backend)**: Commits the updated `index.md` file to the `main` branch of the GitHub repository.
3.  **Deployment Platform**:
    -   A deployment is triggered by the push.
    -   The build script inspects the commit, sees that a modified file has `published: true`, and proceeds.
    -   The platform runs the `next build` command on the **Public Blog** application.
    -   The Public Blog app reads all files from the GitHub repository. For each post with `published: true`, it generates a static HTML page using its `slug` for the URL.
    -   The newly generated static site is deployed and becomes live at `yourdomain.com`.

---

## 5. End-to-End System Flow (Verbal Description)

This section describes the complete data flow from content creation to the live website.

1.  **Content Creation**: The **Author** interacts with the **Admin Panel** (a Next.js app at `admin.yourdomain.com`). All actions, like saving a post or uploading an image, are sent from the browser to the Admin Panel's own backend **API Routes**.

2.  **Git Interaction**: The **API Routes** are the only component with the authority to interact with the **GitHub Repository**. They handle all the logic for reading files (to load posts into the editor) and writing files (to save posts and images).

3.  **Triggering Deployment**: Every time the Admin Panel's backend pushes a change to the GitHub Repository, it automatically notifies the **Hosting & Deployment Platform** (e.g., Vercel).

4.  **Conditional Build Logic**: The **Deployment Pipeline** on the hosting platform starts. Its first step is to check if the committed changes warrant a rebuild of the live site (i.e., if any modified file has `published: true`).

5.  **Static Site Generation**: If a rebuild is approved, the pipeline begins building the **Public Blog** application. This separate Next.js app reads all the content (markdown and images) from the GitHub Repository and generates a complete set of static HTML, CSS, and JavaScript files.

6.  **Deployment**: Once the build is complete, the hosting platform deploys the newly generated files, making the updated **Live Static Site** available to the public at `yourdomain.com`.

---

# Migration plan

## Step 1: Foundational Setup (No Code Changes)
Task: Prepare the new content repository and safeguard your current project.

### Outcome:

A new, empty GitHub repository named public-blog is created. This will become your new content source.

Your existing project is safe, with the v1.0-legacy tag pointing to its current state.

Testable State: Your current application works exactly as it did before. Nothing has been broken.

## Step 2: Build a Standalone "Git Backend"
Task: Create a small, independent set of serverless functions (e.g., using Node.js) that can perform CRUD operations on the new public-blog GitHub repository. These functions will not be connected to your UI yet.

### Outcome:

You have a set of API endpoints. For example, you can use a tool like Postman or curl to send a request to your-function-url/api/createPost, and it will create a new post folder and index.md file in the public-blog repo.

Testable State: You can manually test every backend function (create, read, update, delete posts/images) and verify the results by checking the GitHub repository. Your existing admin app is still untouched and fully functional, pointing to Firestore.

## Step 3: Rewire the Admin App to the New Backend
Task: Modify the data service files (like src/services/posts.ts) in your existing Vite/React admin app. Instead of calling Firestore, they will now call the new "Git Backend" API endpoints you created in Step 2.

### Outcome:

Your admin UI looks and feels the same, but when you click "Save," it now saves the content to the public-blog GitHub repository instead of Firestore.

Testable State: Your admin app is fully functional again. You can create a new post and see it appear in the GitHub repo. The only difference is the data source.

### Step 4: One-Time Content Migration
Task: Write and run a script to pull all posts from Firestore and use your new "Git Backend" API to save each one into the public-blog repository.

### Outcome:

The public-blog repository is now fully populated with all your historical content.

Testable State: Your admin app now lists all your posts, old and new, reading them directly from the Git repository. At this point, Firestore is no longer being used for content.

## Step 5: Build and Deploy the New Public Blog
Task: Create a new, separate Next.js project for the public-blog. Build the UI and connect it to its own GitHub repository for content. Deploy it.

### Outcome:

Your new static blog is live at yourdomain.com, serving content from the Git repository.

Testable State: You have two working applications: the old admin panel (still on Vite) and the new public blog (on Next.js). You can make a change in the admin, save it, and trigger a rebuild of the public site to see the change live.

## Step 6: (Optional) Migrate the Admin App to Next.js
Task: Now that everything works, you can optionally replace the original Vite admin app with a new Next.js version. This involves moving your React components into a new Next.js project and integrating the "Git Backend" functions directly into its /pages/api directory.

### Outcome:

A new, modern admin panel at admin.yourdomain.com that has the same functionality but is now a consolidated Next.js application, making it easier to maintain in the long run.

Testable State: The entire system is now on the final, desired architecture.
