# Design System Document

## 1. Overview & Creative North Star: "The Sonic Nebula"
This design system is not a utility; it is an immersive environment. To capture the essence of Suno AI’s generative music community, we move away from static, boxed layouts toward a **"Sonic Nebula"** aesthetic. 

The Creative North Star centers on **Luminous Depth**. We break the "template" look by treating the UI as a viewport into a deep, celestial soundscape. We prioritize intentional asymmetry—allowing hero elements to bleed off-canvas—and high-contrast typography scales that mirror the dynamic range of a musical composition. By layering semi-transparent materials over deep indigo voids, we create an interface that feels as boundless as AI-generated art.

---

### 2. Colors: The Depth of the Void
We define space through tonal transitions rather than structural lines. Our palette utilizes Material Design logic but applies it with an editorial, high-fidelity lens.

*   **Primary Hierarchy (`#ba9eff` / `#8455ef`):** Used for "Peak Moments"—the final action in a flow or a high-value prompt.
*   **Secondary Highlights (`#53ddfc` / `#40ceed`):** Used for interactive data, tags, and "AI-active" states.
*   **The "No-Line" Rule:** Designers are strictly prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background shifts (e.g., a `surface-container-high` card resting on a `surface-dim` background).
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of frosted obsidian. 
    *   **Background (`#060e20`):** The infinite void.
    *   **Surface Tiers:** Use `surface-container-low` for secondary content areas and `surface-container-highest` for the most prominent interactive cards.
*   **The "Glass & Gradient" Rule:** All primary cards must utilize Glassmorphism. Use `surface-variant` at 40% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** Apply a linear gradient (45deg) from `primary_dim` to `secondary_dim` at 10% opacity across the Hero section to provide a "chromatic hum" that flat colors cannot replicate.

---

### 3. Typography: The Editorial Rhythm
We pair the geometric precision of **Lexend** with the functional clarity of **Inter** to create a "Technical-Artistic" duality.

*   **Display (Lexend):** Used for impact. `display-lg` (3.5rem) should be used sparingly for hero headers, set with `-0.04em` letter spacing to feel tight and intentional.
*   **Headlines (Lexend):** `headline-md` (1.75rem) defines the start of content clusters. It acts as the "Hook" of the page.
*   **Body & Titles (Inter):** All functional text uses Inter. `body-lg` (1rem) is our standard for prompt descriptions, ensuring maximum readability against dark backgrounds.
*   **Labels (Inter):** `label-sm` (0.6875rem) in `on-surface-variant` is used for technical metadata (e.g., BPM, Genre tags), providing a "NASA-spec" aesthetic to the AI prompt data.

---

### 4. Elevation & Depth: Tonal Layering
In this system, light is the architect. We do not use shadows to "lift" objects; we use light to "reveal" them.

*   **The Layering Principle:** Depth is achieved by stacking. A prompt card (`surface-container-high`) should sit atop a section background (`surface-container-low`), creating a natural 3D hierarchy without heavy shadows.
*   **Ambient Shadows:** If a floating element (like a Playback Bar) requires a shadow, use a diffused blur (40px) at 8% opacity, tinted with `primary_dim`. This simulates the "glow" of the interface.
*   **The "Ghost Border":** For accessibility, if a container needs definition, use `outline-variant` at 15% opacity. Never use 100% opaque lines.
*   **Glassmorphism:** Navigation and active cards must use `surface-bright` at 20% opacity with a `blur(12px)` to maintain the "Sonic Nebula" feel, allowing the background colors to bleed through and soften the layout.

---

### 5. Components: Fluid Primitives

*   **Buttons:**
    *   **Primary:** A gradient fill from `primary` to `primary_dim`. `xl` roundedness (3rem). No border.
    *   **Secondary:** `surface-container-highest` fill with a `secondary` "Ghost Border."
*   **Prompt Cards:** Forbid the use of divider lines. Separate "Prompt Text" from "Metadata" using a `spacing-6` vertical gap. Use a `surface-container` background with `lg` (2rem) corner radius.
*   **Chips (Tags):** Use `secondary_container` with `on_secondary_container` text. Use `full` roundedness (9999px) to contrast against the softer `lg` cards.
*   **Input Fields:** Ghost-styled. `surface-container-lowest` background with an `outline-variant` (20% opacity). On focus, transition the border to `secondary` with a subtle outer glow.
*   **Waveform Visualizer:** A custom component specific to this community. Use a gradient of `secondary` to `primary` for the active state, rendered as minimalist vertical lines with varying heights.
*   **Tooltips:** `surface-bright` background, `0.5rem` radius, with a fast (150ms) fade-in to feel responsive and high-tech.

---

### 6. Do's and Don'ts

#### **Do:**
*   **Do** use asymmetrical margins (e.g., `spacing-24` on the left, `spacing-12` on the right) for hero sections to create a "custom" editorial feel.
*   **Do** use `primary_fixed_dim` for icons to ensure they feel like part of the brand, not third-party assets.
*   **Do** prioritize vertical whitespace (`spacing-12` or `16`) to separate sections rather than lines.

#### **Don't:**
*   **Don't** use pure white (#FFFFFF). Use `on_surface` (`#dee5ff`) to prevent eye strain and maintain the deep-sea atmosphere.
*   **Don't** use standard "drop shadows" (black, high opacity). They muddy the vibrant indigo backgrounds.
*   **Don't** use sharp corners. Every interactive element must have at least a `DEFAULT` (1rem) radius to feel organic and modern.