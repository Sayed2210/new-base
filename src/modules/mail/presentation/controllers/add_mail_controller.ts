import { ControllerInterface } from "@/base/persention/Controller/controller_interface";
import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";
import type Params from "@/base/core/Params/params";
import DialogSelector from "@/base/persention/Dialogs/dialog_selector";
import successImage from "@/assets/images/success-offer.png";

import errorImage from "@/assets/images/error.png";
import AddMailUseCase from "../../Domain/use_case/add_mail_use_case";
import type MailModel from "../../Data/models/mail_model";

export default class AddMailController extends ControllerInterface<MailModel> {
  private static instance: AddMailController;
  private constructor() {
    super();
  }
  private AddMailUseCase = new AddMailUseCase();

  static getInstance() {
    if (!this.instance) {
      this.instance = new AddMailController();
    }
    return this.instance;
  }

  async addMail(params: Params, router: any, draft: boolean = false) {
    // useLoaderStore().setLoadingWithDialog();
    try {
      const dataState: DataState<MailModel> =
        await this.AddMailUseCase.call(params);
      this.setState(dataState);
      if (this.isDataSuccess()) {
        DialogSelector.instance.successDialog.openDialog({
          dialogName: "dialog",
          titleContent: "Added was successful",
          imageElement: successImage,
          messageContent: null,
        });

        // console.log(this.state.value.data)
        // console.log(draft)
        if (!draft) await router.push("/mail");

        // useLoaderStore().endLoadingWithDialog();
      } else {
        DialogSelector.instance.failedDialog.openDialog({
          dialogName: "dialog",
          titleContent: this.state.value.error?.title ?? "An Error Occurred",
          imageElement: errorImage,
          messageContent: null,
        });
        // throw new Error(this.state.value.error?.title)
      }
    } catch (error: any) {
      console.log(this.state.value.message);
      DialogSelector.instance.failedDialog.openDialog({
        dialogName: "dialog",
        titleContent: this.state.value.message,
        // titleContent: 'adssddsasdadsa',
        imageElement: errorImage,
        messageContent: null,
      });
    }

    super.handleResponseDialogs();
    return this.state;
  }
}
