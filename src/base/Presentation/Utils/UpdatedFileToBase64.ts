async function toBase64(input: any) {
  if (typeof input === 'string' && input.startsWith('data:')) {
    return input;
  }

  // URL string → fetch → base64
  if (typeof input === 'string') {
    const res = await fetch(input);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const blob = await res.blob();
    return blobToBase64(blob);
  }

  // File or Blob
  return blobToBase64(input);
}

function blobToBase64(blob: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export { toBase64 };
