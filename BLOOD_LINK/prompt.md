# BLOOD LINK â€” COMPLETE APP REDESIGN PROMPT

## Project Objective

Redesign my existing **Blood Link â€” Emergency Blood Donor Network** project into a premium, modern, fully responsive, **app-style blood donation coordination platform**.

Use my attached reference image of the Blood Bridge mobile app as the main visual inspiration. Adapt its design language to my own brand, BLOOD LINK.

**IMPORTANT: I DO NOT WANT A TRADITIONAL WEBSITE. I WANT A GENUINE APP-LIKE EXPERIENCE.**

Do not create a generic website with a large navbar, oversized footer, long landing page, or separate pages that look unrelated. The application must feel like a polished mobile app on phones and a professional application dashboard on laptops.

Inspect my existing project files first. Preserve useful existing functionality and implement the redesign directly in the actual codebase.

## 1. Brand Identity and Visual Theme

App name: **BLOOD LINK**

Tagline: **One connection. A chance to help.**

Purpose: Connect blood requesters, willing donors and authorized healthcare facilities through a privacy-conscious coordination interface.

Follow the visual style of the attached reference image:

- Premium black and crimson-red healthcare technology aesthetic.
- Dark backgrounds with elegant red highlights.
- Modern, clean typography.
- Rounded cards with subtle borders.
- Soft red glow effects used selectively.
- Professional blood-drop, heart, heartbeat and medical icons.
- Smooth transitions and subtle micro-animations.
- Clear visual hierarchy and consistent spacing.
- Attractive dashboard cards, status indicators and action buttons.

### Colour palette

- Main background: `#090909`
- Secondary background: `#111111`
- Card background: `#191919`
- Elevated surface: `#202020`
- Primary crimson: `#D90429`
- Highlight red: `#F43F5E`
- Main text: `#F5F5F5`
- Secondary text: `#A3A3A3`
- Border: `#292929`

Use Inter or Space Grotesk typography and Lucide icons or a consistent icon library. Avoid excessive glow, oversized headings, clutter and unnecessary decoration.

## 2. Mandatory Navbar â€” ONLY Five Main Sections

The main application navigation must contain **exactly these five items**:

1. Home
2. Find Donors
3. Request
4. Alerts
5. Profile

Do not add Admin, Help, About, Become a Donor, Track Requests or any other item to the main navbar. Those features must remain accessible inside the appropriate screens, profile menu or secondary navigation.

### Mobile navigation

- Create a fixed bottom navigation bar with exactly the five items above.
- Display a consistent icon and short label for every item.
- Highlight the currently selected section with the crimson-red accent.
- Use a compact dark background and subtle top border or shadow.
- Keep all five items visible and evenly spaced on common mobile screen widths.
- Respect device safe areas and ensure the bar never covers important content.
- Use touch-friendly controls.

### Laptop and desktop navigation

- Use a compact, professional app-style navigation.
- You may use a slim top navigation or a collapsible sidebar, but retain the same five main sections.
- Keep the Blood Link logo compact and align the navigation properly.
- Use clear active states and restrained notification badges.
- Do not squeeze all navigation items into an oversized header.
- Prevent wrapping, overlapping, clipping and horizontal scrolling.

The mobile and desktop layouts should adapt naturally while maintaining the same five main navigation sections.

## 3. App Structure and Navigation Behaviour

Build a single cohesive application experience with five primary destinations. Use client-side screen switching or an appropriate lightweight routing approach so navigation feels immediate and app-like.

Do not make every feature a separate, unrelated website page.

The primary navigation should work as follows:

- **Home:** Main dashboard and quick actions.
- **Find Donors:** Search and filter the donor directory.
- **Request:** Create a blood request.
- **Alerts:** View notifications and updates.
- **Profile:** Personal details, donor settings and account options.

Track Requests, Become a Donor, AI FAQ Assistant, Admin Dashboard, About and Help must be accessible through relevant dashboard cards, contextual actions, profile options or protected secondary screens.

Use shared components for navigation, cards, buttons, modals, form fields and status badges.

## 4. Section One â€” Home Dashboard

Create a premium app dashboard inspired by the main phone screen in the reference image.

Include:

- A personalised welcome message.
- Blood Link logo and compact app header.
- A prominent **Request Blood** action.
- A prominent **Find Donors** action.
- A **Become a Donor** action for users who have not registered as donors.
- An emergency request entry point.
- Nearby or recent blood request cards.
- Blood group badges and urgency indicators.
- A summary of open requests and recent activity.
- A compact How Blood Link Works section.
- Privacy and safety information.
- Quick access to Track Requests and the AI FAQ Assistant.

Keep the layout compact, useful and easy to scan. On mobile, prioritise the most important actions above the fold.

Use clearly labelled sample data when live data is not available.

## 5. Section Two â€” Find Donors

