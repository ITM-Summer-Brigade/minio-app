`use strict`;

const submitFileBtn = document.querySelector(".fileSubmit");
const uploadFileBtn = document.querySelector(".fileInfo");
const fileInfo = document.querySelector(".fileInfo");
const reader = new FileReader();

const handleFiles = async (e) => {
  let file = e.target.files[0];
  console.log(file);
  if (!e.target.files) {
    console.log("No files available in the list");
  }
  const fileStream = await file.arrayBuffer();
  console.log(fileStream);

  const viewer = document.querySelector(".view");
  const obj_url = URL.createObjectURL(file);
  viewer.setAttribute("src", obj_url);
  URL.revokeObjectURL(obj_url);
};

// IGNORE - TEST CODE FOR TRYING TO STORE DATA IN INDEXDB
// -------------------
// const req = window.indexedDB.open("testdb", 3);
// req.onupgradeneeded = (event) => {
//   const db = event.target.result;

//   if (!db) {
//     console.log(
//       "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
//     );
//   }
//   console.log(db);

//   // create object store
//   const objectStore = db.createObjectStore("files", { keyPath: "fileInfo" });

//   objectStore.transaction.oncomplete = (event) => {
//     const fileObjectStore = db
//       .transaction("files", "readwrite")
//       .objectStore("files");
//   };
// };

submitFileBtn.addEventListener("click", async (e) => {
  let file;
  e.preventDefault();
  console.log("Button clicked!");
  file = fileInfo.files[0];

  const fileStream = await file.arrayBuffer();
  console.log(fileStream);
  const formData = new FormData();
  formData.append("file", file);
  console.log(file);

  const res = await postFileData(formData);
  console.log(res);
});

const postFileData = async (formData) => {
  const data = {
    bucketName: "testdevbucket",
    fileName: uploadFileBtn.files[0].name,
  };
  const res = await fetch("http://192.168.172.78:3005/api/files", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: formData,
  });
  return res.json();
};

uploadFileBtn.addEventListener("change", handleFiles);
