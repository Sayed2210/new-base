import RepoInterface from "@/base/Domain/Repositories/repo_interface";
import type ServicesInterface from "@/base/Data/ApiService/api_service_interface";
import MailDetailsModel from "../../Data/models/mail_model";
import { ShowMailApiService } from "../../Data/api_services/show_mail_api_service";

class ShowMailRepo extends RepoInterface<MailDetailsModel> {
  private static instance: ShowMailRepo;

   
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ShowMailRepo();
    }
    return this.instance;
  }

  // override get hasPagination(): boolean {
  //   return true;
  // }

  onParse(data: any): MailDetailsModel {
    return MailDetailsModel.fromMap(data);
  }

  get serviceInstance(): ServicesInterface {
    return ShowMailApiService.getInstance();
  }
}

export { ShowMailRepo };
