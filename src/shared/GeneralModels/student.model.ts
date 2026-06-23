export default class StudentModel {
  public readonly id?: number;
  public readonly name?: string;
  public readonly image?: string;

  constructor(data: { id?: number; name?: string; image?: string }) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    Object.freeze(this);
  }

  static fromJson(json: any): StudentModel {
    if (!json) {
      throw new Error('Cannot create StudentModel from null or undefined');
    }

    return new StudentModel({
      id: json.id,
      name: json.name,
      image: json.image,
    });
  }

  static example: StudentModel = new StudentModel({
    id: 1,
    name: 'John Doe',
    image: 'https://example.com/image.jpg',
  });
}
