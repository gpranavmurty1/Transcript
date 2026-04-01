# US-13: View Role-Filtered Team & Mentor Directory

**Epic:** Epic 4: Team & Mentor Directory
**Role:** New Hire (Engineering, Product, Design)
**User Story:** As a new hire, I want to see a directory of relevant mentors and crew leads for my role so that I know who to reach out to.

---

### 1. Business Context
When a new hire joins our remote-first environment, finding the right mentor or practice leadership often involves tedious, manual searching through generic org charts or random Slack messages. This causes social friction—new hires fear "bothering the wrong person" or asking "dumb questions." To guide integration rather than relying on self-directed outreach, we need a curated, role-filtered directory that connects people to the specific mentors and crew leads dedicated to their practice area and region.

### 2. In Scope
- A dedicated "Directory" or "Team" view within the Smart Onboarding Companion.
- Filtering of directory contacts based exclusively on the user's selected role (Engineering, Product, or Design).
- Displaying specific leader profiles: Mentors, Practice Heads, and Crew Leads (specifically highlighting India and Australia leads across Enterprise, Scaleups, and Startups crews).
- Contact cards displaying:
  - Name
  - Role / Title
  - Region (e.g., India, Australia)
  - Short Bio or "Ask me about..." blurb
- Integrated "Email" button that opens the system's default mail client (`mailto:` link) pre-filled with the contact's email address.
- Integrated "Slack" button that deep-links to a Direct Message with the contact in the `everest-engineering.slack.com` workspace.

### 3. Out of Scope
- A comprehensive directory of every employee at the company (only curated mentors and leads are shown).
- The ability for the new hire to edit or update the contacts' profile information.
- In-app messaging or chat functionality (we rely on deep-linking to Slack).
- Real-time online/offline status indicators for the contacts.
- Scheduling or calendar integration with Google Calendar functionality.

### 4. Assumptions/Dependencies
- **Dependency:** Users are authenticating via Google OAuth with an `@everest.engineering` email, matching the Slack workspace domain.
- **Dependency:** Mentors and Crew Leads have active Slack profiles within the `everest-engineering` workspace, and we can retrieve or hardcode their unique Slack Member IDs for reliable deep-linking.
- **Assumption:** The contact data (names, roles, bios, emails, Slack IDs) will be maintained via a static configuration file or simple Firestore collection during the MVP, rather than dynamically importing from an HRIS like Workday or BambooHR.
- **Assumption:** The user has the Slack native app installed, or the deep link will intelligently route them to the Slack web client.

### 5. Acceptance Criteria
- **Scenario: Role-Filtered Visibility**
  - **Given** I am signed in as a Product Manager new hire,
  - **When** I navigate to the Team Directory,
  - **Then** I only see mentors, crew leads, and practice heads relevant to Product Management (not Engineering or Design).
  
- **Scenario: Contact Card Details**
  - **Given** I am viewing a contact in the directory,
  - **Then** the card displays their Name, Role, Region, a short Bio, an Email button, and a Slack button.

- **Scenario: Slack Deep-Link Integration**
  - **Given** I am viewing a relevant mentor's contact card,
  - **When** I click the Slack button,
  - **Then** the Slack application (or web client) opens directly to a new or existing Direct Message channel with that specific mentor.

- **Scenario: Email Integration**
  - **Given** I am viewing a relevant mentor's contact card,
  - **When** I click the Email button,
  - **Then** my default email client opens a compose window addressed to the mentor's correct Everest email address.

### 6. The Business Outcome it Impacts
- **Reduced Time-to-Productivity (Target: 5 weeks to 2 weeks):** Eliminates the delay of figuring out "who answers what" by fast-tracking the human connections required to unblock daily work.
- **Increase in New Hire Confidence / Reduced Social Anxiety:** Lowers the barrier to asking for help by explicitly identifying who is officially designated to support their specific role.
- **Completion of Required 1-on-1s:** Facilitates the "1-on-1 Completion" KPI by giving the new hire the exact names and 1-click contact methods for the people they are required to meet with according to their milestones.
