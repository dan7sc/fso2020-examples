import React from 'react';

export const courseParts: CoursePart[] = [
    {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is an awesome course part"
    },
    {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3
    },
    {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
];

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
    description: string;
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
    name: "Deeper type usage";
    description: string;
    exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
};

const CourseParts: React.FC<{courseParts: CoursePart[]}> = (props) => {
    return (
        <div>
            {props.courseParts.map(part => {
                switch(part.name) {
                    case "Fundamentals":
                        return <h2 key={part.name}>type one: {part.name} {part.exerciseCount}</h2>;
                    case "Using props to pass data":
                        return <h2 key={part.name}>type two: {part.name} {part.exerciseCount}</h2>;
                    case "Deeper type usage":
                        return <h2 key={part.name}>type three: {part.name} {part.exerciseCount}</h2>;
                    default:
                        return assertNever(part);
                }
            })
            }
        </div>
    )
};

export default CourseParts;
