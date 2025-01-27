import { Question } from "./utility";

document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.querySelector('#start-btn') as HTMLButtonElement;
  const nextBtn = document.querySelector('#next-btn') as HTMLButtonElement;
  const restartBtn = document.querySelector('#restart-btn') as HTMLButtonElement;
  const questionText = document.querySelector('#question-text') as HTMLHeadingElement;
  const choicesList = document.querySelector('#choices-list') as HTMLUListElement;
  const scoreText = document.querySelector('#score') as HTMLParagraphElement;
  const questionContainer = document.querySelector('.question-container') as HTMLDivElement;
  const resultContainer = document.querySelector('.result-container') as HTMLDivElement;

  const questions: Question[] = [
    {
      question: 'What is the capital of Andhra Pradesh',
      choices: ['Amaravati', 'Visakhapatnam', 'Kurnool', 'Hyderabad'],
      answer: 'Amaravati',
    },
    {
      question: "Who wrote hamlet 'Hamlet'",
      choices: ['Jane Austin', 'William Shakespeare', 'Mark Twain', 'Charles Darwin'],
      answer: 'William Shakespeare',
    },
    {
      question: "Who is known as 'Vikatakavi'",
      choices: ['Allasani Peddana', 'Nandi Thimmana', 'Tenali Ramakrishna', 'Pingali'],
      answer: 'Tenali Ramakrishna',
    },
  ];

  let currentQuestionIndex = 0;
  let score: Boolean[] = [];

  startBtn?.addEventListener('click', startQuiz);
  restartBtn?.addEventListener('click', startQuiz);

  nextBtn?.addEventListener('click', function () {
    if (questions.length-1 > currentQuestionIndex) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      showResults();
    }
    nextBtn?.classList.add('hidden');
  })


  function startQuiz() {
    questionContainer?.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    startBtn?.classList.add('hidden');
    currentQuestionIndex = 0
    score.length = 0;
    showQuestion();
  }

  function showQuestion() {
    const { question, choices } = questions[currentQuestionIndex];
    questionText.textContent = question;
    choicesList.innerHTML = ''; // clear
    choices.forEach(choice => {
      const listEle = document.createElement('li');
      listEle.classList.add('bg-gray-500', 'mx-3', 'p-2', 'hover:bg-violet-600', 'mb-1');
      listEle.textContent = choice;
      listEle.addEventListener('click', () => selectAnswer(choice, listEle));
      choicesList.appendChild(listEle);
    });
  }

  function showResults() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    let qScore = score.filter(val => val).length
    scoreText.innerText = `${qScore} out of ${questions.length}`
  }

  function selectAnswer(choice: string, listEle: HTMLLIElement) {
    resetColors();
    const currentAnswer = questions[currentQuestionIndex].answer;
    listEle.classList.remove('bg-gray-500');
    listEle.classList.add('bg-violet-700');

    if (currentAnswer === choice) score[currentQuestionIndex] = true;
    else score[currentQuestionIndex] = false;

    if (currentQuestionIndex === questions.length - 1) nextBtn.innerText = 'Finish';

    nextBtn?.classList.remove('hidden');
  }

  function resetColors() {
    const listElements = document.querySelectorAll('li');
    listElements.forEach(liEle => {
      if (liEle.classList.contains('bg-violet-700')) {
        liEle.classList.add('bg-gray-500');
        liEle.classList.remove('bg-violet-700');
      }
    })
  }

});