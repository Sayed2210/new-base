import type TitleInterface from '@/base/Data/Models/titleInterface';
import AnswerModel from './subModels/Article.answer.model';
import QuestionClarificationModel from './subModels/Article.clarification.model';
import SolutionHintModel from './subModels/Article.solution.hint.model';
import SolutionStepsModel from './subModels/Article.solution.steps.model';
import SubjectTreeModel from './subModels/Article.subject.tree.model';
import sequenceTreeModel from './subModels/Article.sequence.model';
import ArticleSkillsModel from './subModels/Article.skills.model';
import { ArticleTypeEnum } from '../constant/Article.type.enum';
import { ArticleDifficultyEnum } from '../constant/Article.difficulty.enum';
import { ArticleStatusEnum } from '../constant/Article.status.enum';
import { ArticleGeneratedByEnum } from '../constant/Article.generatedby.enum';
import ArticleDocumentModel from './subModels/Article.document.model';

export default class ShowArticleModel {
  public readonly id?: number;
  public readonly articleType?: ArticleTypeEnum;
  public readonly difficulty?: ArticleDifficultyEnum;
  public readonly topics?: TitleInterface<number>[];
  public readonly articleImage?: string;
  public readonly status?: ArticleStatusEnum;
  public readonly generatedBy?: ArticleGeneratedByEnum;
  public readonly createdAt?: string;
  public readonly answers?: AnswerModel[];
  public readonly articleClarification?: QuestionClarificationModel;
  public readonly articleSolutionSteps?: SolutionStepsModel;
  public readonly articleSolutionHint?: SolutionHintModel;
  public readonly subjectTree?: SubjectTreeModel;
  public readonly sequenceTree?: sequenceTreeModel;
  public readonly articleDocuments?: ArticleDocumentModel;
  public readonly articleSkills?: ArticleSkillsModel[];
  public readonly articleTitle?: string;
  public readonly subject?: string;
  public readonly noOfQs?: number;

  constructor(data: {
    id?: number;
    generatedBy?: ArticleGeneratedByEnum;
    articleType?: ArticleTypeEnum;
    difficulty?: ArticleDifficultyEnum;
    status?: ArticleStatusEnum;
    createdAt?: string;
    topics?: TitleInterface<number>[];
    answers?: AnswerModel[];
    articleClarification?: QuestionClarificationModel;
    articleSolutionSteps?: SolutionStepsModel;
    articleSolutionHint?: SolutionHintModel;
    subjectTree?: SubjectTreeModel;
    sequenceTree?: sequenceTreeModel;
    articleDocuments?: ArticleDocumentModel;
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
    this.topics = data.topics;
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
      throw new Error('Cannot create articlesModel from null or undefined');
    }

    return new ShowArticleModel({
      id: json.id,
      generatedBy: json.generated_by,
      articleType: json.article_type,
      difficulty: json.difficulty,
      status: json.status,
      createdAt: json.created_at,
      topics: json.topics,
      answers: json.answers.map((answer: any) => AnswerModel.fromJson(answer)),
      articleClarification: QuestionClarificationModel.fromJson(json.article_clarification),
      articleSolutionSteps: SolutionStepsModel.fromJson(json.article_solution_steps),
      articleSolutionHint: SolutionHintModel.fromJson(json.article_solution_hint),
      subjectTree: SubjectTreeModel.fromJson(json.subject_tree),
      sequenceTree: sequenceTreeModel.fromJson(json.sequence_tree),
      articleDocuments: ArticleDocumentModel.fromJson(json.article_documents),
      articleSkills: json.article_skills.map((skill: any) => ArticleSkillsModel.fromJson(skill)),
      articleTitle: json.article_title,
      subject: json.subject,
      noOfQs: json.no_of_qs,
    });
  }

  static example: ShowArticleModel = new ShowArticleModel({
    id: 1, 
    generatedBy: ArticleGeneratedByEnum.manual,
    articleType: ArticleTypeEnum.mcq,
    difficulty: ArticleDifficultyEnum.easy,
    status: ArticleStatusEnum.not_Reviewd,
    createdAt: '2022-01-01',
    answers: [AnswerModel.example],
    articleClarification: QuestionClarificationModel.example,
    articleSolutionSteps: SolutionStepsModel.example,
    articleSolutionHint: SolutionHintModel.example,
    subjectTree: SubjectTreeModel.example,
    sequenceTree: sequenceTreeModel.example,
    articleDocuments: ArticleDocumentModel.example,
    articleSkills: [ArticleSkillsModel.example],
    articleTitle: 'What is the capital of Egypt? ',
    subject: 'Math',
    noOfQs: 10,
  });
}
