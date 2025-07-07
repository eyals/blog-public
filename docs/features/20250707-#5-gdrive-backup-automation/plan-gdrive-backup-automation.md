# Plan: Google Drive Backup Automation

## Introduction / Overview
Create an automated GitHub Actions workflow that backs up the `posts/` directory to Google Drive whenever changes are pushed to the main branch. The system will use a Google Cloud service account with Drive API access and maintain the exact same folder structure in Google Drive. This ensures the blog content is automatically backed up to a secure off-site location without manual intervention.

## User Stories
- As a **blog owner**, I want my posts automatically backed up to Google Drive when I publish new content, so that I have a secure off-site backup
- As a **developer**, I want to be notified via email if the backup process fails, so that I can quickly address any issues  
- As a **content creator**, I want the backup to preserve the exact folder structure, so that I can easily navigate and restore content if needed

## Tests
- **What:** Workflow triggers only when posts/ directory changes
- **How:** Manual test by modifying a post and verifying workflow execution
- **Why:** Prevents unnecessary backup operations and API quota usage

- **What:** Backup maintains exact folder structure in Google Drive
- **How:** Manual verification of Google Drive folder structure after backup
- **Why:** Ensures content can be easily restored and navigated

- **What:** Email notifications sent on workflow failures
- **How:** Temporarily break workflow and verify email notification
- **Why:** Ensures backup failures are detected and can be quickly addressed

## Non-Goals (Out of Scope)
- Backing up other directories (admin/, site/, etc.)
- Incremental backups (full folder sync each time)
- Backup retention policies or cleanup
- Real-time backups (only on push to main)
- Two-way sync or restore functionality

## Technical Considerations
- Google Drive API has daily quotas that should be monitored
- Service account JSON credentials must be securely stored in GitHub Secrets
- Workflow will upload entire posts/ directory each time (simple but potentially redundant)
- Email notifications require SMTP configuration in GitHub Actions

## Related Files
- `posts/` directory - contains all blog post content that will be backed up
- `.github/workflows/` - will contain new workflow file for backup automation
- GitHub repository secrets - will store Google Drive credentials

## Tasks

### 1. Google Cloud Service Account Setup
- 1.1 Set active project to `eyal-blog`
- 1.2 Enable Google Drive API for the project
- 1.3 Create service account `github-backup-agent`
- 1.4 Grant Editor role to service account on project
- 1.5 Generate and save JSON key for service account
- 1.6 Extract client_email from JSON key for sharing step

### 2. Manual Google Drive Sharing
- 2.1 Provide client_email to user for manual sharing
- 2.2 Wait for user confirmation of sharing `blog-backup` folder
- 2.3 Verify sharing permissions are correctly set

### 3. GitHub Repository Configuration
- 3.1 Add `GDRIVE_CREDENTIALS` repository secret with JSON key content
- 3.2 Add `GDRIVE_FOLDER_ID` repository secret with folder ID
- 3.3 Create workflow file `.github/workflows/backup-posts-to-drive.yml`
- 3.4 Configure email notifications for workflow failures

### 4. Testing & Validation
- 4.1 Test workflow by making a test change to posts/ directory
- 4.2 Verify backup appears in Google Drive with correct structure
- 4.3 Test failure notification by temporarily breaking workflow
- 4.4 Commit and push final working configuration