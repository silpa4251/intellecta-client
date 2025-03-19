export interface User{
    _id: string;
    name: string;
    email: string;
    dob: Date;
    phone:number;
    role: string;
    profilePic:string;
    createdAt:Date;
}

export type QuizQuestion = {
    question: string;
    options: string[];
    answer: string;
  };
  
  export type Lesson = {
    id: string;
    courseId: string;
    title: string;
    unlocked: boolean;
    completed: boolean;
    duration: number;
    quiz: QuizQuestion[];
  };