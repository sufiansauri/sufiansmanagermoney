---
name: Serene Hearth Financial
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#416656'
  on-secondary: '#ffffff'
  secondary-container: '#c3ecd7'
  on-secondary-container: '#476c5b'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#c3ecd7'
  secondary-fixed-dim: '#a8cfbc'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#294e3f'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  numeric-currency:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system expresses calm authority, collective security, and warm stewardship for household wealth. Balancing fintech precision with the emotional warmth required for family financial planning, the visual language avoids the cold, clinical feel of corporate banking as well as the gamified noise of retail trading apps.

### Core Tenets
- **Clarity over Density:** Financial metrics are surfaced through clear micro-hierarchies, ensuring partners can review budgets together without cognitive friction.
- **Supportive & Reassuring:** Monetary tracking is grounded in reassurance. Positive states reinforce confidence, while warnings and expenses remain informative and supportive rather than punitive.
- **Tactile Soft-Modernism:** The interface pairs generous, soft corner radii with pillowed surfaces, gossamer borders, and gentle ambient elevations to evoke stability and domestic harmony.

## Colors

The palette establishes an equilibrium between structural fiscal resilience and everyday emotional warmth.

### Palette Architecture
- **Primary (`#0D9488` - Deep Teal):** The anchor of the interface. Applied to prime focal points, primary action triggers, key metric callouts, and navigational active states.
- **Secondary (`#D1FAE5` - Soft Mint):** Used for positive cash flow surfaces, credit badges, income confirmations, and subtle metric container backgrounds.
- **Tertiary (`#F59E0B` - Amber Gold):** Dedicated to shared long-term aspirations, emergency reserves, family goal tracking, and sacred obligations such as Zakat.
- **Accent Negative (`#EF4444` - Warm Coral):** Applied strictly to debits, outflows, budget ceilings, and critical warnings. Balanced with warm undertones to prevent anxiety.
- **Surface & Canvas (`#F8FAFC` to `#F1F5F9`):** Multi-tiered cool slate foundations providing crisp separation without harsh borders.
- **Text & Neutral (`#0F172A` to `#64748B`):** High legibility slates ensuring optimal contrast across light-washed containers.

## Typography

The typographic hierarchy pairs the welcoming, humanist geometric forms of **Plus Jakarta Sans** for headers, totals, and values with the functional clarity of **Inter** for dense transactional tables, data rows, and input labels.

- **Tabular Figures:** Monetary and balance components must explicitly enable `font-feature-settings: "tnum"` to prevent baseline layout shifts across live expense updates.
- **Display and Balances:** Key totals use negative tracking (`-0.02em` to `-0.03em`) to anchor the primary financial story with authoritative balance.
- **Labels & Microcopy:** Badges, transaction categories, and timestamps use medium and semibold weights to preserve legibility against pastel pill containers.

## Layout & Spacing

The interface employs a responsive fluid-grid structure tuned for mobile-first handheld expense entry while expanding gracefully into multi-column family balance sheets on larger tablets and desktop portals.

### Breakpoint Strategy
- **Mobile (Base to 639px):** 4-column layout with `margin: 1rem` and `gutter: 1rem`. Bottom sheets, fluid summary strips, and stacked transaction cards predominate.
- **Tablet (640px to 1023px):** 8-column layout with `margin-md: 2rem` and `gutter-md: 1.5rem`. Introduces side-by-side metric tiles (e.g., Household Cash Flow next to Savings Trajectory).
- **Desktop (1024px+):** 12-column layout capped at a max-width of `1280px` centered via `margin-lg: 3rem` with `gutter-lg: 2rem`. Sidebar navigation paired with dual-card financial dashboards.

### Spacing Rules
Component interior padding defaults strictly to `space-lg` (`1.5rem`) for standard summary modules and `space-md` (`1rem`) for dense micro-cards and ledger rows.

## Elevation & Depth

Visual hierarchy uses softly stacked planes and tinted ambient shadows rather than stark elevation contrasts, maintaining a featherlight, domestic touch.

### Surface Tiers
- **Canvas Base (`#F8FAFC`):** The structural background substrate.
- **Sub-Surface Tier (`#F1F5F9`):** Recessed wells used for categorized transaction histories, segment wrappers, and disabled field enclosures.
- **Elevated Micro-Cards (`#FFFFFF`):** Base surface for all standard interactive modules, inputs, and overview widgets.

