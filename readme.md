Certainly! Below are two separate `README.md` files: one for the experiment setup (frontend and backend) and one for the Rasa chatbot.

### README for Experiment Setup (Frontend and Backend)

```markdown
# Dark Patterns Experiment Project - Experiment Setup

This project is designed to conduct experiments around chatbot interactions involving dark patterns. This README covers the setup of the frontend and backend components.

## Project Structure

Due to the large data load and size, the project has been divided into two separate branches:

- **Frontend and Backend**: Available on the `experimental-setup-core` branch.

### Cloning the Repository

To clone the repository and switch to the `experimental-setup-core` branch:

```bash
git clone https://gitlab.hrz.tu-chemnitz.de/vsr/edu/advising/ma-firdos-khatoon-khan.git
cd ma-firdos-khatoon-khan
git checkout experimental-setup-core
```

## Prerequisites

Before setting up the project, ensure you have the following installed:

### Software Requirements

- **Node.js**: Version 14.x or later.
- **npm**: Version 6.x or later (comes with Node.js).
- **MongoDB**: An accessible instance of MongoDB (Atlas or local) for data storage.

## Installation

Follow these steps to set up the project on your local machine or server.

### 1. Setup Backend

#### 1.1 Install Node.js Dependencies

Navigate to the backend directory and install the required Node.js packages:

```bash
cd experiment-setup/backend
npm install
```

### 2. Setup Frontend

#### 2.1 Install React Dependencies

Navigate to the frontend directory and install the required React packages:

```bash
cd ../frontend
npm install
```

## Configuration

### 1. MongoDB

Ensure that your MongoDB instance is running and accessible. Update the `MONGO_URI` in your backend's `.env` file:

```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdbname?retryWrites=true&w=majority
```

## Running the Project

### Backend

Start the backend server using Node.js:

```bash
cd experiment-setup/backend
node server.js
```

### Frontend

Start the React frontend:

```bash
cd ../frontend
npm start
```

## Task and Dark Pattern Mapping

This section provides an overview of how tasks are mapped to dark patterns. The following table shows the mapping of tasks, indicating whether they are a dark pattern task (DP) or a regular use case (Reg), and the corresponding chatbot folder containing these tasks.

| **Folder Name**         | **Task 1**                                  | **Task 2**                                  | **Task 3**                                  | **Description**                                                                                                                                         |
|-------------------------|---------------------------------------------|---------------------------------------------|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `task1-dp+task2-reg`     | Task 1: Hard to Cancel (DP)                 | Task 2: Confirmshaming- Social Engineering (Reg) | -                                           | This folder contains Task 1 as a dark pattern task covering *Hard to Cancel (Covers Obstruction)* and Task 2 as a regular case covering *Confirmshaming*. |
| `task2-dp+task3-reg`     | -                                           | Task 2: Confirmshaming- Social Engineering (DP)  | Task 3: Forced Action (Reg)                | This folder contains Task 2 as a dark pattern task covering *Confirmshaming- Social Engineering* and Task 3 as a regular case covering *Forced Action*. |
| `task3-dp+task1-reg`     | Task 1: Hard to Cancel (Reg)                | -                                           | Task 3: Forced Action (DP)                 | This folder contains Task 3 as a dark pattern task covering *Forced Action (Including Subtle Nagging)* and Task 1 as a regular case covering *Hard to Cancel*. |

### Task and Dark Pattern Overview

- **Task 1**: 
  - **Dark Pattern**: Hard to Cancel (Covers Obstruction)
  - **Regular**: Normal cancellation process without obstacles.

- **Task 2**: 
  - **Dark Pattern**: Confirmshaming- Social Engineering
  - **Regular**: A straightforward subscription cancellation without guilt-tripping.

- **Task 3**: 
  - **Dark Pattern**: Forced Action (Including Subtle Nagging)
  - **Regular**: Accessing services without being forced to accept alerts or updates.

This mapping helps in understanding how tasks are allocated and ensures that each participant experiences a combination of dark pattern and regular tasks, enhancing the experiment's effectiveness.

## Admin Panel

The admin panel is accessible at `http://localhost:3000/admin/dashboard` after logging in with the credentials `admin` both as username and password. It allows you to manage experiments, view results, and interactions.

## Experiment Flow

The experiment begins with collecting demographic data from participants, which is displayed in the admin panel for the researcher to review. Tasks are randomly assigned to participants, ensuring a balanced mix of dark patterns and regular tasks. The flow of the experiment is as follows:

1. **Welcome Page**: Introduction to the experiment.
2. **Demographic Data Form**: Collect user demographics.
3. **Chatbot Interaction**: Participants engage with the chatbot in assigned tasks.
4. **User Experience Survey (UEQ)**: Participants complete the UEQ survey.
5. **Feedback Survey**: Additional feedback collection.
6. **Thank You Page**: End of the experiment.

## Notes

- Ensure you are on the correct branch (`experimental-setup-core`) when working on the frontend/backend components of the project.
- For any issues or errors during setup, consider checking the MongoDB connection settings or reviewing the frontend/backend configuration.

By following these instructions, you should be able to set up and run the experiment on your local machine or server.
```
