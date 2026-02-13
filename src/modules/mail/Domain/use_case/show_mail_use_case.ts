import type Params from "@/base/core/Params/params";
import type UseCase from "@/base/Domain/UseCase/use_case";
import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";
import type MailDetailsModel from "../../Data/models/mail_model";
import { ShowMailRepo } from "../repositories/show_mail_repo";

export default class ShowMailUseCase
  implements UseCase<MailDetailsModel, Params> {
  async call(params: Params): Promise<DataState<MailDetailsModel>> {
    // console.log(ShowMailRepo.getInstance().call(params) , "usecase");
    return ShowMailRepo.getInstance().call(params);
  }
}
