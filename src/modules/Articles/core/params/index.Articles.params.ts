import IndexParams from '@/base/Core/Params/indexParams';
import type { QuestionStatusEnum } from '../constant/question.status.enum';
import type { QuestionGeneratedByEnum } from '../constant/generatedby.enum';
import type { QuestionTypeEnum } from '../constant/question.type.enum';
import type { QuestionDifficultyEnum } from '../constant/question.difficulty.enum';

export default class IndexArticleParams extends IndexParams {
  public status?: QuestionStatusEnum;
  public generated_by?: QuestionGeneratedByEnum;
  public article_type?: QuestionTypeEnum;
  public difficulty?: QuestionDifficultyEnum;
  constructor(data: {
    word: string;
    pageNumber: number;
    perPage: number;
    withPage: number;
    status?: QuestionStatusEnum;
    generated_by?: QuestionGeneratedByEnum;
    article_type?: QuestionTypeEnum;
    difficulty?: QuestionDifficultyEnum;
  }) {
    super(data.word, data.pageNumber, data.perPage, data.withPage);
    this.status = data.status;
    this.generated_by = data.generated_by;
    this.article_type = data.article_type;
    this.difficulty = data.difficulty;
  }

  toMap(): Record<string, any> {
    return {
      ...super.toMap(),
      ...(this.status ? { status: this.status } : {}),
      ...(this.generated_by ? { generated_by: this.generated_by } : {}),
      ...(this.article_type ? { article_type: this.article_type } : {}),
      ...(this.difficulty ? { difficulty: this.difficulty } : {}),
    };
  }
}
 