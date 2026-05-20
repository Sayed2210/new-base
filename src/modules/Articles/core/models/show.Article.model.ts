import type TitleInterface from '@/base/Data/Models/titleInterface';
import { QuestionGeneratedByEnum } from '../constant/generatedby.enum';
import { QuestionDifficultyEnum } from '../constant/question.difficulty.enum';
import { QuestionStatusEnum } from '../constant/question.status.enum';
import { QuestionTypeEnum } from '../constant/question.type.enum';
import AnswerModel from './subModels/Article.answer.model';
import QuestionClarificationModel from './subModels/Article.clarification.model';
import SolutionHintModel from './subModels/Article.solution.hint.model';
import SolutionStepsModel from './subModels/Article.solution.steps.model';
import SubjectTreeModel from './subModels/Article.subject.tree.model';
import sequenceTreeModel from './subModels/Article.sequence.model';
import QuestionDocumentModel from './subModels/Article.document.model';
import ArticleSkillsModel from './subModels/Article.skills.model';

export default class ShowArticleModel {
  public readonly id?: number;
  public readonly articleType?: QuestionTypeEnum;
  public readonly difficulty?: QuestionDifficultyEnum;
  public readonly topic?: TitleInterface<number>;
  public readonly articleImage?: string;
  public readonly status?: QuestionStatusEnum;
  public readonly generatedBy?: QuestionGeneratedByEnum;
  public readonly createdAt?: string;
  public readonly answers?: AnswerModel[];
  public readonly articleClarification?: QuestionClarificationModel;
  public readonly articleSolutionSteps?: SolutionStepsModel;
  public readonly articleSolutionHint?: SolutionHintModel;
  public readonly subjectTree?: SubjectTreeModel;
  public readonly sequenceTree?: sequenceTreeModel;
  public readonly articleDocuments?: QuestionDocumentModel;
  public readonly articleSkills?: ArticleSkillsModel[];
  public readonly articleTitle?: string;
  public readonly subject?: string;
  public readonly noOfQs?: number;

  constructor(data: {
    id?: number;
    generatedBy?: QuestionGeneratedByEnum;
    articleType?: QuestionTypeEnum;
    difficulty?: QuestionDifficultyEnum;
    status?: QuestionStatusEnum;
    createdAt?: string;
    answers?: AnswerModel[];
    articleClarification?: QuestionClarificationModel;
    articleSolutionSteps?: SolutionStepsModel;
    articleSolutionHint?: SolutionHintModel;
    subjectTree?: SubjectTreeModel;
    sequenceTree?: sequenceTreeModel;
    articleDocuments?: QuestionDocumentModel;
    articleSkills?: ArticleSkillsModel[];
    articleTitle?: string;
    subject?: string;
    noOfQs?: number;
  }) {
    this.id = data.id;
    this.generatedBy = data.generatedBy;
    this.articleType = data.articleType;
    this.difficulty = data.difficulty;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.answers = data.answers;
    this.articleClarification = data.articleClarification;
    this.articleSolutionSteps = data.articleSolutionSteps;
    this.articleSolutionHint = data.articleSolutionHint;
    this.subjectTree = data.subjectTree;
    this.sequenceTree = data.sequenceTree;
    this.articleDocuments = data.articleDocuments;
    this.articleSkills = data.articleSkills;
    this.articleTitle = data.articleTitle;
    this.subject = data.subject;
    this.generatedBy = data.generatedBy;
    this.noOfQs = data.noOfQs;

    Object.freeze(this);
  }

  static fromJson(json: any): ShowArticleModel {
    if (!json) {
      throw new Error('Cannot create questionsModel from null or undefined');
    }

    return new ShowArticleModel({
      id: json.id,
      generatedBy: json.generated_by,
      articleType: json.article_type,
      difficulty: json.difficulty,
      status: json.status,
      createdAt: json.created_at,
      answers: json.answers.map((answer: any) => AnswerModel.fromJson(answer)),
      articleClarification: QuestionClarificationModel.fromJson(json.article_clarification),
      articleSolutionSteps: SolutionStepsModel.fromJson(json.article_solution_steps),
      articleSolutionHint: SolutionHintModel.fromJson(json.article_solution_hint),
      subjectTree: SubjectTreeModel.fromJson(json.subject_tree),
      sequenceTree: sequenceTreeModel.fromJson(json.sequence_tree),
      articleDocuments: QuestionDocumentModel.fromJson(json.article_documents),
      articleSkills: json.article_skills.map((skill: any) => ArticleSkillsModel.fromJson(skill)),
      articleTitle: json.article_title,
      subject: json.subject,
      noOfQs: json.no_of_qs,
    });
  }

  static example: ShowArticleModel = new ShowArticleModel({
    id: 1,
    generatedBy: QuestionGeneratedByEnum.manual,
    articleType: QuestionTypeEnum.mcq,
    difficulty: QuestionDifficultyEnum.easy,
    status: QuestionStatusEnum.not_Reviewd,
    createdAt: '2022-01-01',
    answers: [AnswerModel.example],
    articleClarification: QuestionClarificationModel.example,
    articleSolutionSteps: SolutionStepsModel.example,
    articleSolutionHint: SolutionHintModel.example,
    subjectTree: SubjectTreeModel.example,
    sequenceTree: sequenceTreeModel.example,
    articleDocuments: QuestionDocumentModel.example,
    articleSkills: [ArticleSkillsModel.example],
    articleTitle: 'What is the capital of Egypt? ',
    subject: 'Math',
    noOfQs: 10,
  });
}
