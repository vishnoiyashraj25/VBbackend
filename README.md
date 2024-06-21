This backend server is built using Express and TypeScript. It handles form submissions, stores them in a JSON file (db.json), and provides endpoints for creating and retrieving submissions.

# Requirements
Node.js (v12 or higher)
TypeScript

# Setup
# 1. Clone the Repository
First, clone the repository to your local machine:
git clone https://github.com/vishnoiyashraj25/VBbackend.git
cd Task

# 2. Install Dependencies
Install the necessary dependencies using npm:
npm init -y    
npm install express body-parser
npm install --save-dev typescript ts-node @types/node @types/express @types/body-parser
npx tsc --init

# 3. Start the Server
Start the Express server:
npx ts-node src/index.ts

The server will be running at http://localhost:3000.
