import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import fileDownload from "js-file-download";
//import db from "../../db/accordianReview.json";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { BlobServiceClient, Create } from "@azure/storage-blob";
import { Line } from "rc-progress";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import Collapsible from "react-collapsible";

import styled from "styled-components";

const Wrap = styled.div`
  margin: 30px 0;
  /**
   * Overwrite the contentInner padding + border
   * to ensure zero height.
   */
  .Collapsible__contentInner {
    padding: 0;
    border: 0;
  }
`;

const Title = styled.p`
  color: white;
  margin-bottom: 15px;
`;

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#fff",
  borderStyle: "dashed",
  /*backgroundColor: "#fafafa",*/
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const AccordianReview = () => {
  const [file, setFile] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [fileName, setFileName] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [listBlobFiles, setListBlobFiles] = useState([]);
  const fileRef = useRef();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    uploadFile2(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ noClick: true, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    const loadBlobFiles = async () => {
      let storageAccountName = "ereviewvirtualmachinesdi";
      let sasToken =
        "sv=2021-06-08&ss=b&srt=sco&sp=rwdlaciyx&se=2022-12-31T02:54:45Z&st=2022-12-15T18:54:45Z&spr=https&sig=kej5sk1QOKm6h3H8DfCn8s2HJ6Au7bNeBscI99UHJ8k%3D";
      const containerName = "files";
      const blobServiceClient = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
        //https://ereviewvirtualmachinesdi.blob.core.windows.net/files/GetFolders.json
      );

      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      let blobs = containerClient.listBlobsFlat();
      let i = 1;
      const listFiles = [];
      for await (const blob of blobs) {
        listFiles.push(blob.name);
      }
      setListBlobFiles(listFiles);
    };

    loadBlobFiles();

    /*
    let i = 1;
    for await (const blob of blobs) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    */
  }, []);

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  const data = [
    {
      title: "1535 (Asgard Walnut) - Overview",
      content: "Lorem ipsum dolor sit amet.",
    },
    { title: "Iteration 1", content: "Lorem ipsum dolor sit amet." },
    { title: "Iteration 2", content: "Lorem ipsum dolor sit amet." },
    { title: "Iteration 3", content: "Lorem ipsum dolor sit amet." },
    { title: "Iteration 4", content: "Lorem ipsum dolor sit amet." },
  ];

  const uploadFile2 = async (files) => {
    let storageAccountName = "ereviewvirtualmachinesdi";
    let sasToken =
      "sv=2021-06-08&ss=b&srt=sco&sp=rwdlaciyx&se=2022-12-31T02:54:45Z&st=2022-12-15T18:54:45Z&spr=https&sig=kej5sk1QOKm6h3H8DfCn8s2HJ6Au7bNeBscI99UHJ8k%3D";
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    const containerClient = blobService.getContainerClient("files");
    await containerClient.createIfNotExists({ access: "container" });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setShowProgress(true);
      setFileName(file.name);
      const blobClient = containerClient.getBlockBlobClient(
        `testFolder2/${file.name}`
      );
      const options = {
        blobHTTPHeaders: { blobContentType: file.type },
        onProgress: (ev) => {
          const { loadedBytes } = ev;
          const total = file.size;
          let percent = Math.floor((loadedBytes * 100) / total);
          setPercentage(percent);
          if (percent >= 100) {
            setShowProgress(false);
            setPercentage(0);
            setFileName("");
          }
          /*
          console.log(
            `${ev.loadedBytes} bytes of ${total} bytes | ${percent}%`
          );
          */
        },
      };
      await blobClient.uploadBrowserData(file, options);
    }

    let blobs = containerClient.listBlobsFlat();
    let i = 1;
    const listFiles = [];
    for await (const blob of blobs) {
      listFiles.push(blob.name);
    }
    setListBlobFiles(listFiles);
    fileRef.current.value = "";
    setFile(null);
  };

  const uploadFile = async () => {
    let storageAccountName = "ereviewvirtualmachinesdi";
    let sasToken =
      "sv=2021-06-08&ss=b&srt=sco&sp=rwdlaciyx&se=2022-12-31T02:54:45Z&st=2022-12-15T18:54:45Z&spr=https&sig=kej5sk1QOKm6h3H8DfCn8s2HJ6Au7bNeBscI99UHJ8k%3D";
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    const containerClient = blobService.getContainerClient("files");
    await containerClient.createIfNotExists({ access: "container" });

    const blobClient = containerClient.getBlockBlobClient(
      `testFolder/${file.name}`
    );

    const options = { blobHTTPHeaders: { blobContentType: file.type } };
    await blobClient.uploadBrowserData(file, options);

    let blobs = containerClient.listBlobsFlat();
    let i = 1;
    const listFiles = [];
    for await (const blob of blobs) {
      listFiles.push(blob.name);
    }
    setListBlobFiles(listFiles);
    fileRef.current.value = "";
    setFile(null);
  };

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const downloadFile = async () => {
    let storageAccountName = "ereviewvirtualmachinesdi";
    let sasToken =
      "sv=2021-06-08&ss=b&srt=sco&sp=rwdlaciyx&se=2022-12-31T02:54:45Z&st=2022-12-15T18:54:45Z&spr=https&sig=kej5sk1QOKm6h3H8DfCn8s2HJ6Au7bNeBscI99UHJ8k%3D";
    const containerName = "files";
    const blobName = "GetFolders.json";
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      //https://ereviewvirtualmachinesdi.blob.core.windows.net/files/GetFolders.json
    );

    handleDownload(
      "https://ereviewvirtualmachinesdi.blob.core.windows.net/files/83795792_4078149198877361_2925599187934380032_n.jpg",
      "FOTO-AZURE.jpg"
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // Get blob content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blobClient.download();

    const downloaded = await blobToString(
      await downloadBlockBlobResponse.blobBody
    );
    console.log("Downloaded blob content", downloaded);

    // [Browsers only] A helper method used to convert a browser Blob into string.
    async function blobToString(blob) {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
          resolve(ev.target.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
      });
    }
  };

  const renderListFiles = () => {
    const list = listBlobFiles.map((file, i) => {
      return (
        <li key={i}>
          <button
            className="text-[#233f78] hover:text-blue"
            onClick={() =>
              handleDownload(
                `https://ereviewvirtualmachinesdi.blob.core.windows.net/files/${file}`,
                file
              )
            }
          >
            {file}
          </button>
        </li>
      );
    });

    return <ul>{list}</ul>;
  };

  const lineProperties = {
    strokeWidth: 1,
    strokeColor: "#233f78",
  };

  return (
    <section className="AccordianReviewPage">
      <h1>Accordian Review</h1>
      <br />
      {
        <Accordion
          transition={{
            duration: "300ms",
            timingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          }}
        >
          {data.map((item, index) => (
            <AccordionItem key={index}>
              {({ open }) => (
                <>
                  <AccordionHeader className="w-full flex justify-between items-center text-gray-600 border-b p-4">
                    <h3
                      className={`accordion-title ${
                        open ? "accordion-active" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                    <svg
                      className={`w-6 h-6 ${!open ? "" : "rotate-90"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </AccordionHeader>

                  <AccordionBody>
                    <div className="accordion-body">
                      {index === 4 && (
                        <div className="bodyContainer">
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <br />
                              <h2>In Progress...</h2>
                              {/*<br />
                              <input
                                onChange={(e) => {
                                  setFile(e.target.files[0]);
                                }}
                                type="file"
                                ref={fileRef}
                              />
                              <br />
                              <button
                                className="bg-[#233f78] hover:bg-blue-900 text-white text-center mt-4"
                                style={{ width: 300 }}
                                onClick={() => {
                                  uploadFile();
                                }}
                              >
                                Upload File
                              </button>*/}
                            </div>
                            <div>
                              <br />
                              Comments here
                            </div>
                            <div>
                              <div>
                                <div className="container">
                                  <div {...getRootProps({ style })}>
                                    <input {...getInputProps()} />
                                    <h2>List Files:</h2>
                                    {renderListFiles()}
                                    <div className="drop-files-notification">
                                      Drop files here
                                    </div>
                                    {showProgress && (
                                      <div className="line-container mt-2">
                                        <div className="line-content">
                                          <Line
                                            percent={percentage}
                                            {...lineProperties}
                                          />
                                          <span style={{ fontSize: 10 }}>
                                            {fileName}
                                          </span>
                                        </div>
                                        <div className="percentage">
                                          {percentage}%
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionBody>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      }
    </section>
  );
};

export default AccordianReview;
