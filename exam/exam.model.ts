export interface Exam{
    id?: number;
    title:string
    description:string
    passingScore:GLfloat
    creatorId: number
   questionId: number[]
}