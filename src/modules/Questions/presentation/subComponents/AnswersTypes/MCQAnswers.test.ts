import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import type AnswerModel from '@/modules/Questions/core/models/subModels/answer.model';
import MCQAnswers from './MCQAnswers.vue';

const mountComponent = (props: { questionData?: AnswerModel[]; draftData?: any[] } = {}) =>
  mount(MCQAnswers, {
    props: {
      questionData: props.questionData ?? [],
      draftData: props.draftData ?? [],
    },
    global: {
      mocks: {
        $t: (key: string) => key,
      },
      stubs: {
        AddNewAnswerIcon: true,
        DeletIcon: true,
        HandleFilesUpload: {
          emits: ['change'],
          template: '<div class="upload-stub"><slot name="content" /></div>',
        },
        RadioButton: {
          props: ['modelValue', 'inputId', 'name', 'value'],
          emits: ['change'],
          template: '<button class="radio-stub" type="button" @click="$emit(\'change\')" />',
        },
        UploadFileIcon: true,
      },
    },
  });

describe('MCQAnswers', () => {
  it('renders the MCQ answer timeline', () => {
    const wrapper = mountComponent();

    expect(wrapper.find('.mcq-answers-time-line-container').exists()).toBe(true);
  });

  it('emits updated answer data when typing an answer', async () => {
    const wrapper = mountComponent();

    await wrapper.find('.field-input').setValue('First answer');

    const latestPayload = wrapper.emitted('update:data')?.at(-1)?.[0] as
      | Array<{ title?: string }>
      | undefined;

    expect(latestPayload?.[0]?.title).toBe('First answer');
  });
});
