# Art Portfolio & Commission Portal

A modular, serverless art portfolio and commission management system built for high performance, custom styling, and streamlined administration. Deployed effortlessly using **Vercel Serverless Functions** and native web technologies (HTML, CSS, JS).

---

## 🏛 Architecture Overview

```text
my-art-portfolio/
├── api/                      # Vercel Serverless API Functions (Node.js runtime)
│   ├── auth/                 # Authentication endpoints (login, logout, session verification)
│   ├── admin/                # Admin management endpoints (dashboard, settings, website designer)
│   └── commissions/          # Commission workflows (submission, status transitions)
├── public/                   # Static public assets (images, customer/admin uploads)
│   └── assets/
│       ├── images/
│       └── uploads/
├── src/
│   ├── css/                  # Styling architecture (global, admin theme, public theme)
│   ├── js/                   # Frontend modular scripts (separated into admin and public)
│   │   ├── admin/
│   │   └── public/
│   └── views/                # Presentation layer (HTML templates)
│       ├── admin/            # Admin control panel views (login, dashboard, designer, preview, settings)
│       └── public/           # Public-facing views (portfolio index, commission order form)
├── package.json              # Project dependencies and script runner
├── vercel.json               # Serverless route mapping and clean URL configuration
└── README.md                 # Project architecture and technical documentation
```

---

## 🔒 Separation of Concerns

1. **Backend / API (`/api`)**:
   - Built as stateless Vercel Serverless Functions.
   - Enforces authentication checks on sensitive administrative routes via secure session cookies or JWT headers.
   - Handles data persistence, image asset references, and commission state transitions.

2. **Presentation (`/src/views`)**:
   - Clean, semantic HTML templates.
   - Strict separation between the client-facing public view and password-protected administrative interfaces.

3. **Styling & Theming (`/src/css`)**:
   - `global.css`: Base resets, typography tokens, layout grid, CSS custom properties.
   - `public-theme.css`: Sleek, aesthetic dark/vibrant styling for client-facing showcase and commission booking.
   - `admin-theme.css`: Functional, clean UI system for the admin dashboard and live theme customizer.

4. **Client-side Logic (`/src/js`)**:
   - Pure vanilla JavaScript with module-ready organization.
   - Asynchronous fetch calls to the `/api/*` endpoints.

---

## 🗺 Development Roadmap

### Phase 1: Admin Infrastructure (Priority Focus)
- [ ] **Authentication & Security (`/api/auth`)**:
  - Secure login flow (`login.js`, `login.html`)
  - Session verification middleware (`verify-session.js`, `auth-client.js`)
  - Invalidation/logout handling (`logout.js`)
- [ ] **Admin Layout & Navigation (`/src/views/admin`, `sidebar-navigation.js`)**:
  - Collapsible responsive sidebar
  - Breadcrumb and authenticated user state indicators
- [ ] **Dashboard (`dashboard.html`, `dashboard-data.js`, `dashboard.js`)**:
  - Overview cards: active commission orders, total revenue, pending requests
  - Recent inquiries table and status toggles
- [ ] **Website Designer & Theme Preview (`designer.html`, `preview.html`, `website-designer.js`)**:
  - Interactive theme customizer (colors, header banners, gallery layouts)
  - Real-time side-by-side or iframe preview
- [ ] **Site Settings (`settings.html`, `site-settings.js`)**:
  - Commission slots capacity, social links, contact email, and payment methods

### Phase 2: Public Portfolio & Client Experience
- [ ] **Public Gallery (`index.html`, `portfolio-gallery.js`, `public-theme.css`)**:
  - Filterable categorized art gallery (Digital, Traditional, Concept Art)
  - Lightbox modal with high-resolution image zoom and artwork metadata
- [ ] **Commission Order Portal (`commission-order.html`, `commission-form.js`, `create-request.js`)**:
  - Interactive pricing calculator based on selected art type, character count, and license
  - Reference image upload handler
  - Real-time commission slot availability check

### Phase 3: Order Lifecycle & Post-launch Polishing
- [ ] Status updates and email notifications (`update-status.js`)
- [ ] Responsive UI fine-tuning and performance optimization
- [ ] Production deployment on Vercel
