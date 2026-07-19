import { useToast } from 'primevue';
import { ref } from 'vue';

export const CustomToast = <T>(draftType: string) => {
  const formData = ref<T | null>(null);

  if (!localStorage.getItem(draftType)) return formData;

  const toast = useToast();
  toast.add({
    severity: 'info',
    summary: 'Get Data From Drafts',
    detail: 'Click here to get data from drafts',
    life: 5000,
  });

  const observer = new MutationObserver(() => {
    const toastDialog = document.querySelector('.p-toast .p-toast-message-text');
    if (toastDialog && !toastDialog.querySelector('.return-btn')) {
      const BtnsContainer = document.createElement('div');
      const SaveDatabutton = document.createElement('button');
      const ClearDatabutton = document.createElement('button');

      BtnsContainer.className = 'return-btn-container';
      BtnsContainer.style.display = 'flex';
      BtnsContainer.style.gap = '10px';
      BtnsContainer.style.justifyContent = 'space-between';

      SaveDatabutton.innerText = 'Return to Form';
      ClearDatabutton.innerText = 'Clear Data';

      SaveDatabutton.className = 'return-btn';
      ClearDatabutton.className = 'return-btn';

      SaveDatabutton.onclick = () => {
        formData.value = JSON.parse(localStorage.getItem(draftType) || '{}');
        toast.removeAllGroups();
      };

      ClearDatabutton.onclick = () => {
        localStorage.removeItem(draftType);
        toast.removeAllGroups();
      };

      BtnsContainer.appendChild(SaveDatabutton);
      BtnsContainer.appendChild(ClearDatabutton);
      toastDialog.appendChild(BtnsContainer);
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return formData;
};
