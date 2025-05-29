// Function to calculate domain statistics
function calculateDomainStats(answeredQuestions, selectedExamQuestions) {
    const stats = {};
    
    selectedExamQuestions.forEach(question => {
        if (!stats[question.domain]) {
            stats[question.domain] = { correct: 0, total: 0 };
        }
        stats[question.domain].total++;
        
        const answer = answeredQuestions.find(a => a.questionId === question.id);
        if (answer && answer.selectedAnswer === (question.correct - 1)) {
            stats[question.domain].correct++;
        }
    });
    
    return stats;
}

// Function to get answered questions
function getAnsweredQuestions(selectedExamQuestions) {
    const answered = [];
    selectedExamQuestions.forEach(question => {
        const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
        if (selected) {
            answered.push({
                questionId: question.id,
                selectedAnswer: parseInt(selected.value),
                correct: question.correct
            });
        }
    });
    return answered;
}

// Function to submit exam and show results
function submitExam(selectedExamQuestions, examConfig, timeRemaining) {
    clearInterval(timerInterval);
    const answeredQuestions = getAnsweredQuestions(selectedExamQuestions);
    const correctAnswers = answeredQuestions.filter(q => q.selectedAnswer === (q.correct - 1)).length;
    const totalQuestions = selectedExamQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = percentage >= examConfig.passScorePercentage;

    // Hide exam form and show results
    document.getElementById('examForm').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    // Update score display
    const scoreCircle = document.getElementById('scoreCircle');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultTitle = document.getElementById('resultTitle');

    scorePercentage.textContent = `${percentage}%`;
    scoreCircle.className = `score-circle ${passed ? 'pass' : 'fail'}`;
    resultTitle.textContent = passed ? 'Congratulations! You Passed!' : 'Keep Studying!';

    // Calculate time used
    const totalTimeSeconds = examConfig.examDurationMinutes * 60;
    const timeUsedSeconds = totalTimeSeconds - timeRemaining;
    const minutesUsed = Math.floor(timeUsedSeconds / 60);
    const secondsUsed = timeUsedSeconds % 60;

    // Generate result details
    const resultDetails = document.getElementById('resultDetails');
    const domainStats = calculateDomainStats(answeredQuestions, selectedExamQuestions);
    
    // Get incorrect and unanswered questions
    const incorrectOrUnansweredQuestions = selectedExamQuestions.filter(q => {
        const answer = answeredQuestions.find(a => a.questionId === q.id);
        // Unanswered or answered incorrectly
        return !answer || answer.selectedAnswer !== (q.correct - 1);
    }).map(q => {
        const answer = answeredQuestions.find(a => a.questionId === q.id);
        return {
            ...q,
            selectedAnswer: answer ? answer.selectedAnswer : null,
            wasAnswered: !!answer
        };
    });
    
    resultDetails.innerHTML = `
        <div class="result-card">
            <h3>Overall Score</h3>
            <p><strong>${correctAnswers}/${totalQuestions}</strong> questions correct</p>
            <p><strong>${percentage}%</strong> (Pass: ${examConfig.passScorePercentage}%)</p>
        </div>
        <div class="result-card">
            <h3>Time Used</h3>
            <p><strong>${minutesUsed}</strong> minutes</p>
            <p><strong>${secondsUsed}</strong> seconds</p>
        </div>
        ${Object.entries(domainStats).map(([domain, stats]) => `
            <div class="result-card">
                <h3>${domain}</h3>
                <p><strong>${stats.correct}/${stats.total}</strong> correct</p>
                <p><strong>${Math.round((stats.correct / stats.total) * 100)}%</strong></p>
            </div>
        `).join('')}
        ${incorrectOrUnansweredQuestions.length > 0 ? `
            <div class="result-card" style="grid-column: 1 / -1;">
                <h3>Incorrect & Unanswered Questions Review</h3>
                ${incorrectOrUnansweredQuestions.map(q => `
                    <div class="incorrect-question" style="margin-bottom: 20px; padding: 15px; background: #fff3f3; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">${q.question}</p>
                        <p style="color: #dc3545; margin-bottom: 5px;">
                            Your answer: ${q.wasAnswered ? q.options[q.selectedAnswer] : '<em>Not answered</em>'}
                        </p>
                        <p style="color: #28a745; margin-bottom: 5px;">Correct answer: ${q.options[q.correct - 1]}</p>
                        <p style="color: #666; font-style: italic;">${q.explanation}</p>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
} 