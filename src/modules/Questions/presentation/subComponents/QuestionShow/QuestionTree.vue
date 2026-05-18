<script setup lang="ts">
  import { computed } from 'vue';
  import Arrow from '@/shared/icons/Question/Arrow.vue';
  import NextStepIcon from '@/shared/icons/Question/NextStepIcon.vue';

  const props = defineProps<{
    tree: {
      curriculum: string;
      stage: string;
      semester: string;
      unit: string;
      chapter: string;
      lesson: string;
    };
  }>();

  const subjectPath = computed(() => [
    props.tree.curriculum,
    props.tree.stage,
    props.tree.semester,
  ]);

  const sequencePath = computed(() => [props.tree.unit, props.tree.chapter, props.tree.lesson]);
</script>

<template>
  <div class="question-tree-card">
    <!-- Subject -->
    <div class="section">
      <h4>Subject</h4>

      <div class="subject-box">
        <div class="subject-info">
          <template v-for="(item, index) in subjectPath" :key="item">
            <span>{{ item }}</span>

            <NextStepIcon v-if="index !== subjectPath.length - 1" class="arrow-next" />
          </template>
        </div>

        <div class="language">
          <Arrow />
          <span>Biology</span>
        </div>
      </div>
    </div>

    <!-- Question Sequence -->
    <div class="section">
      <h4>Question Sequence</h4>

      <div class="sequence-list">
        <template v-for="(item, index) in sequencePath" :key="item">
          <div class="sequence-item">
            {{ item }}
          </div>

          <NextStepIcon v-if="index !== sequencePath.length - 1" class="arrow-next" />
        </template>
      </div>
    </div>

    <!-- Documents -->
    <div class="section">
      <h4>Documents</h4>

      <div class="document">
        <h5>Biology Book</h5>
        <NextStepIcon v-if="index !== sequencePath.length - 1" class="arrow-next" />

        <p>Source: School Book Page 25</p>
      </div>
    </div>

    <!-- Skills -->
    <div class="section">
      <h4>Skill</h4>

      <ul class="skills">
        <li>
          <span class="dot"></span>
          Understanding
        </li>

        <li>
          <span class="dot"></span>
          Analysis
        </li>

        <li>
          <span class="dot"></span>
          Conservation
        </li>
      </ul>
    </div>
  </div>
</template>


