import { PlacementDifficultyLevelEnum } from "../../constant/placement.difficulty.level.enum";


export default class PlacemntDifficultyLevelModel {
  public readonly difficultyLevel?: PlacementDifficultyLevelEnum;
  public readonly mark?: number;


  constructor(data: {
    difficultyLevel?:  PlacementDifficultyLevelEnum;
    mark?: number;

  }) {
    this.difficultyLevel = data.difficultyLevel;
    this.mark = data.mark;
  }

  static fromJson(json: any): PlacemntDifficultyLevelModel {
    if (!json) {
      throw new Error('Cannot create PlacemntDifficultyLevelModel from null or undefined');
    }

    return new PlacemntDifficultyLevelModel({
      difficultyLevel: json.difficulty_level,
      mark: json.mark,

    });
  }

  static example: PlacemntDifficultyLevelModel = new PlacemntDifficultyLevelModel({
    difficultyLevel: PlacementDifficultyLevelEnum.easy,
    mark: 120,
  });
}
