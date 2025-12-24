export default class TitleInterface {
  id: number;
  title?: string;
  subtitle?: string;
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
    subtitle?: string;
    kpi?: string;
    decodedData?: string;
  }) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle || "";
    this.kpi = kpi;
    this.decodedData = decodedData;
  }
}