Create an interactive donor discovery screen.

Include:

- Search by blood group.
- Blood group filters: A+, A-, B+, B-, AB+, AB-, O+ and O-.
- City or approximate location search.
- Availability filter.
- Sort options where appropriate.
- Donor cards with display name or privacy-safe identifier.
- Blood group, general location, availability and last-updated information where appropriate.
- A contact or response-request action that respects donor consent.
- Loading, no-results and error states.
- A clear empty state when no matching donors are available.

Use mock donor data for the prototype and label it as demo data.

Never display precise home addresses or private donor contact information publicly. Do not imply that a donor is medically eligible or clinically compatible based only on a matching blood group.

## 6. Section Three â€” Request Blood

Create a well-designed, mobile-friendly request form with appropriate validation.

Fields:

- Patient or requester name, with appropriate privacy safeguards.
- Required blood group.
- Number of units requested.
- Hospital name.
- Hospital city or location.
- Urgency level.
- Required date and time.
- Requester contact details, handled privately.
- Additional notes, with warnings not to enter unnecessary sensitive medical information.
- Hospital document upload field for the prototype.

Features:

- Clearly mark required fields.
- Validate missing or invalid inputs.
- Display helpful error messages.
- Prevent accidental duplicate submissions where possible.
- Show a review screen before submission.
- Generate a unique demo request reference.
- Show a success screen with the request summary.
- Provide options to view request details, track status or cancel an eligible request.

Hospital documents must never be stored in public folders or exposed through public URLs. Do not claim a document has been verified unless an authorised review process actually exists.

Clearly distinguish an urgent request submitted through Blood Link from a confirmed supply of blood. Direct users to a hospital or appropriate emergency service for urgent medical needs.

## 7. Section Four â€” Become a Donor

Build a clear donor registration flow.

Include:

- Name.
- Contact information, stored and displayed privately.
- Blood group.
- City or approximate location.
- Optional profile information where appropriate.
- Consent to be contacted for relevant requests.
- Notification preferences.
- Availability toggle.
- Edit profile option.
- Pause or withdraw consent option.

After registration, show a donor dashboard containing:

- Registration details.
- Current availability.
- Relevant request notifications.
- Responses the donor has made.
- Notification preferences.

Availability must be controlled by the donor. Do not automatically declare someone medically eligible to donate. Donation eligibility and screening belong to qualified healthcare professionals.

## 8. Section Five â€” Track Blood Requests

Create a dedicated request-tracking interface accessible from Home and Profile.

Support these statuses:

- Open
- Under Review
- Matched
- Accepted
- Fulfilled
- Cancelled

Display:

- Request reference number.
- Blood group and requested units.
- Hospital or general location.
- Current status.
- Status timeline.
- Timestamps for available status changes.
- Request details.
- Eligible cancellation action.
- Clear next steps.

Allow users to filter their own requests by status.

A donor match must not be presented as a guarantee that blood is available. Mark a request as Fulfilled only after appropriate confirmation from an authorised source or clearly labelled demo action.

## 9. Section Six â€” Alerts

Create a polished notifications screen accessible through the Alerts navbar item.

Include:

- New matching-request alerts.
- Donor response updates.
- Request status changes.
- Acceptance and confirmation updates.
- System announcements.
- Unread notification indicators.
- Read/unread state.
- Mark as read.
- Mark all as read.
- Clear empty state.
- Notification timestamps.

Use a compact list of modern cards with appropriate icons and subtle crimson highlights.

Implement in-app notifications for the prototype. Only claim SMS, email or push notifications work if the relevant integrations are actually configured and tested.

Show a notification badge on Alerts when unread demo notifications exist.

## 10. Section Seven â€” Profile

Create a clean profile and account settings screen.

Include:

- Profile information.
- Donor registration details.
- Blood group and general location, when relevant.
- Donation availability toggle.
- My Blood Requests.
- My Donor Responses.
- Notification preferences.
- Privacy settings.
- Consent management.
- Edit Profile.
- Logout.

Provide clear links to secondary features such as Track Requests, Become a Donor, Help and the AI FAQ Assistant.

Do not store plaintext passwords, API keys, hospital documents or sensitive patient information in browser localStorage.

If authentication is not connected to a secure backend, clearly label the login experience as a prototype rather than claiming secure production authentication.

## 11. Section Eight â€” AI FAQ Assistant

Create a modern in-app assistant accessible from the Home dashboard and relevant help links.

Include:

- A floating assistant button or compact entry card.
- A polished chat interface.
- Message bubbles.
- Suggested questions.
- Input field and send button.
- Loading indicator.
- Friendly error states.
- Clear conversation option.

Support questions about:

- How to request blood.
- How to register as a donor.
- How request review works.
- How to update availability.
- How to track requests.
- Privacy and consent.
- Frequently asked questions.

