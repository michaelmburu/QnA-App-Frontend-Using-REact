import { Page } from "./Page";
import React, {FC, useEffect} from "react";
import {Form, required, minLength, Values, SubmitResult} from './Form';
import { PostQuestionData, QuestionData } from "./QuestionsData";
import {Field} from './Field';
import {connect} from 'react-redux';
import {AppState, postQuestionActionCreator, clearPostedQuestionActionCreator} from './Store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
interface Props{
    postQuestion:(
        question: PostQuestionData,
    ) => Promise<void>;
    postedQuestionResult?: QuestionData;
    clearPostedQuestion: () => void;
}
export const AskPage:FC<Props> = ({postQuestion, postedQuestionResult, clearPostedQuestion}) => 
{
    useEffect(() => {
        return function cleanUp(){
            clearPostedQuestion();
        };
    }, [clearPostedQuestion])

    const handleSubmit = async (values: Values) => {
        postQuestion({
            title: values.title,
            content: values.content,
            userName: "Fred",
            created: new Date()
        });
    };

    let submitResult: SubmitResult | undefined;
    if(postedQuestionResult)
    {
        submitResult = {success: postedQuestionResult !== undefined}
    }
    return(
        <Page title="Ask A Question">
        <Form submitCaption="Submit Your Question"
         validationRules={{
            title: [
                {validator: required},
                {validator: minLength, arg:10}
            ],
            content:[
                {validator: required},
                {validator: minLength, arg:10}
            ]
        }}
            onSubmit={handleSubmit}
            submitResult= {submitResult}
            failMessage = "There was a problem with your question"
            successMessage = "Your question was successfully submitted"
        >   
            <Field name="title" label="Title"/>
            <Field name="content" label="Content" type="TextArea"/>
        </Form>
    </Page>
    )   
}
const mapStateToProps = (store: AppState) => {
    return {
    postedQuestionResult: store.questions.postedResult,
    };
    };
    const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AnyAction>,
    ) => {
    return {
    postQuestion: (question: PostQuestionData) =>
    dispatch(postQuestionActionCreator(question)),
    clearPostedQuestion: () =>
    dispatch(clearPostedQuestionActionCreator()),
    };
    };
    export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(AskPage);