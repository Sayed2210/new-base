import { ControllerInterface } from "@/base/persention/Controller/controller_interface";
import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";
import type Params from "@/base/core/Params/params";
import DialogSelector from "@/base/persention/Dialogs/dialog_selector";
import successImage from "@/assets/images/success-offer.png";

import errorImage from "@/assets/images/error.png";
import type MailDetailsModel from "../../Data/models/mail_model";
import DeleteMailUseCase from "../../Domain/use_case/delete_mail_use_case";

export default class DeleteMailController extends ControllerInterface<MailDetailsModel> {
  private static instance: DeleteMailController;
  private constructor() {
    super();
  }
  private deleteMailUseCase = new DeleteMailUseCase();

  static getInstance() {
    if (!this.instance) {
      this.instance = new DeleteMailController();
    }
    return this.instance;
  }

  async DeleteMail(params: Params) {
    // useLoaderStore().setLoadingWithDialog();
    this.setLoading();
    try {
      const dataState: DataState<MailDetailsModel> =
        await this.deleteMailUseCase.call(params);
      this.setState(dataState);
      if (this.isDataSuccess()) {
        DialogSelector.instance.successDialog.openDialog({
          dialogName: "dialog",
          titleContent: "Deleted successfully",
          imageElement: successImage,
          messageContent: null,
        });

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
      console.log(this.state.value.message);
      DialogSelector.instance.failedDialog.openDialog({
        dialogName: "dialog",
        titleContent: this.state.value.message,
        // titleContent: 'adssddsasdadsa',
        imageElement: errorImage,
        messageContent: this.state.value.message,
      });
    }

    super.handleResponseDialogs();
    return this.state;
  }
}
