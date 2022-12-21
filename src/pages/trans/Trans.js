import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import styles from "./Trans.module.scss";
import Card from "../../components/card/Card";

import { FaTimes, FaUserCircle } from "react-icons/fa";

import languages_list from "../../data/languages";
import "./trans.css";

import { Group, Stack, Text, Image, Progress, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { createWorker } from "tesseract.js";

import { toast } from "react-toastify";

import copyimage from "../../assets/copy.png";
import axios from "axios";
import {
  BALANCE_STATUS_SET,
  BALANCE_STATUS_UNSET,
  selectBalanceStatus,
} from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Trans = () => {
  const dispatch = useDispatch();

  const yourBalanceOkay = useSelector(selectBalanceStatus);

  console.log("balanvvce state is-", yourBalanceOkay);

  const [imageData, setImageData] = useState(null);
  const loadFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  };

  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("idle");
  const [ocrResult, setOcrResult] = useState("");
  const [translated, setTranslated] = useState(false);
  const [translatedData, setTranslatedData] = useState("");

  const workerRef = useRef(null);

  const ree = async () => {
    workerRef.current = await createWorker({
      logger: (message) => {
        if ("progress" in message) {
          setProgress(message.progress);
          setProgressLabel(message.progress === 1 ? "Done" : message.status);
        }
      },
    });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.data.token) {
      // for Node.js Express back-end
      console.log(user.data.token);
    } else {
      console.log("no token");
    }

    ree();

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const handleExtract = async () => {
    //setTextResult("");

    if (!yourBalanceOkay) {
      toast.success("Your Balance is lOw and contact the system Provider");
      return;
    }
    setOcrResult("");
    setProgress(0);
    setProgressLabel("starting");

    const worker = workerRef.current;
    //await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const response = await worker.recognize(imageData);

    setOcrResult(response.data.text);
    console.log(response.data);

    const numberofChars = response.data.text.length;
    console.log("number scan of chars-", numberofChars);

    // ("/FHist/:id/:token/:servicecategory/:numberofchars");

    const histdata = {
      id: "1234",
      token: "acsvssfs4353635vdfv",
      servicecategory: "sasasaas",
      numberofchars: 430,
    };

    const res = await axios.post(
      "https://translateapi2-sagni-amsalu.onrender.com/api/clients/FHist",
      histdata
    );
    console.log(res.data);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  const helloo = () => {
    if (!selectedImage) return;

    (async () => {
      const worker = await createWorker();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(selectedImage);
      console.log(text);
      setTextResult(text);
      await worker.terminate();

      sendhistory("63a0be2ce6ebe59ee34d3b25", text.length);
    })();

    console.log("completed conversion!");
  };

  useEffect(() => {
    console.log("now changed here!");
    //convertImageToText();
    helloo();
  }, [selectedImage]);

  const handleChangeImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  };

  useEffect(() => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");
    const exchangeIcon = document.querySelector(".exchange");
    const selectTag = document.querySelectorAll("select");
    const icons = document.querySelector(".row i");
    const translateBtn = document.querySelector(".button");
    const copyIcon = document.querySelector("#copy-text");
    const converted_text = document.querySelector(".to-text");

    selectTag.forEach((tag, id) => {
      //console.log(tag);

      for (let i = 0; i < languages_list.length; i++) {
        var selected = languages_list[i].code == "en" ? "selected" : "";
        let value = languages_list[i].code;
        let text = languages_list[i].name;
        let option = `<option ${selected} value=${value}>${text}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }

      //   for (let language in languages_list) {
    });

    exchangeIcon.addEventListener("click", () => {
      // console.log("now clicked");

      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = fromText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempText;
    });

    fromText.addEventListener("keyup", () => {
      if (!fromText.value) {
        toText.value = "";
      }
    });

    copyIcon.addEventListener("click", () => {
      copyIcon.setAttribute("title", "Copied.");
      setTimeout(() => {
        copyIcon.setAttribute("title", "Copy text.");
      }, 2000);

      if (converted_text.value != "") {
        navigator.clipboard.writeText(converted_text.value);
      }
    });

    translateBtn.addEventListener("click", () => {
      if (!yourBalanceOkay) {
        toast.success("Your Balance is lOw and contact the system Provider");
        return;
      }

      setTranslated(false);

      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;

      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating....");

      sendhistory("63a20a1fd6b1acfff083b6c7", text.length);
    });
  }, []);

  const sendhistory = async (servicecat, numbchars) => {
    const userr = localStorage.getItem("user");
    const user = JSON.parse(userr);

    console.log("hist is-", user);
    console.log("the user id-", user.data.userID);

    const histdata = {
      servicecategory: servicecat,
      title: "for service",
      data: "you are paying for",
      numberofchars: numbchars,
      userID: user.data.userID,
    };

    const res = await axios.post(
      "https://translateapi2-sagni-amsalu.onrender.com/api/clients/FHist",
      histdata
    );

    console.log("to update-", res.data.data.latestBalance);
    // latestBalance
    if (res.data.data.latestBalance > 0) {
      dispatch(BALANCE_STATUS_SET());
    } else if (res.data.data.latestBalance <= 0) {
      dispatch(BALANCE_STATUS_UNSET());
    }

    console.log("after adding data", res.data);
  };

  return (
    <>
      <Group align="initial" style={{ padding: "10px" }}>
        <Stack style={{ flex: "1" }}>
          <Dropzone
            onDrop={(files) => loadFile(files[0])}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
          >
            {() => (
              <Text size="xl" inline style={{ color: "black" }}>
                Drag image here or click to select file
              </Text>
            )}
          </Dropzone>

          {!!imageData && <Image src={imageData} style={{ width: "100%" }} />}
        </Stack>

        <Stack style={{ flex: "1" }}>
          <Button
            disabled={!imageData || !workerRef.current}
            onClick={handleExtract}
            style={{ background: "#111" }}
          >
            Extract
          </Button>

          <Text>{progressLabel.toUpperCase()}</Text>
          <Progress value={progress * 100} />

          {/* {!!ocrResult && (
              <Stack>
                <Text size="xl">RESULT</Text>
                <Text
                  style={{
                    fontFamily: "monospace",
                    background: "black",
                    padding: "10px",
                  }}
                >
                  {ocrResult}
                </Text>
              </Stack>
            )} */}
        </Stack>
      </Group>

      <div className="container">
        <div className="wrapper">
          <div className="text-input">
            <textarea
              spellCheck="false"
              className="from-text"
              placeholder="Enter Text"
              value={ocrResult}
              onChange={(e) => setOcrResult(e.target.value)}
            ></textarea>

            <textarea
              readOnly
              spellCheck="false"
              className="to-text"
              placeholder="Translation"
            ></textarea>
          </div>

          <ul className="controls">
            <li className="row from">
              {/* <div className="icons">
                  <i id="from" className="fas fa-volume-up"></i>
                  <i id="from" className="fas fa-copy"></i>
                </div> */}
              <select className="select"></select>
            </li>
            <li className="exchange">
              {/* <i className="fas fa-exchange-alt" /> */}
              <FaUserCircle size={26} />
            </li>

            {/* {translatedData?.length > 0 && ( */}
            <li className="row to">
              <div
                className="tooltip"
                title="Copy text."
                id="copy-text"
                style={{ background: "#cfbe55" }}
              >
                {!!translated && (
                  <Image
                    className="img"
                    src={copyimage}
                    style={{ width: "30px" }}
                  />
                )}
              </div>

              <select></select>
              {/* <div className="icons">
                  <i id="to" className="fas fa-volume-up" />
                  <i id="to" className="fas fa-copy" />
                </div> */}
            </li>
            {/* )} */}
          </ul>
        </div>

        <button className="button">Translate Text</button>
      </div>
    </>
  );
};

export default Trans;
//export default { Trans };
