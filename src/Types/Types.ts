export interface QuestionsDataType {
  id: number;
  upVotes: number;
  downVotes: number;
  accepted: boolean;
  flag: number;
  question: string;
  askedBy: string;
  lastActivityPerson: string;
  lastActivityTime: string;
  tags: string[];
}
