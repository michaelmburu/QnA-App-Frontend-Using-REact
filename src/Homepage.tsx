/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react';
import { useEffect, useState } from 'react';
import { getUnansweredQuestions, QuestionData } from './QuestionsData';
import { PrimaryButton } from './Styles';
import {QuestionList} from './QuestionList';
import {PageTitle} from './PageTitle';
import {Page} from './Page';
export const HomePage = () => { 

    const [questions, setQuestions] = useState<QuestionData[] | null>(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);

    useEffect(() => {
        const doGetUnansweredQuestions = async () => {
            const unAnsweredQuestions  = await getUnansweredQuestions();
            setQuestions(unAnsweredQuestions);
            setQuestionsLoading(false);
        };
        doGetUnansweredQuestions();
    });

    const handleAskQuestionClick = () => {
        console.log("TODO: Move the ask page")
    }

    return(
        <Page>
        <div
            css={css`
                margin:50px auto 20px auto;
                padding: 30px 20px;
                max-width: 600px;
            `}
        >
            <div
                css={css`
                    display: flex;
                    align-items:center;
                    justify-content:space-between
                `}

            >
                <PageTitle>Unanswered Questions</PageTitle>
                <PrimaryButton onClick={handleAskQuestionClick}>Ask a question</PrimaryButton>
            </div>      
        </div>
        {questionsLoading ? (
            <div
                css={css`
                    font-size: 15px;
                    font-style: italic;
                `}
            >
            Loading.....
            </div>) : ( <QuestionList data={questions || []} />)}
        </Page>
)};