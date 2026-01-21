🧩 MINI CRM

A Mini CRM (Customer Relationship Management) application built with React and TypeScript to manage leads, track statuses, and visualize key business metrics through a clean and intuitive dashboard.

✨ Features

📋 Lead Management – View, create, and update leads

🏷 Lead Status Tracking – Manage lead lifecycle (New, Contacted, Qualified, etc.)

📊 Dashboard KPIs – Quick insights into total leads and conversions

📈 Charts & Analytics – Visual representation of lead performance

🔍 Filtering & Sorting – Easily filter leads by status

🧾 Lead Details Drawer – View complete lead information

➕ Add Lead Modal – Simple UI to add new leads

✨ Features

📈 KPI Cards – Quick overview of key lead metrics

📊 Analytics & Charts – Visual insights into lead conversion and status

📋 Lead Table – Sortable, filterable, and paginated table

🏷 Lead Status Management – Update lead status with inline controls

🔍 Advanced Filters – Filter leads by status and other attributes

🧾 Lead Drawer / Modal – View detailed lead information

➕ Create Lead Modal – Add new leads easily

♻️ Reusable Components & Hooks – Clean and scalable architecture

🛠 Tech Stack

React

TypeScript

Tailwind CSS

shadcn/ui

Chart libraries (for analytics & visualizations)

Custom hooks & service layer

📂 Project Structure
src/
├── components/
│   ├── dashboard/
│   │   ├── KPICards.tsx
│   │   ├── LeadTable.tsx
│   │   ├── LeadDrawer.tsx
│   │   ├── LeadCharts.tsx
│   │   ├── LeadConversionAnalytics.tsx
│   │   ├── StatusBadge.tsx
│   │   └── ...
│   ├── filters/
│   │   └── FilterBar.tsx
│   └── kpi/
├── services/
│   └── leadsService.ts
├── types/
│   └── lead.ts
├── App.tsx
└── App.css

🚀 Getting Started
Prerequisites

Node.js (v16+ recommended)

npm or yarn

Installation
npm install
# or
yarn install

Run the Project
npm run dev
# or
yarn dev


The app will be available at:

http://localhost:5173

🧩 Key Concepts Used

Component-driven architecture

Strong typing with TypeScript

Separation of concerns (UI, services, hooks)

Reusable UI components

Clean and scalable folder structure

📌 Future Improvements

Authentication & role-based access

Backend integration (API)

Export leads to CSV / Excel

Dark mode support

Unit & integration tests


📄 License

This project is licensed under the MIT License.
