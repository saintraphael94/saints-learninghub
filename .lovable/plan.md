## Enrollment Platform Plan

### Phase 1: Enable Backend & Database
- Enable Lovable Cloud for database, auth, and edge functions
- Create database tables: `enrollments`, `courses`, plus admin `user_roles`

### Phase 2: Update Landing Page
- Redesign hero section with new copy and CTA
- Replace course cards with the 5 specified courses
- Update color palette to blue/purple calming tones

### Phase 3: Multi-Step Enrollment Form
- Build an 8-step form with progress bar and animations
- Steps: Personal Info → Course Selection → Skill Level → Goals → Tech Readiness → Payment → Communication → Consent
- Form validation with Zod, data saved to Supabase on submission

### Phase 4: Success Page
- Show confirmation with selected courses and next steps

### Phase 5: Admin Dashboard
- Protected admin page to view all submissions
- CSV/Excel export functionality
- Basic stats (total enrollments, popular courses)

### Phase 6: Email Notifications (Future-Ready)
- Structure for email on submission (requires email domain setup)
- WhatsApp API placeholder for future integration

### Notes
- Payment integration is UI-only for now (proof of payment upload via Supabase Storage)
- Admin auth uses Supabase auth + user_roles table
- All form data stored in structured database tables