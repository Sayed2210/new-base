export default class WordParams {
  constructor(public word: string = "") {
    this.word = word;
  }

  toMap(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data["word"] = this.word;
    return data;
  }
}
