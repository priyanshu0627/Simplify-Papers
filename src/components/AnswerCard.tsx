/* eslint-disable no-console */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ShareIcon from '@mui/icons-material/Share';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { AnswerDataState } from '@/redux/features/answerDataSlice';

function AnswerCard(props: any) {
  const { handleUpVote, handleDownVote, upVote, downVote, currQuestionId } =
    props;
  const [ansArray, setAnsArray] = React.useState([]);

  const allAnswer = useSelector((state: any) => state.answerDataSlice);

  useEffect(() => {
    const currAnswerData = allAnswer.filter(
      (element: AnswerDataState) => element.questionId === currQuestionId
    );
    if (currAnswerData.length) {
      setAnsArray(currAnswerData[0].allAnswer);
    }
    console.log(currAnswerData.allAnswer);
    // currQuestionData.length > 0 && setAnsArray(currQuestionData.)
    // return () => {
    //   second
    // }
  }, [allAnswer]);

  return (
    <div>
      <div>{ansArray.length} Answers</div>
      {ansArray?.map((test: any, index: number) => (
        <div
          className="my-2 flex flex-row rounded-lg border-2 border-solid border-theme-green bg-theme-lightGreen py-2"
          key={index}
        >
          <div className="mr-3 flex w-[15%] flex-col justify-start">
            <div className="flex items-center	justify-around">
              <ArrowDropUpIcon
                fontSize="large"
                className="text-theme-green"
                onClick={handleUpVote}
              />
              <div className="text-xs text-gray-700">{upVote}</div>
            </div>
            <div className="flex items-center	justify-around	">
              <ArrowDropDownIcon
                fontSize="large"
                className="text-theme-green"
                onClick={handleDownVote}
              />
              <div className="text-xs text-gray-700">{downVote}</div>
            </div>
            <div className="ml-2 flex	items-center justify-start">
              <ShareIcon className="text-theme-green" />
            </div>
          </div>
          {/* {ansArray?.map((test: any, index: number) => ( */}
          <div className="flex w-[85%] flex-col" key={index}>
            <div className="text-lg">{test.heading}</div>
            <div className="text-xs text-gray-700">{test.answer}</div>
          </div>
          {/* ))} */}
        </div>
      ))}
    </div>
  );
}

export default AnswerCard;
