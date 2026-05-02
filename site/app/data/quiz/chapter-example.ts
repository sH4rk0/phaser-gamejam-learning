// site/data/quiz/chapter-1.ts
export interface QuizQuestion {
    question: string
    options: { answer: string; correct: boolean }[]
}

export const quiz1: { it: QuizQuestion[]; en: QuizQuestion[] } = {

    it: [
        {
            question: 'Domanda 1',
            options: [
                { answer:'Risposta 0', correct: false },
                { answer:'Risposta 1', correct: true },
                { answer:'Risposta 2', correct: false },
                { answer:'Risposta 3', correct: false },
            ],
        },{
            question: 'Domanda 2',
            options: [
                { answer:'Risposta 0', correct: false },
                { answer:'Risposta 1', correct: true },
                { answer:'Risposta 2', correct: false },
                { answer:'Risposta 3', correct: false },
            ],
        }
    ],
    en: [
        {
            question: 'Question 1', 
            options: [
                { answer:'Answer 0', correct: false },
                { answer:'Answer 1', correct: true },
                { answer:'Answer 2', correct: false },
                { answer:'Answer 3', correct: false },
            ],
        },{
            question: 'Question 2', 
            options: [
                { answer:'Answer 0', correct: false },
                { answer:'Answer 1', correct: true },
                { answer:'Answer 2', correct: false },
                { answer:'Answer 3', correct: false },
            ],
        }
    ]
}
