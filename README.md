# Room Inventory Tracker
I created this as a project to have a unique way of storing household items. I wanted a to visualize and track items without it feeling to much like a chore. I also wanted for users to be able to see a lot of items at once and for them to have the freedom to be able to organize visually in whichever way they wanted. 

## Future Changes 
Eventually I want to be able to move the project to be web hosted and to have storage functions keeping pages and items in tact even if users exit out.

## Features

- 🛋️ **Place Furniture** — Choose from a selection of hand-drawn furniture and drag it anywhere on the room saving its location
- 🎨 **Draw Items** — Use the built-in canvas fucntionality to draw items or import images
- 📦 **Item Management** — Assign items to specific furniture pieces and view them grouped together from the home screen
- 🗂️ **Per-Furniture Pages** — Each placed furniture has its own page for organizing its contents
- 🖱️ **Drag & Drop** — Move furniture and items freely around the room pinning down its location
- 🗑️ **Delete & Rename** — Remove or rename any item or furniture

## Tech Stack

- **React** — UI and component architecture
- **React Router** — Multi-page navigation with dynamic routes
- **Javascript** - Coding language 
- **Vite** — Build tool and dev server
- **react-sketch-canvas** — Used for hand-drawn item canvas
- **react-dropzone** — Image import via drag and drop

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/abcausten/room-inventory-tracker.git
cd room-inventory-tracker
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
src/
├── assets/ # Images and icons
├── components/ # Reusable components
│ ├── Menu.jsx
│ ├── MenuItems.jsx
│ ├── FurniturePicker.jsx
│ ├── ItemPicker.jsx
│ └── ItemsOverview.jsx
├── pages/ # Page components
│ ├── Room1.jsx
│ └── FurniturePage.jsx
└── main.jsx


## License
MIT
