/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { Button, OutlinedInput } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// import { addNewQuestion } from '@/redux/features/questionDataSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { reDrawHighlight } from '@/utils/HighlightService';

import type { QuestionsDataType } from '../Types/Types';
import AnswerCardSidebar from './AnswerCardSidebar';
import AskQuestionCard from './AskQuestionCard';
import QuestionCard from './QuestionCard';
// import { QuestionsData } from './QuestionsData';

const SidebarSection = {
  allQuestions: 'allQuestions',
  askQuestion: 'askQuestion',
  seeAnswer: 'seeAnswer',
};

function PDFSideBar({ onFileChange, pageNumber }: any) {
  const [sidebarSection, setSidebarSection] = useState(
    SidebarSection.allQuestions
  );
  const allQuestions = useSelector((state: any) => state.questionDataSlice);
  const rangeStatus = useAppSelector((state) => state.StatusHighlight);
  const questionComponentRef = useRef(null);

  const handleAskQuestionButton = () => {
    // if sidebarSection state is not allQuestions then set it to all question otherwise if it is allQuestions then set it ask question
    if (sidebarSection === SidebarSection.allQuestions) {
      setSidebarSection(SidebarSection.askQuestion);
    } else {
      setSidebarSection(SidebarSection.allQuestions);
    }
  };

  const handleAnswerClick = (questionData: QuestionsDataType) => {
    console.log(questionData);
    setSidebarSection(SidebarSection.seeAnswer);
  };

  const reDrawHighlightOnHover = (questionData: QuestionsDataType) => {
    if (pageNumber !== questionData.highlight.pageNumber) {
      alert('Not the same page!');
      return;
    }
    reDrawHighlight(questionData.highlight);
  };

  const deleteHighlight = (questionData: QuestionsDataType) => {
    console.log(questionData);
  };

  const removeDarkerHighlight = () => {
    try {
      Object.values(document.getElementsByClassName('darkerHighlight')).forEach(
        (element) => {
          element.classList.toggle('darkerHighlight');
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    debugger;
    if (rangeStatus.rangeSelected) {
      setSidebarSection(SidebarSection.askQuestion);
    }
  }, [rangeStatus]);

  const scrollToBottom = () => {
    // questionComponentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allQuestions]);

  return (
    <div className="m-4 flex h-screen flex-col justify-start rounded-lg bg-white p-1 text-black">
      {/* <section className="flex justify-center">
        <div className="my-4 w-9/12 rounded-lg bg-white py-4">
          <label className="m-1" htmlFor="file">
            Load from file:
          </label>{' '}
          <input className="m-1" onChange={onFileChange} type="file" />
        </div>
      </section> */}
      <section className="flex justify-around">
        <Button
          className="m-1 flex-auto bg-theme-green text-white"
          sx={{ background: '#45815a!important' }}
          size="large"
          variant="contained"
          onClick={handleAskQuestionButton}
        >
          {sidebarSection === SidebarSection.allQuestions
            ? 'Ask a Question'
            : 'All Questions'}
        </Button>
        <OutlinedInput
          className="m-1 flex-auto"
          placeholder="Search these discussion"
        />
      </section>
      {(() => {
        switch (sidebarSection) {
          case SidebarSection.allQuestions:
            return (
              <section className="overflow-auto" ref={questionComponentRef}>
                {allQuestions?.map((questionData: QuestionsDataType) => (
                  <QuestionCard
                    key={questionData.id}
                    {...questionData}
                    deleteHighlight={() => deleteHighlight(questionData)}
                    removeDarkerHighlight={() => removeDarkerHighlight()}
                    handleSeeAns={() => handleAnswerClick(questionData)}
                    reDrawHighlightOnHover={() =>
                      reDrawHighlightOnHover(questionData)
                    }
                  />
                ))}
              </section>
            );
          case SidebarSection.askQuestion:
            return (
              <section>
                <AskQuestionCard
                  setSidebarSection={setSidebarSection}
                  allQuestionBar={SidebarSection.allQuestions}
                />
              </section>
            );
          case SidebarSection.seeAnswer:
            return (
              <section className="overflow-auto">
                <AnswerCardSidebar />
              </section>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default PDFSideBar;
