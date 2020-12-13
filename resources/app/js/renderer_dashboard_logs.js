const { remote } = require('electron');
var fs = require('fs');
const readline = require('readline');
var server = remote.getGlobal('sharedObject').server;

const app = remote.app;

let documents = app.getPath('documents');

async function processLineByLine() {
    const fileStream = fs.createReadStream(documents + '/MCSM/' + server + '/logs/latest.log', 'utf8');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      $('#logs').append('<br/>'+line)
    }
  }

  $('#btn-down').click(function(){
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
});
  
processLineByLine();