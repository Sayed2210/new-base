import type Params from "@/base/core/Params/params";
import { ControllerInterface } from "@/base/persention/Controller/controller_interface";
import TitleInterface from "@/base/Data/Models/title_interface";

abstract class SelectControllerInterface<T> extends ControllerInterface<T> {
  // abstract fetch(params: Params): Promise<Ref<DataState<TitleInterface[]>>>;
  abstract getData(params: Params): any;
  async fetch(params: Params) {
    const data = await this.getData(params);
    const adaptData: any[] = [];
    if (this.isDataSuccess()) {
      (data.value.data ?? []).map((el: any) =>
        adaptData.push(
          new TitleInterface({
            id: el?.id,
            title: el?.title || "",
            subtitle: el?.subtitle || "",
          }),
        ),
      );
    }
    return adaptData;
  }
}

export { SelectControllerInterface };
