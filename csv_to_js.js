const fs = require('fs');
const { parse } = require('csv-parse/sync');

// Read the CSV file
const csv = fs.readFileSync('KCNA Exam Question Dump - KCNA Question Dump.csv', 'utf8');

// Parse CSV to array of objects
const records = parse(csv, { columns: true, skip_empty_lines: true });

// Helper: Convert letter (A/B/C/...) to 0-based index
const letterToIndex = letter => {
  if (!letter) return null;
  return letter.trim().toUpperCase().charCodeAt(0) - 65; // 'A' = 0, 'B' = 1, etc.
};

// Map each CSV row to the desired JSON structure
const questions = records.map(row => {
  // Collect options (skip empty ones)
  const options = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E']
    .map(k => row[k])
    .filter(opt => opt && opt.trim() !== '');

  return {
    id: Number(row['#']),
    domain: row['Domain'],
    competency: row['Competency'],
    question: row['Question'],
    options,
    correct: letterToIndex(row['Correct Answer']),
    correctLetter: row['Correct Answer'] ? row['Correct Answer'].trim().toUpperCase() : null,
    explanation: row['Explanation']
  };
});

// Write to JS file with window.examQuestions assignment
const jsContent = 'window.examQuestions = ' + JSON.stringify(questions, null, 2) + ';\n';
fs.writeFileSync('kcna_questions_answers.js', jsContent);

console.log('Conversion complete! Output written to kcna_questions_answers.js'); 