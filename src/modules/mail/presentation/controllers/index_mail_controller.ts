import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";
import type Params from "@/base/core/Params/params";
import { SelectControllerInterface } from "@/base/persention/Controller/select_controller_interface";
import IndexMailUseCase from "../../Domain/use_case/index_mail_use_case";
import type MailModel from "../../Data/models/mail_model";

export default class IndexMailController extends SelectControllerInterface<
  MailModel[]
> {
  private static instance: IndexMailController;
  private constructor() {
    super();
  }
  private indexMailUseCase = new IndexMailUseCase();

  static getInstance() {
    if (!this.instance) {
      this.instance = new IndexMailController();
    }
    return this.instance;
  }

  async getData(params: Params) {
    // useLoaderStore().setLoadingWithDialog();
    // console.log(params)
    this.setLoading();
    this.setLoading();

    const dataState: DataState<MailModel[]> =
      await this.indexMailUseCase.call(params);

    console.log(dataState.data);

    this.setState(dataState);
    if (this.isDataSuccess()) {
      // useLoaderStore().endLoadingWithDialog();
    } else {
      throw new Error("Error while addServices");
    }
    super.handleResponseDialogs();
    return this.state;
  }


}
