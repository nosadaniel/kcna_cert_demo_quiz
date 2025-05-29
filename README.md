# KCNA Practice Exam App

A modern, customizable web app for practicing Kubernetes and Cloud Native Associate (KCNA) exam questions. The app randomly selects questions from a question bank based on configurable domain distributions, exam duration, and pass score percentage.

## Features
- **Randomized Exam:** Selects a set number of questions from each domain according to configurable percentages.
- **Dynamic Timer:** Exam duration is configurable.
- **Configurable Pass Score:** Pass threshold is set via configuration.
- **Beautiful UI:** Responsive, modern design with live progress bar and timer.
- **Instant Results:** See your score, domain breakdown, and time used immediately after submission.
- **Data Source Reference:** All questions are sourced from a public spreadsheet (see below).
- **Open Source:** View and contribute to the code on GitHub.

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/nosadaniel/kcna_cert_demo_quiz.git
   cd kcna_cert_demo_quiz
   ```
2. **Open `practice.html` in your browser.**
   - No build step or server required; it's a static HTML/JS/CSS app.

## Configuration
All exam settings are controlled via the `EXAM_CONFIG` variable in `practice.html`:
```js
const EXAM_CONFIG = {
    totalQuestions: 40,                // Total number of questions per exam
    examDurationMinutes: 40,           // Exam duration in minutes
    passScorePercentage: 90,           // Pass score percentage (e.g., 90 for 90%)
    distribution: {                    // Domain distribution (percentages must sum to 100)
        'Kubernetes Fundamentals': 46,
        'Kubernetes Architecture': 19,
        'Cloud Native Observability': 11,
        'Cloud Native Application Delivery': 9,
        'Cloud Native Infrastructure': 15
    }
};
```
- **To change the number of questions, duration, or pass score,** just edit the values in `EXAM_CONFIG`.
- **To adjust domain distribution,** update the `distribution` object (percentages should sum to 100).

## Data Source
All questions are sourced from the public KCNA question dump:
- [KCNA Exam Question Dump (Google Sheets)](https://docs.google.com/spreadsheets/d/1HsBaU3A6Md8IfRMWyt2vU_nInjMIsDsZtpg8eRxqdRg/edit?gid=0#gid=0)

## Contributing
Contributions are welcome! To contribute:
1. **Fork the repository** and create a new branch for your feature or fix.
2. **Make your changes** (e.g., add questions, improve UI, fix bugs).
3. **Submit a pull request** with a clear description of your changes.

### Adding/Editing Questions
- Edit the `examQuestions` array in `practice.html`.
- Follow the existing format for each question object.

### Issues
If you find a bug or have a feature request, please [open an issue](https://github.com/nosadaniel/kcna_cert_demo_quiz/issues).

## License
MIT

---

**View Source Code:** [https://github.com/nosadaniel/kcna_cert_demo_quiz](https://github.com/nosadaniel/kcna_cert_demo_quiz)

**Data Source:** [KCNA Exam Question Dump](https://docs.google.com/spreadsheets/d/1HsBaU3A6Md8IfRMWyt2vU_nInjMIsDsZtpg8eRxqdRg/edit?gid=0#gid=0) 