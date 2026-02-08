import RepoInterface from "@/base/Domain/Repositories/repo_interface";
import type ServicesInterface from "@/base/Data/ApiService/api_service_interface";
import { AddMailApiService } from "../../Data/api_services/add_mail_api_service";
import MailModel from "../../Data/models/mail_model";

class AddMailRepo extends RepoInterface<MailModel> {
  private static instance: AddMailRepo;

   
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AddMailRepo();
    }
    return this.instance;
  }

  override get hasPagination(): boolean {
    return true;
  }

  onParse(data: any): MailModel {
    return MailModel.fromMap(data);
  }

  get serviceInstance(): ServicesInterface {
    return AddMailApiService.getInstance();
  }
}

export { AddMailRepo };
