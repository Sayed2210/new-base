import type Params from "@/base/core/Params/params";
import type UseCase from "@/base/Domain/UseCase/use_case";
import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";
import type MailModel from "../../Data/models/mail_model";
import { IndexMailRepo } from "../repositories/index_mail_repo";

export default class IndexMailUseCase
  implements UseCase<MailModel[], Params> {
  async call(params: Params): Promise<DataState<MailModel[]>> {
    return IndexMailRepo.getInstance().call(params);
  }
}
