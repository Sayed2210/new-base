import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';
import type { ArticleTypeEnum } from '../constant/Article.type.enum';
import type { ArticleDifficultyEnum } from '../constant/Article.difficulty.enum';
import type ArticalSolutionStepsParams from './subParams/Artical.soluation.steps.params';
import type ArticalAnswersParams from './subParams/Artical.answers.params';
import type ArticalSourceParams from './subParams/Artical.source.params';
import type ArticleClarificationParams from './subParams/Artical.clarification.params';
import type ArticalSkillParams from './subParams/Artical.skills.params';

/**
 * Parameters for adding a new employee
 */
export default class AddArticlesParams implements Params {
  public title?: string;
  public image?: string[];
  public articleType?: ArticleTypeEnum;
  public subjectId?: number | null;
  public topics?: number[];
  public articleSequenceId?: number | null;
  public difficultyLevel?: ArticleDifficultyEnum | null;
  public skills?: ArticalSkillParams[];
  public articleSource?: ArticalSourceParams;
  public answers?: ArticalAnswersParams[];
  public isArticleClarification?: boolean;
  public articleClarification?: ArticleClarificationParams;
  public isArticleSolutionSteps?: boolean;
  public articleSolutionSteps?: ArticalSolutionStepsParams;
  public isArticleSolutionHint?: boolean;
  public articleSolutionHint?: ArticalSolutionStepsParams;

  public static readonly validation = new ClassValidation().setRules({
    title: { required: true },
    image: { required: true },
    articleType: { required: true },
    subjectId: { required: false },
    topics: { required: true },
    difficultyLevel: { required: false },
    skills: { required: true },
    answers: { required: true },
    articleSource: { required: true },
  });

  constructor(data: {
    title?: string;
    image?: string[];
    articleType?: ArticleTypeEnum;
    subjectId?: number | null;
    topics?: number[];
    articleSequenceId?: number | null;
    difficultyLevel?: ArticleDifficultyEnum | null;
    skills?: ArticalSkillParams[];
    articleSource?: ArticalSourceParams;
    answers?: ArticalAnswersParams[];
    isArticleClarification?: boolean;
    articleClarification?: ArticleClarificationParams;
    isArticleSolutionSteps?: boolean;
    articleSolutionSteps?: ArticalSolutionStepsParams;
    isArticleSolutionHint?: boolean;
    articleSolutionHint?: ArticalSolutionStepsParams;
  }) {
    this.title = data.title;
    this.image = data.image;
    this.articleType = data.articleType;
    this.subjectId = data.subjectId;
    this.topics = data.topics;
    this.articleSequenceId = data.articleSequenceId;
    this.difficultyLevel = data.difficultyLevel;
    this.skills = data.skills;
    this.answers = data.answers;
    this.articleSource = data.articleSource;
    this.isArticleClarification = data.isArticleClarification;
    this.articleClarification = data.articleClarification;
    this.isArticleSolutionSteps = data.isArticleSolutionSteps;
    this.articleSolutionSteps = data.articleSolutionSteps;
    this.isArticleSolutionHint = data.isArticleSolutionHint;
    this.articleSolutionHint = data.articleSolutionHint;
  }

  toMap(): { [p: string]: any } {
    return {
      title: this.title,
      image: this.image,
      article_type: this.articleType,
      subject_id: this.subjectId,
      topics: this.topics,
      article_sequence_id: this.articleSequenceId,
      difficulty_level: this.difficultyLevel,
      skills: this.skills,
      answers: this.answers,
      article_source: this.articleSource,
      is_article_clarification: this.isArticleClarification,
      article_clarification: this.articleClarification,
      is_article_solution_steps: this.isArticleSolutionSteps,
      article_solution_steps: this.articleSolutionSteps,
      is_article_solution_hint: this.isArticleSolutionHint,
      article_solution_hint: this.articleSolutionHint,
    };
  }

  validate() {
    return AddArticlesParams.validation.validate(this);
  }

  validateOrThrow() {
    return AddArticlesParams.validation.validateOrThrow(this);
  }
}
