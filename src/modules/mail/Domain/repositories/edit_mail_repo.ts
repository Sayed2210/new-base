import RepoInterface from "@/base/Domain/Repositories/repo_interface";
import type ServicesInterface from "@/base/Data/ApiService/api_service_interface";
import { EditMailApiService } from "../../Data/api_services/edit_mail_api_service";
import MailDetailsModel from "../../Data/models/mail_model";

class EditMailRepo extends RepoInterface<MailDetailsModel> {
  private static instance: EditMailRepo;

   
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EditMailRepo();
    }
    return this.instance;
  }

  override get hasPagination(): boolean {
    return true;
  }

  onParse(data: any): MailDetailsModel {
    return MailDetailsModel.fromMap(data);
  }

  get serviceInstance(): ServicesInterface {
    return EditMailApiService.getInstance();
  }
}

export { EditMailRepo };
