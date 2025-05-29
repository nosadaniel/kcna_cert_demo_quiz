# KCNA Practice Exam App

A modern, customizable web app for practicing Kubernetes and Cloud Native Associate (KCNA) exam questions. The app randomly selects questions from a question bank based on configurable domain distributions, exam duration, and pass score percentage.

## Features
- **Randomized Exam:** Selects a set number of questions from each domain according to configurable percentages.
- **Dynamic Timer:** Exam duration is automatically set to 60 seconds per question based on the number of questions selected.
- **Configurable Pass Score:** Pass threshold is set via configuration.
- **Beautiful UI:** Responsive, modern design with live progress bar and timer.
- **Instant Results:** See your score, domain breakdown, and time used immediately after submission.
- **Incorrect/Unanswered Review:** After submission, see a review of all questions you got wrong or left unanswered, with correct answers and explanations.
- **Data Source Reference:** All questions are sourced from a public spreadsheet (see below).
- **Open Source:** View and contribute to the code on GitHub.

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/nosadaniel/kcna_cert_demo_quiz.git
   cd kcna_cert_demo_quiz
   ```
2. **Open `index.html` in your browser.**
   - No build step or server required; it's a static HTML/JS/CSS app.

## Configuration
All exam settings are controlled via the `EXAM_CONFIG` variable in `exam-config.js`:
```js
window.EXAM_CONFIG = {
    totalQuestions: 40,                // Initial total number of questions per exam (overridden at runtime)
    examDurationMinutes: 40,           // Initial exam duration in minutes (overridden at runtime)
    passScorePercentage: 80,           // Pass score percentage (e.g., 80 for 80%)
    distribution: {
        'Kubernetes Fundamentals': 46,
        'Kubernetes Architecture': 19,
        'Cloud Native Observability': 11,
        'Cloud Native Application Delivery': 9,
        'Cloud Native Infrastructure': 15
    }
};
```
- **The actual number of questions and exam duration are set dynamically at runtime** based on the available questions in each domain and the distribution. The timer is set to 60 seconds per question.
- **To adjust domain distribution,** update the `distribution` object (percentages should sum to 100).
- **To change the pass score,** edit `passScorePercentage`.

## Data Source
All questions are loaded from the `exam-questions.js` file, which is sourced from the public KCNA question dump:
- [KCNA Exam Question Dump (Google Sheets)](https://docs.google.com/spreadsheets/d/1HsBaU3A6Md8IfRMWyt2vU_nInjMIsDsZtpg8eRxqdRg/edit?gid=0#gid=0)

## Contributing
Contributions are welcome! To contribute:
1. **Fork the repository** and create a new branch for your feature or fix.
2. **Make your changes** (e.g., add questions, improve UI, fix bugs).
3. **Submit a pull request** with a clear description of your changes.

### Adding/Editing Questions
- Edit the `window.examQuestions` array in `exam-questions.js`.
- Follow the existing format for each question object.

### Issues
If you find a bug or have a feature request, please [open an issue](https://github.com/nosadaniel/kcna_cert_demo_quiz/issues).

## License
MIT

---

**View Source Code:** [https://github.com/nosadaniel/kcna_cert_demo_quiz](https://github.com/nosadaniel/kcna_cert_demo_quiz)

**Data Source:** [KCNA Exam Question Dump](https://docs.google.com/spreadsheets/d/1HsBaU3A6Md8IfRMWyt2vU_nInjMIsDsZtpg8eRxqdRg/edit?gid=0#gid=0) 