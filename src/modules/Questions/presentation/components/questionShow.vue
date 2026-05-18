# QuestionShowPage.vue ```vue
<script setup lang="ts">
  import QuestionAnswers from '../subComponents/QuestionShow/QuestionAnswers.vue';
  import QuestionClarification from '../subComponents/QuestionShow/QuestionClarification.vue';
  import QuestionHeader from '../subComponents/QuestionShow/QuestionHeader.vue';
  import QuestionInfo from '../subComponents/QuestionShow/QuestionInfo.vue';
  import QuestionLogHistory from '../subComponents/QuestionShow/QuestionLogHistory.vue';
  import QuestionReviewProcedures from '../subComponents/QuestionShow/QuestionReviewProcedures.vue';
  import QuestionSolutionHint from '../subComponents/QuestionShow/QuestionSolutionHint.vue';
  import QuestionSolutionSteps from '../subComponents/QuestionShow/QuestionSolutionSteps.vue';
  import QuestionStatusBox from '../subComponents/QuestionShow/QuestionStatusBox.vue';
  import QuestionTree from '../subComponents/QuestionShow/QuestionTree.vue';

  // import questionImage from '@/assets/images/question-image.png';

  const question = {
    id: 42547896,
    title: 'What is the main function of the heart in the human body?',
    description:
      'Choose the correct answer from the following options based on your biology knowledge.',
    subject: 'Biology',
    grade: 'First Secondary',
    language: 'English',
    difficulty: 'Medium',
    status: 'rejected',
    createdAt: '20 May 2025',
    generatedBy: 'AI',
    source: 'School Book Page 25',
  };

  // const answers = [
  //   {
  //     id: 1,
  //     text: 'Pumping blood throughout the body',
  //     img: questionImage,
  //     isCorrect: true,
  //   },
  //   {
  //     id: 2,
  //     text: 'Helping the body digest food',
  //     img: questionImage,
  //     isCorrect: false,
  //   },
  //   {
  //     id: 3,
  //     text: 'Controlling body temperature only',
  //     img: questionImage,
  //     isCorrect: false,
  //   },
  //   {
  //     id: 4,
  //     text: 'Producing oxygen for the lungs',
  //     img: questionImage,
  //     isCorrect: false,
  //   },
  // ];

  // const clarification = {
  //   description:
  //     'The question focuses on understanding the primary role of the heart inside the circulatory system.',
  //   documents: ['Biology-Book.pdf', 'Human-Body-Notes.pdf', 'Heart-System.pdf'],
  //   image: questionImage,
  // };

  // const solutionHint = 'Think about how oxygen and nutrients move across the body.';

  // const solutionSteps = [
  //   'The heart belongs to the circulatory system.',
  //   'It pushes blood to all body organs.',
  //   'Blood carries oxygen and nutrients.',
  //   'Therefore the correct answer is pumping blood throughout the body.',
  // ];

  // const reviewProcedures = [
  //   'Verify question grammar',
  //   'Validate scientific accuracy',
  //   'Check answer correctness',
  //   'Approve for publishing',
  // ];

  const tree = {
    curriculum: 'Governmental',
    stage: 'Secondary',
    semester: 'First',
    unit: 'Unit 1',
    chapter: 'Chapter 2',
    lesson: 'Circulatory System',
  };

  const logs = [
    {
      date: '05-10-2025',
      status: 'Waiting Review',
      time: '5:15 PM',
      createdBy: 'System AI',
    },
    {
      date: '04-10-2025',
      status: 'added',
      time: '1:20 PM',
      createdBy: 'Ahmed Hawam',
    },
    {
      date: '04-10-2025',
      status: 'approved',
      time: '1:20 PM',
      createdBy: 'Ahmed Hawam',
    },
    {
      date: '04-10-2025',
      status: 'rejected',
      time: '1:20 PM',
      createdBy: 'System AI',
    },
  ];
</script>

<template>
  <QuestionHeader />

  <div class="question-show-page">
    <div class="main-content-row">
      <QuestionInfo />

      <QuestionAnswers />

      <QuestionClarification />

      <div class="solution-container">
        <QuestionSolutionHint />

        <QuestionSolutionSteps />
      </div>

      <QuestionReviewProcedures />
    </div>

    <div class="side-content">
      <QuestionStatusBox
        :status="question.status"
        :question-id="question.id"
        :generated-by="question.generatedBy"
        :created-at="question.createdAt"
      />

      <QuestionTree :tree="tree" />

      <QuestionLogHistory :logs="logs" />
    </div>
  </div>
</template>
