import React from "react";
import { Page } from "./Page";
import {Form, required, minLength, Values} from './Form';
import { postQuestion } from "./QuestionsData";
import {Field} from './Field';
export const AskPage = () => 
{
    const handleSubmit = async (values: Values) => {
        const question = await postQuestion({
            title: values.title,
            content: values.content,
            userName:"Fred",
            created: new Date()
        });

        return {success: question ? true : false}
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
            failMessage = "There was a problem with your question"
            successMessage = "Your question was successfully submitted"
        >
           
            <Field name="title" label="Title"/>
            <Field name="content" label="Content" type="TextArea"/>
        </Form>
    </Page>
    )   
}
export default AskPage;