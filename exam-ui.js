// Function to render questions
function renderQuestions(selectedExamQuestions) {
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';

    selectedExamQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <div class="question-header">
                <div class="question-number">Question ${index + 1}</div>
                <div class="question-domain">${question.domain}</div>
            </div>
            <div class="question-text">${question.question}</div>
            <div class="options">
                ${question.options.map((option, optIndex) => `
                    <div class="option">
                        <input type="radio" id="q${question.id}_${optIndex}" name="question_${question.id}" value="${optIndex}">
                        <label for="q${question.id}_${optIndex}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

// Function to update progress bar
function updateProgressBar(selectedExamQuestions) {
    const progressBar = document.getElementById('progressBar');
    const answeredQuestions = selectedExamQuestions.filter(question => 
        document.querySelector(`input[name="question_${question.id}"]:checked`)
    );
    const progress = (answeredQuestions.length / selectedExamQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to update exam info display
function updateExamInfo(examConfig) {
    const infoCards = document.querySelectorAll('.info-card .info-value');
    if (infoCards.length >= 4) {
        infoCards[0].textContent = examConfig.totalQuestions; // Questions
        infoCards[1].textContent = examConfig.examDurationMinutes; // Minutes
        infoCards[2].textContent = `${Math.ceil(examConfig.totalQuestions * (examConfig.passScorePercentage / 100))}/${examConfig.totalQuestions}`; // Pass Score
        infoCards[3].textContent = 'Multiple Choice'; // Format
    }
    // Set the pass score label dynamically
    const passScoreLabel = document.getElementById('passScoreLabel');
    if (passScoreLabel) {
        passScoreLabel.textContent = `Pass Score (${examConfig.passScorePercentage}%)`;
    }
}

// Function to update timer display
function updateTimerDisplay(timerElement, seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
} 