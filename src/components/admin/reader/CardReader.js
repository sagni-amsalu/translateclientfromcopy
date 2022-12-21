import React, { useState } from "react";

//const { NFC } = require("nfc-pcsc");
//import { NFC } from "nfc-pcsc/src";
//import { NFC } from "nfc-pcsc";
//import { NFC } from "nfc-pcsc";

const CardReader = () => {
  //const nfc = new NFC();

  const [readTag, setReadTag] = useState(undefined);

  //   nfc.on("reader", (reader) => {
  //     console.log(`${reader.reader.name}  device attached`);

  //     const pageNumber = 4;
  //     const bufferLength = 48;

  //     reader.on("card", (card) => {
  //       console.log(`${reader.reader.name}  card detected`, card);
  //       reader.read(pageNumber, bufferLength).then((data) => {
  //         const extractedPayload = data.toString().split("/")[1];
  //         setReadTag(extractedPayload);
  //       });
  //     });
  //   });

  return <div>CardReader</div>;
};

export default CardReader;
