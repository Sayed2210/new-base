import { ControllerInterface } from "@/base/persention/Controller/controller_interface";
import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";
import type Params from "@/base/core/Params/params";

import type MailDetailsModel from "../../Data/models/mail_model";
import ShowMailUseCase from "../../Domain/use_case/show_mail_use_case";

export default class ShowMailController extends ControllerInterface<MailDetailsModel> {
  private static instance: ShowMailController;
  private constructor() {
    super();
  }
  private showMailUseCase = new ShowMailUseCase();

  static getInstance() {
    if (!this.instance) {
      this.instance = new ShowMailController();
    }
    return this.instance;
  }

  async ShowMail(params: Params) {
    // useLoaderStore().setLoadingWithDialog();
    this.setLoading();
    try {
      const dataState: DataState<MailDetailsModel> =
        await this.showMailUseCase.call(params);
      console.log(dataState, "dataState");
      this.setState(dataState);
      // this.setLoading();
      if (this.isDataSuccess()) {
        // DialogSelector.instance.successDialog.openDialog({
        //   dialogName: "dialog",
        //   titleContent: "Added was successful",
        //   imageElement: successImage,
        //   messageContent: null,
        // });

        // console.log(this.state.value.data)
        // console.log(draft)
        // if (!draft) await router.push("/users/employees");

        // useLoaderStore().endLoadingWithDialog();
      } else {
        // DialogSelector.instance.failedDialog.openDialog({
        //   dialogName: "dialog",
        //   titleContent: this.state.value.error?.title ?? "An Error Occurred",
        //   imageElement: errorImage,
        //   messageContent: null,
        // });
        // throw new Error(this.state.value.error?.title)
      }
    } catch (error: any) {
      // console.log(this.state.value.message);
      // DialogSelector.instance.failedDialog.openDialog({
      //   dialogName: "dialog",
      //   titleContent: this.state.value.message,
      //   // titleContent: 'adssddsasdadsa',
      //   imageElement: errorImage,
      //   messageContent: null,
      // });
    }

    super.handleResponseDialogs();

    console.log(this.state.value, "state");
    return this.state;
  }
}
