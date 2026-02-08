import RepoInterface from "@/base/Domain/Repositories/repo_interface";
import type ServicesInterface from "@/base/Data/ApiService/api_service_interface";
import MailModel from "../../Data/models/mail_model";
import { IndexMailApiService } from "../../Data/api_services/index_mail_api_service";

class IndexMailRepo extends RepoInterface<MailModel[]> {
  private static instance: IndexMailRepo;

   
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new IndexMailRepo();
    }
    return this.instance;
  }

  override get hasPagination(): boolean {
    return true;
  }

  onParse(data: any): MailModel[] {
    return data.map((item: any) => MailModel.fromMap(item));
  }

  get serviceInstance(): ServicesInterface {
    return IndexMailApiService.getInstance();
  }
}

export { IndexMailRepo };
