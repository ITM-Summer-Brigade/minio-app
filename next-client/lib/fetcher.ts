export const devUrl = "http://192.168.172.86:3005";

export const fetchClassInfo = async (className: string) => {
  const res = await fetch(`${devUrl}/class/${className}`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res.json();
};

export const getClassrooms = async () => {
  const res = await fetch(`${devUrl}/class`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res.json();
};

export const getFileByClass = async (className: string | string[]) => {
  const res = await fetch(`${devUrl}/class/${className}/files`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res.json();
};

export async function postFileData(formData: any) {
  const res = await fetch(`${devUrl}/files`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: formData,
  });
  return res.json();
}

export const getBucketInfo = async (bucketId: number) => {
  const res = await fetch(`${devUrl}/bucket/${bucketId}`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res.json();
};

export const getFiles = async () => {
  const res = await fetch(`${devUrl}/files`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res.json();
};
export const getFileData = async (bucketName: string, fileName: string) => {
  console.log(bucketName, fileName);
  const res = await fetch(
    `${devUrl}/files/search?bucketName=${bucketName}&fileName=${fileName}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.json();
};

export async function handleFiles(e: any) {
  let files = e.target.files;

  if (!files) {
    console.log("No files available in the list");
  }
  const firstFile = files[0];
  const fileStream = await firstFile.arrayBuffer();
  console.log(fileStream);

  const viewer = document.querySelector(".view");
  if (!viewer) {
    return;
  }
  const obj_url = URL.createObjectURL(firstFile);
  viewer.setAttribute("src", obj_url);
  URL.revokeObjectURL(obj_url);
}
