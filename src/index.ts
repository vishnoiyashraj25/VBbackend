import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface Submission {
  SubmissionName: string;
  Email: string;
  Phone: string;
  GitHubLink: string;
  StopwatchTime: string;
}

const dbPath = path.join(__dirname, 'db.json');

const readSubmissions = (): Submission[] => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
    return [];
  }
  const data = fs.readFileSync(dbPath, 'utf-8');
  if (!data.trim()) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

const writeSubmissions = (submissions: Submission[]) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error writing submissions:', error);
  }
};

app.get('/ping', (req, res) => {
  res.json({ success: true });
});

app.post('/submit', (req, res) => {
  try {
    const { SubmissionName, Email, Phone, GitHubLink, StopwatchTime } = req.body;
    const newSubmission: Submission = {
      SubmissionName,
      Email,
      Phone,
      GitHubLink,
      StopwatchTime
    };
    const submissions = readSubmissions();
    submissions.push(newSubmission);
    writeSubmissions(submissions);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error in /submit endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/read', (req, res) => {
  try {
    const submissions = readSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Error in /read endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