### Ambient Shadow Formula
Shadows are tinted with a whisper of deep teal slate to eliminate gray murkiness:
- **Low Elevation (Resting Cards, Inputs):** `0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 1px 3px -1px rgba(13, 148, 136, 0.03)`.
- **Mid Elevation (Hovered Cards, Dropdowns, Sheets):** `0 12px 24px -6px rgba(15, 23, 42, 0.06), 0 4px 8px -2px rgba(13, 148, 136, 0.04)`.
- **High Elevation (Overlays, Modal Dialogs):** `0 20px 32px -8px rgba(15, 23, 42, 0.10), 0 8px 16px -4px rgba(13, 148, 136, 0.06)`.

Each elevated white surface maintains a hairline boundary (`1px solid #F1F5F9` or `1px solid rgba(226, 232, 240, 0.8)`) for clean visual definition.

## Shapes

The geometric identity relies on softened, approachable forms that make financial interfaces feel welcoming.

- **Primary Cards & Modals:** Standardized on `rounded-2xl` (`1rem` to `1.25rem`), eliminating sharp edges across all key financial displays.
- **Input Fields & Action Controls:** Form fields, interactive buttons, and dropdown selectors follow an explicit `0.75rem` (`rounded-xl`) perimeter.
- **Badges, Tags, and Indicators:** Family member avatars, category chips, status indicators, and pill buttons use full-radius caps (`rounded-full`).

## Components

### Buttons
- **Primary:** Solid Emerald Teal (`#0D9488`) fill, white text, subtle hover lift, font-weight 600, `rounded-xl`, height 44px (48px on mobile).
- **Secondary / Soft:** Soft Mint (`#D1FAE5`) fill, Deep Teal (`#0D9488`) text, zero border, designed for low-friction actions like "Add Sub-category" or "Split With Partner".
- **Tertiary / Outlined:** White fill, Slate outline (`#E2E8F0`), muted text (`#475569`), transitioning to a teal border on focus.

### Metric Micro-Cards
- Encased in white `#FFFFFF`, bordered with `1px solid #E2E8F0`, rounded at `1rem`.
- Feature a miniature icon capsule (36x36px) colored according to intent: Soft Mint for income, warm blush for expenses, and pale amber for Zakat and savings.
- Contain a micro-label (12px, semibold, slate), a prominent balance display (Plus Jakarta Sans, bold), and a bottom delta tag.

### Category & Status Chips
- Height 24px to 28px, compact padding (`0.25rem 0.75rem`), fully pill-shaped (`rounded-full`).
- **Income Chip:** Mint background (`#ECFDF5`), Emerald text (`#047857`).
- **Expense Chip:** Coral tint background (`#FEF2F2`), Coral text (`#DC2626`).
- **Goal / Zakat Chip:** Amber tint background (`#FFFBEB`), Amber text (`#B45309`).

### Input Fields
- Inset light background (`#FFFFFF`) with a 1px border in `#E2E8F0`.
- 12px vertical padding with 16px horizontal padding.
- Focused state features a crisp `2px` focus ring in `rgba(13, 148, 136, 0.25)` paired with a solid `#0D9488` border.
- Leading icon slots for currency markers (`Rp`, `$`) rendered in non-intrusive muted slate (`#94A3B8`).

### Transaction Ledger List
- Row-based list styled with alternating soft hover states (`#F8FAFC`).
- Separators use fine-line dividers (`1px solid #F1F5F9`).
- Left region: Circular category icon wrapper (40px) accompanied by transaction title and dual-timestamp.
- Right region: Primary monetary delta colored according to direction (Emerald for inflows, Coral for outflows), stacked above family contributor indicator tags (e.g., "Sufian", "Qori").

### Family Goal & Zakat Progress Cards
- Displays target amount, current funded pool, and a dual-tint progress bar.
- Progress track: Height 8px, background `#F1F5F9`, filled with Amber Gold (`#F59E0B`) or Emerald Teal (`#0D9488`).
- Bottom row surfaces avatar badges indicating which family member contributed to the milestone.