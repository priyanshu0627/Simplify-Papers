import { Avatar, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import React from 'react';

import { updateQuestion } from '@/redux/features/questionDataSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

function AskQuestionCard() {
  const [channelName, setChannelName] = React.useState('');
  const [questionTitle, setQuestionTitle] = React.useState('');
  const [questionComment, setQuestionComment] = React.useState('');
  const rangeStatus = useAppSelector((state) => state.StatusHighlight);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setChannelName(event.target.value as string);
  };
  const handleQuestionTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(event.target.value as string);
  };
  const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionComment(event.target.value as string);
  };

  const submitQuestion = () => {
    if (!rangeStatus.rangeId) {
      return;
    }
    const formData = {
      questionTitle,
      questionComment,
      channelName,
      rangeStatus,
    };
    dispatch(updateQuestion(formData));
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between	">
        <div className="flex items-center">
          <Avatar>P</Avatar>
          <p className="mx-4 text-sm">Public Channel</p>
        </div>
        <FormControl fullWidth className="flex-1">
          <InputLabel id="demo-simple-select-label">Channel</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={channelName}
            label="Channel"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex">
        <div className="pt-[55px]">
          <Avatar>A</Avatar>
        </div>
        <div className="relative top-[55px] left-[15px] h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 border-l border-b border-gray-300 bg-white"></div>{' '}
        <div className="flex-1 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" rounded-t-md bg-[#2cabe2]	 px-4 text-sm text-white">
            Pubic Channel
          </div>
          <div className="mb-2 px-2">
            <TextField
              color="primary"
              label="Question"
              placeholder="Ask a Question"
              fullWidth={true}
              required={true}
              value={questionTitle}
              onChange={handleQuestionTitle}
              className="mt-4"
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Comment"
              placeholder="Add a Comment (Optional)"
              fullWidth={true}
              multiline
              maxRows={4}
              value={questionComment}
              onChange={handleComment}
              className="mt-4"
            />
            <div className="mt-4 text-sm">
              Use MarkDown to enrich this comment.
            </div>
            <div className="mt-4 flex flex-row-reverse">
              <Button
                variant="contained"
                className="bg-blue-700"
                onClick={submitQuestion}
              >
                ADD QUESTION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionCard;
