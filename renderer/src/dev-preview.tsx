/**
 * Dev preview mode — renders a demo component tree without the MCP protocol.
 *
 * Open renderer.html#preview to see this. Accepts optional JSON via hash:
 *   renderer.html#preview:{"type":"Text","content":"Hello"}
 *
 * Without custom JSON, renders a showcase of all component types.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "sonner";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";

/** Comprehensive kitchen-sink tree — every component type in the registry. */
const DEMO_TREE: ComponentNode = {
  type: "Column",
  gap: 6,
  children: [
    { type: "H1", content: "Prefab Kitchen Sink" },
    { type: "Muted", content: "Every component type in the renderer. Use this page for visual debugging." },
    { type: "Separator" },

    // ── Layout ──────────────────────────────────────────────────────
    { type: "H2", content: "Layout" },
    { type: "H3", content: "Row" },
    {
      type: "Row",
      gap: 3,
      children: [
        { type: "Div", cssClass: "bg-blue-500 rounded-md h-10 w-20" },
        { type: "Div", cssClass: "bg-blue-500 rounded-md h-10 w-20" },
        { type: "Div", cssClass: "bg-blue-500 rounded-md h-10 w-20" },
      ],
    },
    { type: "H3", content: "Column" },
    {
      type: "Column",
      gap: 2,
      children: [
        { type: "Div", cssClass: "bg-emerald-500 rounded-md h-8 w-full" },
        { type: "Div", cssClass: "bg-emerald-500 rounded-md h-8 w-full" },
      ],
    },
    { type: "H3", content: "Grid" },
    {
      type: "Grid",
      columns: 3,
      gap: 3,
      children: [
        { type: "Div", cssClass: "bg-violet-500 rounded-md h-16" },
        { type: "Div", cssClass: "bg-violet-500 rounded-md h-16" },
        { type: "Div", cssClass: "bg-violet-500 rounded-md h-16" },
        { type: "Div", cssClass: "bg-violet-500 rounded-md h-16" },
        { type: "Div", cssClass: "bg-violet-500 rounded-md h-16" },
        { type: "Div", cssClass: "bg-violet-500 rounded-md h-16" },
      ],
    },
    { type: "H3", content: "Div & Span" },
    {
      type: "Div",
      cssClass: "bg-muted p-4 rounded-lg",
      children: [
        { type: "P", content: "A Div with " },
        { type: "Span", cssClass: "font-bold text-primary", children: [{ type: "Text", content: "inline Span" }] },
        { type: "Text", content: " nested inside." },
      ],
    },

    { type: "Separator" },

    // ── Typography ──────────────────────────────────────────────────
    { type: "H2", content: "Typography" },
    { type: "H1", content: "Heading 1 (H1)" },
    { type: "H2", content: "Heading 2 (H2)" },
    { type: "H3", content: "Heading 3 (H3)" },
    { type: "H4", content: "Heading 4 (H4)" },
    { type: "Heading", content: "Heading (level=2)", level: 2 },
    { type: "Lead", content: "Lead — larger, lighter text for introductions." },
    { type: "P", content: "P — Regular paragraph text. This is the default body copy style." },
    { type: "Text", content: "Text — General-purpose text component.", bold: true },
    { type: "Text", content: "Text italic", italic: true },
    { type: "Large", content: "Large text for emphasis." },
    { type: "Small", content: "Small text for fine print and metadata." },
    { type: "Muted", content: "Muted text for secondary information." },
    { type: "InlineCode", content: "InlineCode: const x = 42" },
    { type: "BlockQuote", content: "BlockQuote — Design is not just what it looks like." },

    { type: "Separator" },

    // ── Buttons & Badges ────────────────────────────────────────────
    { type: "H2", content: "Buttons" },
    { type: "H3", content: "Button Variants" },
    {
      type: "Row",
      gap: 2,
      cssClass: "flex-wrap",
      children: [
        { type: "Button", label: "Default" },
        { type: "Button", label: "Secondary", variant: "secondary" },
        { type: "Button", label: "Destructive", variant: "destructive" },
        { type: "Button", label: "Outline", variant: "outline" },
        { type: "Button", label: "Ghost", variant: "ghost" },
        { type: "Button", label: "Link", variant: "link" },
      ],
    },
    { type: "H3", content: "Button Sizes" },
    {
      type: "Row",
      gap: 2,
      cssClass: "items-center",
      children: [
        { type: "Button", label: "Tiny", size: "xs" },
        { type: "Button", label: "Small", size: "sm" },
        { type: "Button", label: "Default", size: "default" },
        { type: "Button", label: "Large", size: "lg" },
      ],
    },
    { type: "H3", content: "Disabled State" },
    {
      type: "Row",
      gap: 2,
      children: [
        { type: "Button", label: "Disabled Default", disabled: true },
        { type: "Button", label: "Disabled Outline", variant: "outline", disabled: true },
      ],
    },
    { type: "H3", content: "ButtonGroup" },
    {
      type: "ButtonGroup",
      children: [
        { type: "Button", label: "Left", variant: "outline" },
        { type: "Button", label: "Center", variant: "outline" },
        { type: "Button", label: "Right", variant: "outline" },
      ],
    },

    { type: "H2", content: "Badges" },
    {
      type: "Row",
      gap: 2,
      cssClass: "flex-wrap",
      children: [
        { type: "Badge", label: "Default" },
        { type: "Badge", label: "Secondary", variant: "secondary" },
        { type: "Badge", label: "Destructive", variant: "destructive" },
        { type: "Badge", label: "Success", variant: "success" },
        { type: "Badge", label: "Warning", variant: "warning" },
        { type: "Badge", label: "Info", variant: "info" },
        { type: "Badge", label: "Outline", variant: "outline" },
      ],
    },

    { type: "Separator" },

    // ── Alerts ──────────────────────────────────────────────────────
    { type: "H2", content: "Alerts" },
    {
      type: "Column",
      gap: 4,
      children: [
        {
          type: "Alert",
          children: [
            { type: "AlertTitle", content: "Default" },
            { type: "AlertDescription", content: "A neutral informational message." },
          ],
        },
        {
          type: "Alert",
          variant: "destructive",
          children: [
            { type: "AlertTitle", content: "Error" },
            { type: "AlertDescription", content: "Your session has expired. Please log in again." },
          ],
        },
        {
          type: "Alert",
          variant: "success",
          children: [
            { type: "AlertTitle", content: "Success" },
            { type: "AlertDescription", content: "Your changes have been saved successfully." },
          ],
        },
        {
          type: "Alert",
          variant: "warning",
          children: [
            { type: "AlertTitle", content: "Warning" },
            { type: "AlertDescription", content: "Your trial expires in 3 days." },
          ],
        },
        {
          type: "Alert",
          variant: "info",
          children: [
            { type: "AlertTitle", content: "Info" },
            { type: "AlertDescription", content: "A new version is available for download." },
          ],
        },
      ],
    },

    { type: "Separator" },

    // ── Cards ───────────────────────────────────────────────────────
    { type: "H2", content: "Cards" },
    {
      type: "Row",
      gap: 4,
      children: [
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", content: "User Profile" },
                { type: "CardDescription", content: "View and edit your information" },
              ],
            },
            {
              type: "CardContent",
              children: [
                {
                  type: "Column",
                  gap: 3,
                  children: [
                    { type: "Label", text: "Name" },
                    { type: "Input", placeholder: "Enter your name", name: "userName" },
                  ],
                },
              ],
            },
            {
              type: "CardFooter",
              children: [
                {
                  type: "Row",
                  gap: 2,
                  children: [
                    { type: "Button", label: "Save", onClick: { action: "showToast", message: "Saved!", variant: "success" } },
                    { type: "Button", label: "Cancel", variant: "outline" },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", content: "Notifications" },
                { type: "CardDescription", content: "Configure alerts" },
              ],
            },
            {
              type: "CardContent",
              children: [
                {
                  type: "Column",
                  gap: 4,
                  children: [
                    {
                      type: "Row",
                      gap: 2,
                      cssClass: "items-center justify-between",
                      children: [
                        { type: "Label", text: "Push Notifications" },
                        { type: "Switch", name: "pushEnabled" },
                      ],
                    },
                    {
                      type: "Row",
                      gap: 2,
                      cssClass: "items-center justify-between",
                      children: [
                        { type: "Label", text: "Email Digest" },
                        { type: "Switch", name: "emailDigest" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    { type: "Separator" },

    // ── Form Controls ───────────────────────────────────────────────
    { type: "H2", content: "Form Controls" },
    {
      type: "Row",
      gap: 6,
      children: [
        {
          type: "Column",
          gap: 4,
          cssClass: "flex-1",
          children: [
            { type: "H3", content: "Input" },
            { type: "Input", placeholder: "Text input", name: "textInput" },
            { type: "Input", inputType: "email", placeholder: "Email input" },
            { type: "Input", inputType: "password", placeholder: "Password input" },
            { type: "Input", inputType: "number", placeholder: "Number input" },
            { type: "Input", inputType: "date", placeholder: "Date input" },

            { type: "H3", content: "Textarea" },
            { type: "Textarea", placeholder: "Write something...", name: "message" },

            { type: "H3", content: "Select" },
            {
              type: "Select",
              placeholder: "Choose frequency...",
              name: "frequency",
              children: [
                { type: "SelectOption", value: "realtime", label: "Real-time" },
                { type: "SelectOption", value: "daily", label: "Daily" },
                { type: "SelectOption", value: "weekly", label: "Weekly" },
              ],
            },
          ],
        },
        {
          type: "Column",
          gap: 4,
          cssClass: "flex-1",
          children: [
            { type: "H3", content: "Checkbox" },
            { type: "Checkbox", label: "Accept terms and conditions", name: "terms" },
            { type: "Checkbox", label: "Subscribe to newsletter", name: "newsletter", checked: true },

            { type: "H3", content: "Switch" },
            {
              type: "Row",
              gap: 2,
              cssClass: "items-center",
              children: [
                { type: "Switch", name: "darkMode" },
                { type: "Label", text: "Dark mode" },
              ],
            },

            { type: "H3", content: "RadioGroup" },
            {
              type: "RadioGroup",
              name: "theme",
              children: [
                { type: "Radio", value: "light", label: "Light" },
                { type: "Radio", value: "dark", label: "Dark" },
                { type: "Radio", value: "system", label: "System" },
              ],
            },

            { type: "H3", content: "Slider" },
            { type: "Label", text: "Volume" },
            { type: "Slider", min: 0, max: 100, value: 50, name: "volume" },
            { type: "Small", content: "Current: {{volume }}" },

            { type: "H3", content: "Progress" },
            { type: "Progress", value: 65 },
            { type: "Progress", value: 85, indicatorClass: "bg-red-500" },
            { type: "Progress", value: 100, indicatorClass: "bg-green-500" },
          ],
        },
      ],
    },

    { type: "Separator" },

    // ── Content ─────────────────────────────────────────────────────
    { type: "H2", content: "Content" },
    { type: "H3", content: "Code" },
    {
      type: "Code",
      content: "from prefab import Prefab\n\nmcp = Prefab(\"demo\")\n\n@mcp.tool()\ndef greet(name: str) -> str:\n    return f\"Hello, {name}!\"",
      language: "python",
    },
    { type: "H3", content: "Markdown" },
    {
      type: "Markdown",
      content: "## Markdown Rendering\n\nSupports **bold**, *italic*, `inline code`, and:\n\n- Bullet lists\n- [Links](https://example.com)\n\n| Feature | Status |\n|---------|--------|\n| Tables  | ✅     |\n| Lists   | ✅     |",
    },
    { type: "H3", content: "Image" },
    {
      type: "Image",
      src: "https://placehold.co/400x120/EEE/31343C?text=Image+Component",
      alt: "Placeholder image",
      cssClass: "rounded-lg",
    },

    { type: "Separator" },

    // ── Table ───────────────────────────────────────────────────────
    { type: "H2", content: "Table" },
    {
      type: "Table",
      children: [
        { type: "TableCaption", content: "Recent invoices" },
        {
          type: "TableHeader",
          children: [
            {
              type: "TableRow",
              children: [
                { type: "TableHead", content: "Invoice" },
                { type: "TableHead", content: "Status" },
                { type: "TableHead", content: "Method" },
                { type: "TableHead", content: "Amount", cssClass: "text-right" },
              ],
            },
          ],
        },
        {
          type: "TableBody",
          children: [
            {
              type: "TableRow",
              children: [
                { type: "TableCell", content: "INV-001", cssClass: "font-medium" },
                { type: "TableCell", content: "Paid" },
                { type: "TableCell", content: "Credit Card" },
                { type: "TableCell", content: "$250.00", cssClass: "text-right" },
              ],
            },
            {
              type: "TableRow",
              children: [
                { type: "TableCell", content: "INV-002", cssClass: "font-medium" },
                { type: "TableCell", content: "Pending" },
                { type: "TableCell", content: "PayPal" },
                { type: "TableCell", content: "$150.00", cssClass: "text-right" },
              ],
            },
          ],
        },
      ],
    },

    // DataTable
    { type: "H2", content: "DataTable" },
    {
      type: "DataTable",
      columns: [
        { key: "name", header: "Name", sortable: true },
        { key: "email", header: "Email" },
        { key: "role", header: "Role", sortable: true },
        { key: "status", header: "Status" },
      ],
      rows: [
        { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
        { name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
        { name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive" },
        { name: "David Brown", email: "david@example.com", role: "Editor", status: "Active" },
        { name: "Eve Davis", email: "eve@example.com", role: "Admin", status: "Active" },
      ],
      searchable: true,
      paginated: true,
      pageSize: 3,
      caption: "Team members",
    },

    { type: "Separator" },

    // ── ForEach ─────────────────────────────────────────────────────
    { type: "H2", content: "ForEach" },
    {
      type: "Row",
      gap: 2,
      children: [
        {
          type: "ForEach",
          key: "tags",
          children: [
            { type: "Badge", label: "{{ _item }}", variant: "secondary" },
          ],
        },
      ],
    },
    {
      type: "ForEach",
      key: "team",
      children: [
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                {
                  type: "Row",
                  gap: 2,
                  cssClass: "items-center",
                  children: [
                    { type: "CardTitle", content: "{{ name }}" },
                    { type: "Badge", label: "{{ role }}", variant: "secondary" },
                  ],
                },
                { type: "CardDescription", content: "{{ email }}" },
              ],
            },
          ],
        },
      ],
    },

    { type: "Separator" },

    // ── Tabs ────────────────────────────────────────────────────────
    { type: "H2", content: "Tabs" },
    {
      type: "Tabs",
      defaultValue: "account",
      children: [
        {
          type: "Tab",
          title: "Account",
          value: "account",
          children: [
            {
              type: "Card",
              children: [
                {
                  type: "CardHeader",
                  children: [
                    { type: "CardTitle", content: "Account" },
                    { type: "CardDescription", content: "Make changes to your account here." },
                  ],
                },
                {
                  type: "CardContent",
                  children: [
                    {
                      type: "Column",
                      gap: 3,
                      children: [
                        { type: "Label", text: "Name" },
                        { type: "Input", name: "accountName", placeholder: "Your name" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Tab",
          title: "Password",
          value: "password",
          children: [
            {
              type: "Card",
              children: [
                {
                  type: "CardHeader",
                  children: [
                    { type: "CardTitle", content: "Password" },
                    { type: "CardDescription", content: "Change your password here." },
                  ],
                },
                {
                  type: "CardContent",
                  children: [
                    {
                      type: "Column",
                      gap: 3,
                      children: [
                        { type: "Label", text: "Current Password" },
                        { type: "Input", inputType: "password", name: "currentPassword" },
                        { type: "Label", text: "New Password" },
                        { type: "Input", inputType: "password", name: "newPassword" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Tab",
          title: "Disabled",
          value: "disabled",
          disabled: true,
          children: [{ type: "Text", content: "This tab is disabled." }],
        },
      ],
    },

    // Accordion
    { type: "H2", content: "Accordion" },
    {
      type: "Accordion",
      accordionType: "single",
      collapsible: true,
      defaultValue: "item-1",
      children: [
        {
          type: "AccordionItem",
          title: "Is it accessible?",
          value: "item-1",
          children: [
            { type: "Text", content: "Yes. It adheres to the WAI-ARIA design pattern." },
          ],
        },
        {
          type: "AccordionItem",
          title: "Is it styled?",
          value: "item-2",
          children: [
            { type: "Text", content: "Yes. It comes with default styles from shadcn/ui." },
          ],
        },
        {
          type: "AccordionItem",
          title: "Is it animated?",
          value: "item-3",
          children: [
            { type: "Text", content: "Yes. It uses CSS animations for smooth transitions." },
          ],
        },
      ],
    },

    // Pages
    { type: "H2", content: "Pages" },
    {
      type: "Column",
      gap: 3,
      children: [
        {
          type: "Row",
          gap: 2,
          children: [
            { type: "Button", label: "Home", onClick: { action: "setState", key: "currentPage", value: "home" } },
            { type: "Button", label: "Profile", variant: "outline", onClick: { action: "setState", key: "currentPage", value: "profile" } },
            { type: "Button", label: "Settings", variant: "outline", onClick: { action: "setState", key: "currentPage", value: "settings" } },
          ],
        },
        {
          type: "Pages",
          name: "currentPage",
          defaultValue: "home",
          children: [
            {
              type: "Page",
              title: "Home",
              value: "home",
              children: [
                {
                  type: "Alert",
                  children: [
                    { type: "AlertTitle", content: "Welcome Home" },
                    { type: "AlertDescription", content: "This is the home page. Click the buttons above to navigate." },
                  ],
                },
              ],
            },
            {
              type: "Page",
              title: "Profile",
              value: "profile",
              children: [
                { type: "Text", content: "Profile information would go here." },
              ],
            },
            {
              type: "Page",
              title: "Settings",
              value: "settings",
              children: [
                { type: "Text", content: "Configuration options would go here." },
              ],
            },
          ],
        },
      ],
    },

    { type: "Separator" },

    // ── Calendar & DatePicker ───────────────────────────────────────
    { type: "H2", content: "Calendar & DatePicker" },
    {
      type: "Row",
      gap: 6,
      children: [
        {
          type: "Column",
          gap: 2,
          children: [
            { type: "Label", text: "Single" },
            { type: "Calendar", name: "selectedDate" },
            { type: "Small", content: "Selected: {{selectedDate | date:long }}" },
          ],
        },
        {
          type: "Column",
          gap: 2,
          children: [
            { type: "Label", text: "Range" },
            { type: "Calendar", mode: "range", name: "dateRange" },
            { type: "Small", content: "Range: {{dateRange }}" },
          ],
        },
        {
          type: "Column",
          gap: 2,
          children: [
            { type: "Label", text: "Multiple" },
            { type: "Calendar", mode: "multiple", name: "multiDates" },
            { type: "Small", content: "Dates: {{multiDates }}" },
          ],
        },
      ],
    },
    {
      type: "Row",
      gap: 4,
      cssClass: "items-center",
      children: [
        { type: "DatePicker", placeholder: "Pick a deadline", name: "deadline" },
        { type: "Text", content: "Deadline: {{deadline | date:long }}" },
      ],
    },

    { type: "Separator" },

    // ── Overlays ────────────────────────────────────────────────────
    { type: "H2", content: "Overlays" },
    { type: "H3", content: "Tooltip" },
    {
      type: "Row",
      gap: 4,
      cssClass: "flex-wrap",
      children: [
        {
          type: "Tooltip",
          content: "Shows on top (default)",
          children: [{ type: "Button", label: "Top", variant: "outline" }],
        },
        {
          type: "Tooltip",
          content: "Shows on the right",
          side: "right",
          children: [{ type: "Button", label: "Right", variant: "outline" }],
        },
        {
          type: "Tooltip",
          content: "Shows on the bottom",
          side: "bottom",
          children: [{ type: "Button", label: "Bottom", variant: "outline" }],
        },
        {
          type: "Tooltip",
          content: "Shows on the left",
          side: "left",
          children: [{ type: "Button", label: "Left", variant: "outline" }],
        },
      ],
    },
    { type: "H3", content: "Popover" },
    {
      type: "Popover",
      title: "Dimensions",
      description: "Set the dimensions for the layer.",
      children: [
        { type: "Button", label: "Open popover", variant: "outline" },
        {
          type: "Column",
          gap: 3,
          children: [
            { type: "Label", text: "Width" },
            { type: "Input", name: "popWidth", placeholder: "100%" },
            { type: "Label", text: "Height" },
            { type: "Input", name: "popHeight", placeholder: "25px" },
          ],
        },
      ],
    },
    { type: "H3", content: "Dialog" },
    {
      type: "Dialog",
      title: "Edit Profile",
      description: "Make changes to your profile here. Click save when you're done.",
      children: [
        { type: "Button", label: "Open dialog", variant: "outline" },
        {
          type: "Column",
          gap: 3,
          children: [
            { type: "Label", text: "Name" },
            { type: "Input", name: "dialogName", placeholder: "Your name" },
          ],
        },
        {
          type: "Button",
          label: "Save changes",
          onClick: { action: "showToast", message: "Profile updated!", variant: "success" },
        },
      ],
    },

    { type: "Separator" },

    // ── Actions & State ─────────────────────────────────────────────
    { type: "H2", content: "Actions & State" },
    { type: "H3", content: "Toast" },
    {
      type: "Row",
      gap: 2,
      children: [
        { type: "Button", label: "Default Toast", onClick: { action: "showToast", message: "Hello from a toast!" } },
        { type: "Button", label: "Success", variant: "outline", onClick: { action: "showToast", message: "Operation succeeded", variant: "success" } },
        { type: "Button", label: "Error", variant: "destructive", onClick: { action: "showToast", message: "Something went wrong", variant: "error" } },
      ],
    },
    { type: "H3", content: "Conditional Rendering (visibleWhen)" },
    {
      type: "Column",
      gap: 2,
      children: [
        {
          type: "Button",
          label: "Toggle Details",
          variant: "outline",
          onClick: { action: "toggleState", key: "showDetails" },
        },
        {
          type: "Alert",
          visibleWhen: "showDetails",
          children: [
            { type: "AlertTitle", content: "Details" },
            { type: "AlertDescription", content: "This alert is conditionally rendered based on client state." },
          ],
        },
      ],
    },
    { type: "H3", content: "State Interpolation" },
    {
      type: "Column",
      gap: 2,
      children: [
        { type: "Input", placeholder: "Type your name...", name: "userName" },
        { type: "Text", content: "Hello, {{userName }}!" },
      ],
    },

    { type: "Separator" },

    // ── Separator Variants ──────────────────────────────────────────
    { type: "H2", content: "Separator" },
    { type: "Text", content: "Horizontal:" },
    { type: "Separator" },
    { type: "Text", content: "Content continues after separator." },
  ],
};

/** Demo data for ForEach and interpolation in the kitchen sink. */
const DEMO_DATA: Record<string, unknown> = {
  tags: ["python", "mcp", "prefab", "async"],
  team: [
    { name: "Alice", role: "Admin", email: "alice@example.com" },
    { name: "Bob", role: "Editor", email: "bob@example.com" },
    { name: "Carol", role: "Viewer", email: "carol@example.com" },
  ],
};

/** Injected preview data from the CLI `prefab apps preview` command. */
interface PreviewPayload {
  tree: ComponentNode;
  data: Record<string, unknown>;
  state?: Record<string, unknown>;
}

export function DevPreview({ injected }: { injected?: PreviewPayload }) {
  const hash = window.location.hash;
  const isDocEmbed = hash.startsWith("#docpreview:");

  // Parse hash once — supports bare tree or wrapped {_tree, _state, ...data} format
  const { hashTree, hashState, hashData, hashError } = useMemo(() => {
    const jsonStart = hash.indexOf(":");
    if (jsonStart === -1) return { hashTree: null, hashState: {}, hashData: {}, hashError: null };
    try {
      const raw = decodeURIComponent(hash.slice(jsonStart + 1));
      const obj = JSON.parse(raw);
      if (obj._tree) {
        // Extract user data: everything except _tree and _state
        const userData: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(obj)) {
          if (k !== "_tree" && k !== "_state") userData[k] = v;
        }
        return {
          hashTree: obj._tree as ComponentNode,
          hashState: (obj._state ?? {}) as Record<string, unknown>,
          hashData: userData,
          hashError: null,
        };
      }
      return { hashTree: obj as ComponentNode, hashState: {} as Record<string, unknown>, hashData: {}, hashError: null };
    } catch (e) {
      return { hashTree: null, hashState: {}, hashData: {}, hashError: (e as Error).message };
    }
  }, []);

  const hasCustomTree = !!(injected?.tree ?? hashTree);
  const defaultData = hasCustomTree ? hashData : { ...DEMO_DATA, ...hashData };
  const initialState = { ...(injected?.data ?? defaultData), ...(injected?.state ?? hashState) };
  const state = useStateStore(initialState);
  const [customTree, setCustomTree] = useState<ComponentNode | null>(
    injected?.tree ?? hashTree,
  );
  const [parseError] = useState<string | null>(hashError);
  const contentRef = useRef<HTMLDivElement>(null);

  // Listen for postMessage updates from playground shell
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "prefab:render") {
        const { tree, data: newData, state: newState } = event.data;
        if (tree) setCustomTree(tree);
        // Merge data into state (data is legacy, state is canonical)
        state.reset({ ...(newData ?? {}), ...(newState ?? {}) });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [state]);

  // For doc embeds, sync theme from parent so renderer matches the host page
  useEffect(() => {
    if (!isDocEmbed) return;
    const handler = (e: MessageEvent) => {
      if (e.data && e.data.type === "prefab:theme") {
        document.documentElement.classList.toggle("dark", e.data.dark);
      }
    };
    window.addEventListener("message", handler);
    // Request theme from parent now that we're ready to receive it
    window.parent.postMessage({ type: "prefab:ready" }, "*");
    return () => {
      window.removeEventListener("message", handler);
    };
  }, [isDocEmbed]);

  // For doc embeds, report content height to parent for iframe auto-sizing
  useEffect(() => {
    if (!isDocEmbed || !contentRef.current) return;
    const report = () => {
      const h = contentRef.current?.scrollHeight ?? 0;
      window.parent.postMessage({ type: "prefab:resize", height: h }, "*");
    };
    // Report after initial render and on any resize
    report();
    const observer = new ResizeObserver(report);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [isDocEmbed, customTree]);

  const tree = customTree ?? DEMO_TREE;

  // Doc embed mode: minimal chrome, transparent-friendly, tight padding
  if (isDocEmbed) {
    return (
      <div ref={contentRef} className="bg-transparent text-foreground p-4 min-h-screen flex items-center justify-center">
        {parseError && (
          <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            JSON parse error: {parseError}
          </div>
        )}
        <RenderTree tree={tree} state={state} app={null} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl p-8">
        {parseError && (
          <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            JSON parse error: {parseError}
          </div>
        )}
        <RenderTree tree={tree} state={state} app={null} />
      </div>
      <Toaster />
    </div>
  );
}
