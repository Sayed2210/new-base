import { QuestionGeneratedByEnum } from '../constant/generatedby.enum';
import { QuestionDifficultyEnum } from '../constant/question.difficulty.enum';
import { QuestionStatusEnum } from '../constant/question.status.enum';
import { QuestionTypeEnum } from '../constant/question.type.enum';
import AnswerModel from './subModels/answer.model';
import QuestionClarificationModel from './subModels/question.clarification.model';
import SolutionHintModel from './subModels/solution.hint.model';
import SolutionStepsModel from './subModels/solution.steps.model';
import SubjectTreeModel from './subModels/subject.tree.model';
import sequenceTreeModel from './subModels/sequence.model';
import QuestionDocumentModel from './subModels/question.document.model';
import QuestionSkillsModel from './subModels/question.skills.model';
import type TitleInterface from '@/base/Data/Models/titleInterface';
import { AnswerEvaluationTypeEnum } from '../constant/answer.evaluation.type.enum';

export default class ShowQuestionsModel {
  public readonly id?: number;
  public readonly questionType?: QuestionTypeEnum;
  public readonly difficulty?: QuestionDifficultyEnum;
  public readonly topics?: TitleInterface<number>[];
  public readonly questionTitle?: string;
  public readonly questionImage?: string;

  public readonly status?: QuestionStatusEnum;
  public readonly generatedBy?: QuestionGeneratedByEnum;
  public readonly createdAt?: string;

  public readonly answers?: AnswerModel[];
  public readonly questionClarification?: QuestionClarificationModel;
  public readonly solutionSteps?: SolutionStepsModel;
  public readonly solutionHint?: SolutionHintModel;
  public readonly subjectTree?: SubjectTreeModel;
  public readonly sequenceTree?: sequenceTreeModel;
  public readonly questionDocuments?: QuestionDocumentModel;
  public readonly skills?: QuestionSkillsModel[];

  public readonly isClarification?: boolean;
  public readonly isQusetionSteps?: boolean;
  public readonly isQusetionHints?: boolean;

  constructor(data: {
    id?: number;
    generatedBy?: QuestionGeneratedByEnum;
    questionType?: QuestionTypeEnum;
    difficulty?: QuestionDifficultyEnum;
    status?: QuestionStatusEnum;
    topics?: TitleInterface<number>[];
    questionTitle?: string;
    questionImage?: string;
    createdAt?: string;
    answers?: AnswerModel[];
    questionClarification?: QuestionClarificationModel;
    solutionSteps?: SolutionStepsModel;
    solutionHint?: SolutionHintModel;
    subjectTree?: SubjectTreeModel;
    sequenceTree?: sequenceTreeModel;
    questionDocuments?: QuestionDocumentModel;
    skills?: QuestionSkillsModel[];
    isClarification?: boolean;
    isQusetionSteps?: boolean;
    isQusetionHints?: boolean;
  }) {
    this.id = data.id;
    this.generatedBy = data.generatedBy;
    this.questionType = data.questionType;
    this.difficulty = data.difficulty;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.questionTitle = data.questionTitle;
    this.questionImage = data.questionImage;
    this.topics = data.topics;
    this.answers = data.answers;
    this.questionClarification = data.questionClarification;
    this.solutionSteps = data.solutionSteps;
    this.solutionHint = data.solutionHint;
    this.subjectTree = data.subjectTree;
    this.sequenceTree = data.sequenceTree;
    this.questionDocuments = data.questionDocuments;
    this.skills = data.skills;
    this.isClarification = data.isClarification;
    this.isQusetionSteps = data.isQusetionSteps;
    this.isQusetionHints = data.isQusetionHints;

    Object.freeze(this);
  }

  static fromJson(json: any): ShowQuestionsModel {
    if (!json) {
      throw new Error('Cannot create questionsModel from null or undefined');
    }

    return new ShowQuestionsModel({
      id: json.id,
      generatedBy: json.generated_by,
      questionType: json.question_type,
      difficulty: json.difficulty,
      status: json.status,
      createdAt: json.created_at,
      questionTitle: json.question_title,
      questionImage: json.question_image,
      topics: json.topics,
      answers: json.answers.map((answer: any) => AnswerModel.fromJson(answer)),
      questionClarification: QuestionClarificationModel.fromJson(json.question_clarification),
      solutionSteps: SolutionStepsModel.fromJson(json.solution_steps),
      solutionHint: SolutionHintModel.fromJson(json.solution_hint),
      subjectTree: SubjectTreeModel.fromJson(json.subject_tree),
      sequenceTree: sequenceTreeModel.fromJson(json.sequence_tree),
      questionDocuments: QuestionDocumentModel.fromJson(json.question_documents),
      skills: json.skills.map((skill: any) => QuestionSkillsModel.fromJson(skill)),
      isClarification: json.is_clarification,
      isQusetionSteps: json.is_question_steps,
      isQusetionHints: json.is_question_hint,
    });
  }

  static example: ShowQuestionsModel = new ShowQuestionsModel({
    id: 1,
    generatedBy: QuestionGeneratedByEnum.manual,
    questionType: QuestionTypeEnum.mcq,
    difficulty: QuestionDifficultyEnum.easy,
    status: QuestionStatusEnum.not_Reviewd,
    createdAt: '2022-01-01',
    questionTitle: 'Question Title',
    questionImage: `https://cyber.comolho.com/static/img/avatar.png`,
    topics: [
      { id: 2, title: 'Document 2' },
      { id: 3, title: 'Document 3' },
    ],
    answers: [
      {
        ...AnswerModel.example,
        answer: 'answer 1',
        match: 'matching answert',
        rank: 10,
        similar: 'Similar',
        EvaluationType: AnswerEvaluationTypeEnum.similar,
      },
      { ...AnswerModel.example, answer: 'answer 2', is_right_answer: false },
    ],
    questionClarification: QuestionClarificationModel.example,
    solutionSteps: SolutionStepsModel.example,
    solutionHint: SolutionHintModel.example,
    subjectTree: SubjectTreeModel.example,
    sequenceTree: sequenceTreeModel.example,
    questionDocuments: QuestionDocumentModel.example,
    skills: [
      new QuestionSkillsModel({
        id: 2,
        skill: 'Document 2',
        precentage: 10,
      }),
      new QuestionSkillsModel({
        id: 3,
        skill: 'Document 3',
        precentage: 90,
      }),
    ],
    isClarification: true,
    isQusetionSteps: true,
    isQusetionHints: true,
  });
}
