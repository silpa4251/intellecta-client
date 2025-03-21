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

  export type Course = {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    difficulty: "beginner" | "intermediate" | "advanced"; // if fixed values
    author: {
      authorName: string;
      authorProficPic: string;
    };
    created_At: string; // ISO date string
    updated_At: string; // ISO date string
  };
  