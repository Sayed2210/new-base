import TitleInterface from '@/base/Data/Models/titleInterface';
import type StageModel from '@/modules/Stages/core/models/stage.model';

export default class GetFullNameOfBranch {
  getLastBranchFullTitles(tree: StageModel[]): TitleInterface<number>[] {
    const result: TitleInterface<number>[] = [];

    for (const item of tree) {
      this.collectLastBranches(item.children ?? [], result);
    }

    return result;
  }

  private collectLastBranches(branches: StageModel[], result: TitleInterface<number>[]): void {
    for (const branch of branches) {
      if (!branch.children?.length) {
        if (branch.id && branch.full_title) {
          result.push(
            new TitleInterface<number>({
              id: branch.id,
              title: branch.full_title,
            }),
          );
        }

        continue;
      }

      this.collectLastBranches(branch.children, result);
    }
  }
}
