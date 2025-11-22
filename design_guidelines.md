# Design Guidelines: Rail Electr / GCF ERP System

## Design Approach: Enterprise Design System

**Selected System**: Carbon Design System (IBM) - optimized for data-intensive enterprise applications with complex workflows.

**Rationale**: This ERP requires high information density, multiple data tables, form-heavy interfaces, and dashboard analytics. Carbon Design excels at organizing complex enterprise data while maintaining clarity and usability.

## Typography Hierarchy

**Font Stack**: IBM Plex Sans via CDN (system fallback: -apple-system, BlinkMacSystemFont, "Segoe UI")

**Hierarchy**:
- H1 (Page Titles): 2rem (32px), weight 400
- H2 (Section Headers): 1.5rem (24px), weight 600  
- H3 (Subsections): 1.25rem (20px), weight 600
- H4 (Card Headers): 1.125rem (18px), weight 600
- Body: 1rem (16px), weight 400
- Small/Meta: 0.875rem (14px), weight 400
- Labels: 0.875rem (14px), weight 600, uppercase tracking

## Layout System

**Spacing Units**: Use Tailwind spacing with consistent 4px increments
- **Primary spacing**: 4, 6, 8, 12 units (p-4, p-6, p-8, p-12)
- **Component spacing**: 2, 3, 4 units for internal padding
- **Section spacing**: 8, 12, 16 units for major sections

**Grid Structure**:
- Dashboard: 12-column responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- Content max-width: max-w-7xl centered
- Sidebar: Fixed 240px (desktop), collapsible to 64px icons-only, overlay on mobile

## Component Library

### Navigation
**Primary Sidebar**:
- Fixed left sidebar, full height
- Logo section at top (80px height)
- Icon + label navigation items (h-12)
- Collapsible sub-menus with indent
- User profile section at bottom
- Active state: border-left accent (4px)

**Top Header**:
- Fixed top bar (h-16)
- Breadcrumb navigation (left)
- Global search bar (center-right, expandable)
- Notifications bell + user menu (right)

### Dashboard Components
**Stat Cards**:
- Grid layout: 4 columns on xl, 2 on md, 1 on mobile
- Height: h-32
- Content: Large number (3xl), label below (sm), icon top-right
- Hover: subtle lift shadow

**Data Tables**:
- Sticky header row
- Alternating row backgrounds for readability
- Column headers: sortable with arrows
- Row actions: icon buttons right-aligned
- Pagination: bottom-right
- Filters: top bar above table
- Row height: h-14 for comfort

**Charts & Visualizations**:
- Container: aspect-video ratio for charts
- Use Chart.js or Recharts via CDN
- Types: Bar, Line, Pie, Gantt
- Legend: bottom placement
- Responsive sizing

### Forms
**Input Fields**:
- Height: h-10 standard
- Label above (required asterisk right-aligned)
- Border: 1px standard, 2px focus state
- Helper text below (text-sm)
- Error state: border accent + message below

**Form Layouts**:
- Single column mobile, 2-column desktop for related fields
- Fieldsets with subtle borders and legends
- Action buttons: right-aligned, primary + secondary pattern
- Spacing between field groups: mb-6

**Select & Date Pickers**:
- Custom dropdown styling matching input height
- Calendar picker: modal overlay for date selection
- Multi-select: tags with remove × icons

### Modals & Overlays
**Modal Structure**:
- Backdrop: semi-transparent overlay
- Content: centered, max-w-2xl
- Header: h-16 with title and close ×
- Body: p-6 with scrollable content
- Footer: p-4 with action buttons

**Notification Center**:
- Slide-in panel from right (w-96)
- List of notifications with timestamps
- Badge count on bell icon
- Mark as read functionality

### Cards & Containers
**Standard Card**:
- Border radius: rounded-lg
- Padding: p-6
- Shadow: subtle elevation
- Header with title + optional actions

**Document Cards**:
- Thumbnail preview (left)
- Metadata grid (right)
- File type icon badge
- Actions dropdown (top-right)

### Print Templates
**Printable Documents**:
- A4 dimensions (210mm × 297mm)
- Header: Company logo + document title
- Footer: Page numbers + generation date
- Margins: 20mm all sides
- Typography: Optimized for print (serif for body text)

## Interaction Patterns

**Navigation Flow**:
- Sidebar primary navigation
- Breadcrumbs for depth
- Back buttons on detail views
- Persistent search accessibility

**Data Management**:
- Bulk actions: checkbox selection + action bar
- Inline editing: double-click to edit cells
- Quick filters: dropdown above tables
- Export buttons: top-right of data views

**Feedback**:
- Toast notifications: top-right corner
- Loading states: skeleton screens for tables
- Progress indicators: linear bars for uploads
- Success/error states: inline with actions

**Animations**: Minimal and purposeful
- Page transitions: subtle fade (150ms)
- Modal entrances: scale + fade (200ms)
- Dropdown menus: slide down (150ms)
- NO scroll animations, parallax, or decorative motion

## Responsive Breakpoints

- Mobile: < 768px (single column, hamburger menu)
- Tablet: 768px - 1024px (2 columns, collapsible sidebar)
- Desktop: 1024px - 1440px (3 columns, full sidebar)
- Large: > 1440px (4 columns, spacious layout)

## Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation: all interactive elements
- Focus indicators: 2px outline offset
- ARIA labels: all icons and actions
- Screen reader: semantic HTML structure
- Skip links: "Skip to main content"

## Icons

**Library**: Lucide React (already in dependencies)
- Consistent 20px size for navigation
- 16px for inline icons
- 24px for feature highlights
- Stroke width: 2px standard

## Images

**Corporate Branding**:
- Rail Electr and GCF logos: Display in sidebar header and login page
- Logo sizing: h-12 in sidebar, h-16 on login
- Authentication page: Full-height background (railway/construction imagery), frosted glass login card centered

**Dashboard**:
- No hero images (data-focused interface)
- Employee avatars: 40px circular in lists, 120px on profile pages
- Document thumbnails: 64px × 64px in file browsers
- Project images: 16:9 aspect ratio in project cards