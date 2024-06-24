## Notion Updates

This project offers a dynamic way to track and report the progress of projects managed within Notion. It enables users to save snapshots of their Notion databases at different times and compare these snapshots to generate detailed reports about project advancements, task completions, and overall project status changes.

## Features

- **Snapshot Saving:** Allows users to save the current state of a Notion database as a snapshot for future reference.
- **Compare Snapshots:** Users can select two different snapshots of the same database to compare and generate a detailed progress report.
- **Project Progress Report:** Generates a comprehensive report detailing completed tasks, newly added tasks, and the overall progress made between two snapshots.

## Technologies Used

### Backend
- **[Node.js](https://nodejs.org/en/):** For creating the server-side application.
- **[Express.js](https://expressjs.com/):** Web application framework for Node.js to handle HTTP requests.

### Database
- **[MongoDB](https://www.mongodb.com/):** NoSQL database used to store snapshots of Notion databases.

### Frontend
- **[React.js](https://react.dev/):** For building the user interface.
- **[Ant Design](https://ant.design/):** A comprehensive UI design system based on React.

### Integration
- **[Notion API](https://developers.notion.com/):** To fetch data from Notion workspaces.
- **[OpenAI API](https://openai.com/api/):** For generating comprehensive reports using GPT models.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install` for both backend and frontend directories.
3. Run the app with `npm start` inside the root directory.
4. Configure necessary environment variables, including Notion API and OpenAI API keys.

## Repository Structure

### Backend
Overview of the backend structure:
- **config:** Database Initialization
- **controllers:** Contains functions to interact with the Notion API and database.
- **models:** Defines the MongoDB schemas for the project.
- **routes:** Contains routes for interacting with the Notion API and saving snapshots.
- **services:** Logic for comparing snapshots and generating reports.
- **utils:** Utility functions, including those for simplifying Notion data.

### Frontend
Overview of the frontend structure:
- **hooks:** Custom React hooks for fetching data.
- **pages:** Components corresponding to application routes.
- **utils:** Utility functions, including services to interact with the backend.
- **styles:** Contains CSS files for styling the application.

## Authors

- fabrig - [fabri-g](https://github.com/fabri-g)

