import { ArticleTypeEnum } from '@/modules/Articles/core/constant/Article.type.enum';
import MCQAnswers from './MCQAnswers.vue';
import RankingAnswers from './RankingAnswers.vue';
import TrueOrFalseAnswers from './TrueOrFalseAnswers.vue';
import ComplateAnswers from './ComplateAnswers.vue';
import MatchingAnswers from './MatchingAnswers.vue';

export const AnswerTypeHelper = (type: ArticleTypeEnum) => {
  const components = {
    [ArticleTypeEnum.mcq]: MCQAnswers,
    [ArticleTypeEnum.ranking]: RankingAnswers,
    [ArticleTypeEnum.true_false]: TrueOrFalseAnswers,
    [ArticleTypeEnum.complate]: ComplateAnswers,
    [ArticleTypeEnum.matching]: MatchingAnswers,
  };

  return components[type];
};
