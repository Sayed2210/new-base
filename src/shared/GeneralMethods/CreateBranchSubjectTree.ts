import type TitleInterface from '@/base/Data/Models/titleInterface';

type TreeNode = {
  id?: number;
  title?: string;
  e_c_branch_id?: number;
  e_c_subject_id?: number;
  branches?: TreeNode[];
  subjects?: TreeNode[];
  children?: TreeNode[];
};

export function getFullTitlesFromEducationResponse(response: TreeNode[]): TitleInterface<number>[] {
  const result: TitleInterface<number>[] = [];

  const getNodeId = (node: TreeNode): number | undefined => {
    return node.e_c_subject_id ?? node.e_c_branch_id ?? node.id;
  };

  const buildSubjectTree = (subjects: TreeNode[], parentTitles: string[]) => {
    subjects.forEach((subject) => {
      const currentTitles = [...parentTitles, subject.title ?? ''];

      const subjectChildren = subject.children ?? [];

      if (subjectChildren.length > 0) {
        buildSubjectTree(subjectChildren, currentTitles);
      } else {
        const id = getNodeId(subject);

        if (id) {
          result.push({
            id,
            title: currentTitles.filter(Boolean).join(' -> '),
          });
        }
      }
    });
  };

  const buildBranchTree = (branches: TreeNode[], parentTitles: string[] = []) => {
    branches.forEach((branch) => {
      const currentTitles = [...parentTitles, branch.title ?? ''];

      const branchChildren = branch.children ?? [];
      const subjects = branch.subjects ?? [];

      if (branchChildren.length > 0) {
        buildBranchTree(branchChildren, currentTitles);
      }

      if (subjects.length > 0) {
        buildSubjectTree(subjects, currentTitles);
      }

      // Optional fallback:
      // If branch has no children and no subjects, return branch itself as last node
      if (branchChildren.length === 0 && subjects.length === 0) {
        const id = getNodeId(branch);

        if (id) {
          result.push({
            id,
            title: currentTitles.filter(Boolean).join(' -> '),
          });
        }
      }
    });
  };

  response.forEach((educationClassification) => {
    buildBranchTree(educationClassification.branches ?? []);
  });

  return result;
}
