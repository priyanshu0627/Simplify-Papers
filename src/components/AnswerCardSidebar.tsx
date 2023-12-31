import { RemoveRedEye } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { Avatar, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { addNewAnswer } from '@/redux/features/answerDataSlice';
import { useAppDispatch } from '@/redux/hooks';
import type { QuestionsDataType } from '@/Types/Types';
import { GlobalLabels } from '@/utils/globalLabels';

import AnswerCard from './AnswerCard';

const data: any = {
  id: 1,
  upVotes: 4,
  downVotes: 2,
  liked: 3,
  accepted: true,
  flag: 5,
  views: 30,
  question: 'How did you do this ?',
  askedBy: 'mr-easy',
  lastActivityTime: '5 mins',
  lastActivityPerson: 'Rishab',
  tags: ['React', 'next'],
};

function AnswerCardSidebar({ currQuestionId }: any) {
  const [question, setQuestion] = useState(null);
  const [comment, setComment] = useState(null);
  const [bookmark, setBookmark] = useState(false);
  const [upVote, setUpVote] = useState(data.upVotes);
  const [downVote, setDownVote] = useState(data.downVotes);
  const [like, hitLike] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [userAnswerHeading, setUserAnswerHeading] = useState('');
  const [flag, setFlag] = useState(data.flag);
  const dispatch = useAppDispatch();

  const allQuestions = useSelector((state: any) => state.questionDataSlice);

  const handleShareProject = () => {
    setBookmark(!bookmark);
  };

  const handleUpVote = () => {
    setUpVote(upVote + 1);
  };

  const handleDownVote = () => {
    if (downVote - 1 >= 1) {
      setDownVote(downVote - 1);
    }
  };

  const handleFlag = () => {
    // setFlag(flag + 1);
  };

  const handleLikeButton = () => {
    hitLike(!like);
  };

  const handleCheckAnswer = () => {};

  const handleUserAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value as string);
  };

  const handleUserAnswerHeading = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserAnswerHeading(event.target.value as string);
  };

  const validateAnswer = () => {
    return 1;
  };

  const handleSubmitAns = () => {
    if (validateAnswer()) {
      dispatch(
        addNewAnswer({
          questionId: currQuestionId,
          newAnswer: {
            heading: userAnswerHeading,
            answer: userAnswer,
          },
        })
      );
    }
    setUserAnswerHeading('');
    setUserAnswer('');
    // hitLike(!like);
  };

  useEffect(() => {
    setUserAnswer('');
    setFlag(data.flag);
    const currQuestionData = allQuestions.filter(
      (element: QuestionsDataType) =>
        element.highlight.rangeId === currQuestionId
    );
    if (currQuestionData.length > 0) {
      setQuestion(currQuestionData[0].question);
      setComment(currQuestionData[0].comment);
    }
  }, []);

  return (
    <div className="flex flex-col p-3">
      <section className="border-b-2 border-solid border-theme-green">
        Summary Of the Thing
      </section>

      <section className="my-4 flex flex-row justify-between border-b-2 border-solid border-theme-green pb-4">
        <div className="flex w-[88%] flex-col">
          <div className="my-1 text-lg">{question}</div>
          <div className="text-xs text-gray-700">{comment}</div>
        </div>
        <div className="ml-3 flex	w-[12%] flex-col justify-start">
          <div className="flex items-center	justify-between">
            <div className="text-xs text-gray-700">{upVote}</div>
            <ArrowDropUpIcon
              fontSize="large"
              className="text-theme-green"
              onClick={handleUpVote}
            />
          </div>
          <div className="flex items-center	justify-between">
            <div className="text-xs text-gray-700">{data.liked}</div>
            {like ? (
              <FavoriteBorderIcon
                fontSize="medium"
                className="mr-1 text-theme-green"
                onClick={handleLikeButton}
              />
            ) : (
              <FavoriteIcon
                fontSize="medium"
                className="mr-1 text-theme-green"
                onClick={handleLikeButton}
              />
            )}
          </div>
          <div className="flex items-center	justify-between">
            <div className="text-xs text-gray-700">{downVote}</div>
            <ArrowDropDownIcon
              fontSize="large"
              className="text-theme-green"
              onClick={handleDownVote}
            />
          </div>
          <div className="flex items-center	justify-between">
            <div className="text-xs text-gray-700">{flag}</div>
            {flag ? (
              <SpellcheckIcon
                className="text-theme-green"
                onClick={handleFlag}
              />
            ) : (
              <CheckBoxOutlineBlankIcon
                className="text-theme-green"
                onClick={handleCheckAnswer}
              />
            )}
          </div>
          <div className="flex items-center	justify-between">
            <div className="text-xs text-gray-700">{data.views}</div>
            <RemoveRedEye fontSize="small" className="text-theme-green" />
          </div>
          <div
            className="flex items-center	justify-end	"
            onClick={handleShareProject}
          >
            <ShareIcon className="text-theme-green" />
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between border-b-2 border-solid border-theme-green pb-4 text-sm">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-between">
            <div>
              {data.tags?.map((tag: string, index: number) => (
                <Button
                  key={index}
                  size="small"
                  variant="contained"
                  sx={{ background: '#45815a!important', fontSize: '8px' }}
                  className="m-1"
                >
                  {tag}
                </Button>
              ))}
            </div>
            <div className="m-1 text-xs text-gray-700">
              last activity: {data.lastActivityTime} ago by
              <Button
                size="small"
                variant="contained"
                sx={{ background: '#45815a!important', fontSize: '8px' }}
                className="m-1"
              >
                {data.lastActivityPerson}
              </Button>
            </div>
          </div>
          <div className="flex flex-col rounded-xl border-2 border-solid border-theme-green bg-theme-lightGreen p-1 text-gray-700">
            <div className="flex flex-row items-center justify-between">
              <div className="text-[11px]">asked by</div>
              <Button
                size="small"
                variant="contained"
                sx={{ background: '#45815a!important', fontSize: '8px' }}
                className="m-1"
              >
                {data.askedBy}
              </Button>
            </div>
            <div className="flex flex-row">
              <Avatar />
              <div className="flex flex-col justify-center">
                <div className="text-[11px]">30k points</div>
                <div className="text-[11px]">20 Sept 2022</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-4 flex flex-col justify-between border-b-2 border-solid border-theme-green pb-4 text-sm">
        <TextField
          className="my-2"
          required
          id="answerHeading"
          label="Answer Heading"
          maxRows={4}
          placeholder={GlobalLabels.typeYourAnsHeading}
          value={userAnswerHeading}
          onChange={handleUserAnswerHeading}
          sx={{ width: '100%' }}
          variant="filled"
          color="success"
          focused
        />
        <TextField
          className="my-2"
          required
          id="answer"
          label="Answer"
          maxRows={10}
          placeholder={GlobalLabels.typeYourAnsLabel}
          value={userAnswer}
          onChange={handleUserAnswer}
          sx={{ width: '100%' }}
          variant="filled"
          color="success"
          focused
        />
        <Button onClick={handleSubmitAns} variant="outlined" className="mt-2">
          Submit
        </Button>
      </section>

      <section className="my-4 flex flex-col justify-between pb-4 text-sm">
        <AnswerCard
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
          upVote={upVote}
          downVote={downVote}
          currQuestionId={currQuestionId}
        />
      </section>
    </div>
  );
}

export default AnswerCardSidebar;
