import { ControllerInterface } from "@/base/persention/Controller/controller_interface";
import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";
import type Params from "@/base/core/Params/params";
import DialogSelector from "@/base/persention/Dialogs/dialog_selector";
import successImage from "@/assets/images/success-offer.png";

import errorImage from "@/assets/images/error.png";
import type MailDetailsModel from "../../Data/models/mail_model";
import EditMailUseCase from "../../Domain/use_case/edit_mail_use_case";
import type { Router } from "vue-router";

export default class EditMailController extends ControllerInterface<MailDetailsModel> {
  private static instance: EditMailController;
  private constructor() {
    super();
  }
  private editMailUseCase = new EditMailUseCase();

  static getInstance() {
    if (!this.instance) {
      this.instance = new EditMailController();
    }
    return this.instance;
  }

  async editMail(params: Params, router: Router) {
    // useLoaderStore().setLoadingWithDialog();
    try {
      const dataState: DataState<MailDetailsModel> =
        await this.editMailUseCase.call(params);
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
        await router.push("/mail");

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
