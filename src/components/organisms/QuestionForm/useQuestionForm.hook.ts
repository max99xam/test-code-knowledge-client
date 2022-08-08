
import { ValidationError } from 'yup';
import {
    useAddQuestionMutation,
    useEditQuestionMutation,
} from 'store/questions.api';
import { categoryName } from 'constants/names.storage';
import { useSessionStorage } from 'hooks';
import { Category, Question } from 'interfaces/questions.interface';
import React from 'react';
import { schema } from './question.schema';
import { QuestionFormProps } from './QuestionForm.props';

interface UserAnswer {
    answer: string;
    isChecked: boolean;
}

export const useQuestionForm = ({ questionItem, mode }: Pick<QuestionFormProps, 'mode' | 'questionItem'>) => {
    const [question, setQuestion] = React.useState<string>(questionItem.question);
    const [questionError, setQuestionError] = React.useState<string>('');
    // const [category, _] = useSessionStorage(categoryName, 'javascript');

    const [category, setCategory] = React.useState<Category>(Category.JavaScript);

    const [codeExample, setCodeExample] = React.useState<string>(
        questionItem.codeExample
    );
    const [isCodeExampleChecked, setIsCodeExampleChecked] = React.useState<boolean>(false);
    const [codeExampleError, setCodeExampleError] = React.useState<string>('');

    const initialAnswers = questionItem.answers.map((answer) => ({
        answer: answer.answer,
        isChecked: answer.isCorrect,
    }));
    const [answers, setAnswers] = React.useState<UserAnswer[]>(initialAnswers);
    const [answersErrors, setAnswersErrors] = React.useState<string[]>(
        new Array(questionItem.answers.length).fill('')
    );

    const handleSelectCategory = (e) => {
        setCategory(e.target.value as Category);
    }


    const handleAddAnswerButton = () => {
        const newAnswer: UserAnswer = {
            answer: '',
            isChecked: false,
        }

        setAnswers(answers => {
            // Deep copy.
            const newAnswers: UserAnswer[] = JSON.parse(
                JSON.stringify(answers)
            );
            newAnswers.push(newAnswer);

            return newAnswers;
        })
    }

    const handleDeleteAnswerButton = (index: number) => {
        setAnswers(answers => {
            // Deep copy.
            const newAnswers: UserAnswer[] = JSON.parse(
                JSON.stringify(answers)
            );
            return newAnswers.filter((_, i) => i !== index);
        })
    }

    const resetErrors = () => {
        setQuestionError('');
        setCodeExampleError('');
        setAnswersErrors(new Array(questionItem.answers.length).fill(''));
    };

    const isValidForm = async () => {
        resetErrors();
        let isValid = true;

        try {
            await schema.validate({
                question,
                codeExample,
                answers,
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                isValid = false;
                console.log(error.path);
                if (error.path == 'question') {
                    setQuestionError(error.errors[0]);
                } else if (error.path == 'codeExample') {
                    setCodeExampleError(error.errors[0]);
                } else if (error.path?.endsWith('.answer')) {
                    // ! TO DO: Refactore this block.
                    const errorIndex = Number(error.path.match(/\d/g)?.join(''));

                    if (errorIndex >= 0) {
                        setAnswersErrors((array) => {
                            const updatedArray = [...array];
                            updatedArray[errorIndex] = (error as ValidationError).errors[0];
                            return updatedArray;
                        });
                    }
                }
            }
        }

        return isValid;
    };

    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();

        const questionPayload = {
            question,
            category,
            codeExample,
            answers: answers.map((answer) => ({
                answer: answer.answer,
                isCorrect: answer.isChecked,
            })),
        } as Omit<Question, 'id'>;

        if (await isValidForm()) {
            console.log(questionPayload);
            switch (mode) {
                case 'add':
                    try {
                        // await addQuestion(questionPayload);

                        // setIsModalOpen(false);
                    } catch (error) {
                        console.log(error);
                    }

                    break;

                case 'edit':
                    try {
                        // await editQuestion({ id: questionItem.id, body: questionPayload });

                        // setIsModalOpen(false);
                    } catch (error) {
                        console.log(error);
                    }
                    break;
            }
        }
    };

    const handleResetButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // setName(item.name);
        // setDescription(item.description);
        // setCount(item.count);
        // setDestinationCount(item.destinationCount);
    };

    return {
        question,
        setQuestion,
        questionError,
        setQuestionError,
        category,
        setCategory,
        codeExample,
        setCodeExample,
        isCodeExampleChecked,
        setIsCodeExampleChecked,
        codeExampleError,
        setCodeExampleError,
        answers,
        setAnswers,
        answersErrors,
        setAnswersErrors,
        handleSelectCategory,
        handleAddAnswerButton,
        handleDeleteAnswerButton,
        resetErrors,
        handleSubmitForm,
        handleResetButton,
    }
};
