import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { AnswerEvaluationTypeEnum } from '@/modules/Questions/core/constant/answer.evaluation.type.enum';
import type AnswerModel from '@/modules/Questions/core/models/subModels/answer.model';
import ComplateAnswers from './ComplateAnswers.vue';

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: '12' } }),
}));

const questionData = [
  {
    answer: 'First answer',
    EvaluationType: AnswerEvaluationTypeEnum.typical,
  },
] as AnswerModel[];

const mountComponent = () =>
  mount(ComplateAnswers, {
    props: {
      questionData,
      draftData: [],
      SimilarPrecintage: 0,
    },
    global: {
      mocks: {
        $t: (key: string) => key,
      },
      stubs: {
        AddNewAnswerIcon: true,
        DeletIcon: true,
        SelectionTabs: {
          props: ['selectedTab', 'tabs'],
          emits: ['update:modelValue'],
          template:
            '<button class="select-similar" type="button" @click="$emit(\'update:modelValue\', 2)">similar</button>',
        },
      },
    },
  });

describe('ComplateAnswers', () => {
  it('emits the selected evaluation type when the tab changes', async () => {
    const wrapper = mountComponent();

    await wrapper.find('.select-similar').trigger('click');

    const events = wrapper.emitted('update:data');
    const latestPayload = events?.at(-1)?.[0] as Array<{ answerEvaluation?: number }>;

    expect(latestPayload[0]?.answerEvaluation).toBe(AnswerEvaluationTypeEnum.similar);
  });
});
