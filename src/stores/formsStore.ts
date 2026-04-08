// stores/formsStore.ts
import { defineStore } from "pinia";
import { dialogManager } from "@/base/Presentation/Dialogs/dialog.manager";
import router from "@/router";

export const useFormsStore = defineStore("forms", {
  state: () => ({
    formData: {} as Record<string, any>,
  }),

  actions: {
    setFormData(key: string, data: any) {
      this.formData[key] = data;
    },
    getFormData(key: string) {
      return this.formData[key];
    },
    clearFormData(key: string) {
      delete this.formData[key];
    },
    // Check if the form at a specific key has data
    hasUnsavedChanges(key: string) {
      const data = this.formData[key];
      return data && (data.email !== "" || data.type !== undefined);
    },
    showReturnWarning(targetPath: string) {
      dialogManager.toastInfo("Click here to return to the form", {
        title: "Unsaved Changes",
        duration: 5000,
        onClick: () => {
          console.log("Navigating to:", targetPath);
          router.push(targetPath);
        },
      });
    },
  },
  persist: true,
});
