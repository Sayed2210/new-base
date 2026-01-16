export default class TitleInterface<T extends string | number> {
  id: number;
  title?: string;
  subtitle?: T;
  kpi?: string;
  decodedData?: string = "";

  constructor({
    id,
    title,
    subtitle,
    kpi,
    decodedData = "",
  }: {
    id: number;
    title?: string;
    subtitle?: T;
    kpi?: string;
    decodedData?: string;
  }) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.kpi = kpi;
    this.decodedData = decodedData;
  }
}
