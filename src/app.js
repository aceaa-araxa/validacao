import { getSheetData } from "./getSheetData";
import QRCode from 'qrcode'

const canvas = document.getElementById('canvas')
const URL_VALIDACAO = 'https://aceaa-araxa.github.io/validacao?q='

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('q')

if (userId) {
  QRCode.toCanvas(
  canvas,
  URL_VALIDACAO + userId,
  { width: 90 },
  function (error) {
    if (error) console.error(error)
  })
}

window.addEventListener("DOMContentLoaded", (event) => {
  const sheetDataHandler = (sheetData) => {
    if (sheetData && sheetData.length){
      const usuario = sheetData.pop()
      if (usuario) {
        document.getElementById('nome').append(usuario["B"])
        document.getElementById('nascimento').append(usuario["C"])
        document.getElementById('categoria').append(usuario["D"])
        document.getElementById('status').append(usuario["E"] ? "ativo" : "inativo")
      }
    }
    
    //ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE
  };

  // --==== QUERY EXAMPLES ====--
  // --==== USE LETTERS FOR COLUMN NAMES ====--
  //  'SELECT A,C,D WHERE D > 150'
  //  'SELECT * WHERE B = "Potato"'
  //  'SELECT * WHERE A contains "Jo"'
  //  'SELECT * WHERE C = "active" AND B contains "Jo"'
  //  "SELECT * WHERE E > date '2022-07-9' ORDER BY E DESC"

  getSheetData({
    // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
    sheetID: "1--SmowjrppeIYqzrCA5KIoQsIpFWO_QM",
    // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
    sheetName: "usuarios",
    query: `SELECT * WHERE A = "${userId}"`,
    callback: sheetDataHandler,
  });
});
