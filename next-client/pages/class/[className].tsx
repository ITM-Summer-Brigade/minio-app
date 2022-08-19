import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import {
  fetchClassInfo,
  getBucketInfo,
  getClassrooms,
  getFileByClass,
  getFileData,
  getFiles,
  handleFiles,
  postFileData,
} from "../../lib/fetcher";

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const classInfo = await fetchClassInfo(params.className as string);

  const files = await getFiles();
  return {
    props: {
      classInfo,
      files,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const classes = await getClassrooms();

  const paths = classes.map((classroom: any) => {
    return {
      params: {
        className: classroom.className,
      },
    };
  });

  return {
    paths: paths || [],
    fallback: false,
  };
};

const Class: NextPage<{ classInfo: any; files: any }> = ({
  classInfo,
  files,
}) => {
  const router = useRouter();
  const className = router.query.className;

  const handleSubmit = async (e: any) => {
    let file;
    e.preventDefault();
    const fileInfo = document.querySelector("#fileInfo") as HTMLInputElement;
    file = fileInfo.files[0];
    const bucket = await getBucketInfo(classInfo.bucketId);

    const fileStream = await file.arrayBuffer();
    console.log(fileStream);
    const formData = new FormData();
    formData.append("file", file);

    formData.append("bucketName", bucket.bucketName);
    console.log(file);

    const res = await postFileData(formData);
    console.log(res);
  };

  const getFile = async (fileName: any) => {
    console.log("retrieving file...");
    const bucket = await getBucketInfo(classInfo.bucketId);

    const foundFile = await getFileData(bucket.bucketName, fileName);
    console.log(foundFile);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center m-10">
        <h1 className="font-bold text-3xl ">
          Welcome to {classInfo.className}
        </h1>
        <h2 className="font-semibold text-md">
          Current Teacher is: {classInfo.teacherName}
        </h2>

        <h2 className="text-3xl font-bold mt-10">Files</h2>
        {files.length ? (
          files.map((file: any) => {
            return (
              <a
                className="cursor-pointer underline text-blue-500"
                key={file.id}
                onClick={() => {
                  getFile(file.fileName);
                }}
              >
                {file.fileName}
              </a>
            );
          })
        ) : (
          <p> {files.message}</p>
        )}

        <form className="flex flex-col m-5" encType="multipart/form-data">
          <label className="font-bold my-3 text-md text-center" htmlFor="file">
            Choose a file to upload:
          </label>
          <input
            type="file"
            className="border rounded"
            name="file"
            id="fileInfo"
            onChange={handleFiles}
            accept="image/*, .pdf"
          />
          <button
            className="border font-bold mt-2 border-black rounded-md bg-black text-white px-2 py-1"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </main>
    </>
  );
};

export default Class;