If no AI API is connected, implement a simple local FAQ response system and label it appropriately. Do not claim it is powered by live AI unless it is actually integrated.

The assistant must not make medical diagnoses or decide transfusion compatibility. Direct medical questions and emergencies to qualified healthcare professionals.

## 12. Section Nine â€” Admin Dashboard

Provide a separate administrative interface accessible through a dedicated Admin Login or protected secondary route, not through the five-item main navbar.

Include:

- Overview of demo requests.
- Request review queue.
- Private document-review workflow.
- Donor account management.
- Request status management.
- Suspicious request reports.
- Complaints and support reports.
- Basic activity summaries.
- Search and filtering.

Use a clear admin layout that follows the same dark crimson-red design system.

**Security requirement:** Frontend-only role checks are not sufficient for a real admin system. Production admin access and document review require server-side authorisation, secure storage and audit logging. Do not expose admin functions as genuinely secure when no backend exists.

## 13. Section Ten â€” About & Help

Make About and Help accessible through Profile, the Home dashboard or secondary links.

Include:

- About Blood Link.
- Mission and purpose.
- How the coordination process works.
- Frequently asked questions.
- Contact support form.
- Privacy policy draft.
- Terms and conditions draft.
- Consent and safety guidance.
- Clear explanation of demo limitations.

Keep this area compact and consistent with the app. Do not add a large footer to every dashboard screen.

## 14. Login, Sign Up and Role Selection

Create polished authentication screens consistent with the reference image.

Include:

- Login.
- Sign Up.
- Donor or Requester role selection.
- Appropriate form validation.
- Clear error and success messages.
- Logout.
- Separate Admin Login.

Authentication must be backed by a secure service before being treated as production-ready. If only a frontend prototype exists, label the functionality as demo authentication.

## 15. Responsive Layout Requirements

The application must work smoothly on:

- Mobile phones.
- Tablets.
- Laptop screens.
- Desktop screens.

Requirements:

- Use a mobile-first responsive layout.
- Use flexible grids and suitable CSS breakpoints.
- Keep cards readable at narrow widths.
- Avoid oversized headers and excessive empty space.
- Prevent overlapping elements.
- Prevent horizontal scrolling.
- Keep buttons and form controls touch-friendly.
- Ensure bottom navigation does not cover content.
- Use appropriate modal sizing and scrolling.
- Make tables responsive, converting them into cards where suitable on mobile.
- Respect device safe areas where supported.

On mobile, prioritise an app-like dashboard with compact navigation. On laptops, use the available screen width intelligently without stretching content excessively.

## 16. Technical Requirements

Use my existing technology stack:

- HTML5.
- CSS3.
- Vanilla JavaScript.

Inspect the existing project before editing. Reuse working code and existing assets where appropriate.

Organise code clearly into reusable components and files. A suitable structure may include:

- `index.html`
- `style.css`
- `script.js`
- `assets/`
- Additional modules or screens if genuinely useful.
- `README.md`

You may adjust this structure to fit the existing project.

Implement real interactions for navigation, search, filters, form validation, request creation, status tracking, notifications, profile editing and assistant responses.

Use localStorage only for non-sensitive prototype data. Keep sensitive documents, passwords, secrets and patient information out of localStorage and public assets.

Do not invent backend functionality, real donor availability, verified hospital records or live integrations.

## 17. Quality Testing

After implementation:

1. Run the actual application.
2. Test all five main navigation items.
3. Confirm each section displays the correct screen.
4. Test request form validation and submission.
5. Test donor search and filters.
6. Test notification read/unread interactions.
7. Test profile editing and availability controls.
8. Test request status tracking.
9. Test all secondary navigation and back actions.
10. Test mobile, tablet and laptop layouts.
11. Fix JavaScript errors, broken links, overlapping content and responsive issues.
12. Check keyboard navigation, focus states and accessible labels.
13. Ensure no visible buttons are decorative or non-functional.
14. Verify that the design remains consistent across all screens.

Do not stop after creating the Home dashboard. Complete and test the entire application.

## Final Acceptance Criteria

The finished Blood Link app must:

- Look visually inspired by the attached premium blood donation mobile-app reference.
- Use the black and crimson-red theme throughout.
- Have **exactly five main navbar items: Home, Find Donors, Request, Alerts and Profile**.
- Use fixed bottom navigation on mobile and compact app-style navigation on laptops.
- Avoid a traditional oversized website navbar and repeated large footer.
- Include all 10 requested sections and supporting authentication flows.
- Have working interactions rather than static mockup screens.
- Be responsive, accessible and visually consistent.
- Clearly identify prototype data and unimplemented integrations.
- Preserve privacy and avoid unsupported medical or verification claims.

**Build and test the complete application in my existing project. Do not return only a plan, mockup, landing page or explanation.**