export default function readFileBlobAsText(fileBlob) {
  const reader = new FileReader();

  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => resolve(e.target.error);
  });

  reader.readAsText(fileBlob);

  return promise;
}
