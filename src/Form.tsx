/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC, useState, createContext, FormEvent } from "react";
import  {PrimaryButton, gray5, gray6} from './Styles';

export interface Values{
    [key: string]: any;
}

type Validator = (value: any, args?: any) => string;

export const required: Validator = (value: any): string => 
    value === undefined || value === null || value === '' ? "This must be populated" : '';

export const minLength: Validator = (
    value: any,
    length: number,
    ): string => value && value.length < length ? `This must be at least ${length} characters` : '';

interface Validation{
    validator: Validator;
    arg?: any;
}

interface ValidatorProp{
    [key: string] : Validation | Validation[]
}

interface Errors {
    [key: string] : string[];
}

export interface Touched{
    [key: string]: boolean;
}

//Will do the actual submission
export interface SubmitResult{
    success: boolean;
    errors?:Errors
}

interface FormContextProps{
    values: Values;
    setValue?: (fieldName: string, value: any) => void;
    errors: Errors;
    validate? : (fieldName: string) => void;
    touched:Touched
    setTouched? : (fieldName: string) => void;
}

export const FormContext = createContext<FormContextProps>({
    values : {},
    errors: {},
    touched: {}
})


interface Props{
    submitCaption?: string;
    validationRules?: ValidatorProp
    onSubmit: (values: Values) => Promise<SubmitResult>;
    successMessage?: string;
    failMessage?: string
}

export const Form: FC<Props> = ({submitCaption, children, validationRules, onSubmit, successMessage = "Message", failMessage = "Something went wrong"}) => {

const [values, setValues] = useState<Values>({});
const [errors, setErrors] = useState<Errors>({});
const [touched, setTouched] = useState<Touched>({})
const [submitting, setSubmitting] = useState(false); //Indicates it's in submitting process
const [submitted, setSubmitted] = useState(false); //Indicates it's in submitted process
const [submitError, setSubmitError] = useState(false); //Indicates whether submission failed

const validate = (fieldName: string): string[] => {
    if(!validationRules)
    {
        return [];
    }
    if(!validationRules[fieldName])
    {
        return [];
    }
    const rules = Array.isArray(validationRules[fieldName])
    ? (validationRules[fieldName] as Validation[]) :
    ([validationRules[fieldName]] as Validation[])

    const fieldErrors: string[] = [];
    rules.forEach(rule => {
        const error = rule.validator(values[fieldName], rule.arg);
        if(error)
        {
            fieldErrors.push(error);
        }       
    });

    const newErrors = {...errors, [fieldName]: fieldErrors};
    setErrors(newErrors);
    return fieldErrors;
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(validateForm()){
        // TODO - set state to indicate submission is in progress
        setSubmitting(true);
        setSubmitError(false);
        // TODO - call the consumer submit function
        const result = await onSubmit(values);
        // TODO - set any errors in state
        setErrors(result.errors || {})
        setSubmitError(false);
        setSubmitted(true);
        // TODO - set state to indicate submission has finished
    }
}

//Iterate through each field invoking error rule and updating error stae
const validateForm = () => {
    const newErrors: Errors = {};
    let haveError: boolean = false;
    if(validationRules){
        Object.keys(validationRules).forEach(fieldName => {
            newErrors[fieldName] = validate(fieldName);
            if(newErrors[fieldName].length > 0)
            {
                haveError = true;
            }
        });
    }
        setErrors(newErrors);
        return!haveError;
}
return (
    <FormContext.Provider
    value ={{values, setValue: (fieldName: string, value: any) => {
        setValues({...values, [fieldName]: value});
    },
    errors,
    validate,
    touched,
    setTouched: (fieldName: string) => {
        setTouched({...touched, [fieldName]: true})
    }
    }}
    >
    <form noValidate={true} onSubmit={handleSubmit}>
        <fieldset
            disabled={submitting || (submitted && !submitError)}
            css={css`
                margin: 10px auto 0 auto;
                padding: 30px;
                width: 350px;
                background-color: ${gray6};
                border-radius: 4px;
                border: 1px solid ${gray5};
                box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16)
            `}
        >
        {children}
        <div
            css={css`
                margin: 30px 0px 0px 0px;
                padding: 20px 0px 0px 0px;
                border-top: 1px solid ${gray5}
            `}
        >
        <PrimaryButton type="submit">
            {submitCaption}
        </PrimaryButton>
        </div>
        {submitted && submitError && (
            <p css={css`color: red`}>
            {failMessage}
            </p>
        )}
            {submitted && !submitError && (
                <p css={css`color: green`}>
                {successMessage}
                </p>
            )}
        </fieldset>
    </form>
    </FormContext.Provider>
)};