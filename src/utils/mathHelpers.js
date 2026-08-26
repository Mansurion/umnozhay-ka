export const generateFullTableTasks = () => {
    const tasks = [];
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            tasks.push({
                id: `${i}-${j}`,
                num1: i,
                num2: j,
                correctAnswer: i * j,
            });
        }
    }
    return tasks;
};

export const generateOptions = (correctAnswer) => {
    const optionsSet = new Set();
    optionsSet.add(correctAnswer);

    while (optionsSet.size < 4) {
        const step = Math.floor(Math.random() * 10) + 1;
        const isPositive = Math.random() > 0.5;

        const fakeAnswer = isPositive ? correctAnswer + step : correctAnswer - step;

        if (fakeAnswer > 0) {
            optionsSet.add(fakeAnswer);
        }
    }

    return Array.from(optionsSet);
};
