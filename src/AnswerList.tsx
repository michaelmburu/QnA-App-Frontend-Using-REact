/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from "react";
import {AnswerData} from './AnswerData';
import { css, jsx } from "@emotion/react";
import {gray5} from  './Styles';
import {Answer} from './Answer';
interface Props{
    data: AnswerData[]
}
export const AnswerList: FC<Props> = ({ data }) => (
    <ul  css={css`
            list-style: none;
            margin: 10px 0 0 0;
            padding: 0;
        `}
    >
        {data.map(answer => (
            <li
                css={`
                    border-top: 1px solid ${gray5}
                `}
                key={answer.answerId}
            >
                <Answer data={answer} />
            </li>
        ))}
    </ul>
)