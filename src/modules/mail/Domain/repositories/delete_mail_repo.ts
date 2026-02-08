import RepoInterface, { ResponseType } from "@/base/Domain/Repositories/repo_interface";
import type ServicesInterface from "@/base/Data/ApiService/api_service_interface";
import MailDetailsModel from "../../Data/models/mail_model";
import { DeleteMailApiService } from "../../Data/api_services/delete_mail_api_service";

class DeleteMailRepo extends RepoInterface<MailDetailsModel> {
  private static instance: DeleteMailRepo;

   
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DeleteMailRepo();
    }
    return this.instance;
  }

  override get hasPagination(): boolean {
    return true;
  }

  override get responseType(): ResponseType {
    return ResponseType.withData;
  }

  onParse(data: any): MailDetailsModel {
    return MailDetailsModel.fromMap(data);
  }

  get serviceInstance(): ServicesInterface {
    return DeleteMailApiService.getInstance();
  }
}

export { DeleteMailRepo };
