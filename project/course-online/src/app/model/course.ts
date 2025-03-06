import { lesson } from "./lesson";

export class Course {
    includes(userId: number | null) {
      throw new Error('Method not implemented.');
    }
    students: any;
    constructor(
      public  courseId: number,public title: string,public description: string, public teacherId: number,public lessons: lesson[]
    ) {}
  }
  