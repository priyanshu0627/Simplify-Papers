import { Button, OutlinedInput } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AskQuestionCard from './AskQuestionCard';

import QuestionCard from './QuestionCard';
import { QuestionsData } from './QuestionsData';

function PDFSideBar({ onFileChange }: any) {
  // const [questionsData, setQuestionsData] = useState([]);
  const [questionToggle, setQuestionToggle] = useState(false);

  const handleAskQuestionButton = () => {
    setQuestionToggle(!questionToggle);
  };
  useEffect(() => {
    // set questions data from the api here
  }, []);

  return (
    <div className="m-4 flex h-screen flex-col justify-start rounded-lg bg-white p-1 text-black">
      {/* <section className='flex justify-center'>
        <div className='my-4 py-4 bg-white rounded-lg w-9/12'>
          <label className='m-1' htmlFor="file">Load from file:</label>{" "}
          <input className='m-1' onChange={onFileChange} type="file" />
        </div>
      </section> */}
      <section className="flex justify-around">
        <Button
          className="m-1 flex-auto bg-theme-green text-white"
          sx={{ background: '#45815a' }}
          size="large"
          variant="contained"
          onClick={handleAskQuestionButton}
        >
          {questionToggle ? 'Ask a Question' : 'All Questions'}
        </Button>
        <OutlinedInput
          className="m-1 flex-auto"
          placeholder="Search these discussion"
        />
      </section>
      {questionToggle ? (
        <section className="overflow-auto ">
          {QuestionsData?.map((questionData: any) => (
            <QuestionCard key={questionData.id} {...questionData} />
          ))}
        </section>
      ) : (
        <section>
          <AskQuestionCard />
        </section>
      )}
    </div>
  );
}

export default PDFSideBar;
