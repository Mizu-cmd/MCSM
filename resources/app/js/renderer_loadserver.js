var fs = require('fs');

const { remote } = require('electron');
const app = remote.app;
const { dialog } = require('electron').remote

let documents = app.getPath('documents');

$(document).ready(function(){
    $('#search').on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $('#servers div').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

fs.readdir(documents + '/MCSM/', function (err, files){
    if (err !== null) {
        console.log(err)
        return;
    }

    if (files.length == 0) {
        $('#servers').append($('<div class="row"></div>').append($('<div class="col mt-3 p-3 border border-stylish rounded mb-0 special-color-dark text-center animated fadeIn faster"></div>').text("You dont have any server yet :(")));
        return;
    }

    files.forEach(function (file){
        var div = '<div class="row"><div class="col mt-3 p-3 border border-stylish rounded mb-0 special-color-dark animated fadeIn faster"><button type="button" server="'+file+'" class="btn btn-danger float-right btn-sm btn-delete">Delete</button><button type="button" server="'+file+'" class="btn btn-mdb-color float-right btn-sm btn-rename">Rename</button><button type="button" server="'+file+'" class="btn btn-success float-right btn-sm btn-launch">Launch</button><p>'+file+'</p></div></div>';
        $('#servers').append(div);
    })
})

$('.btn-launch').on('click', () => {
  launch()
});
$(document).on('click', '.btn-rename',(e) => {
  rename(documents + '/MCSM/'+$(e.target).attr('server'), e)
});

$(document).on('click', '.btn-delete',(e) => {
  const options = {
    type: 'question',
    buttons: [ "I'm shure", 'Cancel'],
    title: 'Confirm',
    message: 'Do you realy want to delete the server',
    detail: 'No undo, it gonna be deleted for ever',
  };
  dialog.showMessageBox(null, options).then(result => {
    if (result.response === 0) {
      deleteFolderRecursive(documents + '/MCSM/'+$(e.target).attr('server'))
      location.reload();
    }
  });
});

function launch(file){
}

function rename(oldFile, e){
  if($('#rename-input').length != 0) {
    return;
  }
  $(e.target).append('<input type="text" id="rename-input" class="form-control animated fadeIn"></input>')
  $('#rename-input').focus();
  $('#rename-input').keyup(function(i){
    if(i.keyCode == 13)
    {
        fs.rename(documents + '/MCSM/'+$(e.target).attr('server'), documents + '/MCSM/'+$('#rename-input').val(), function(err){
          if (err){
            console.log(err);
            return;
          }
          location.reload();
        });
    }
});
$('#rename-input').keyup(function(i){
  if(i.keyCode == 27){
    $('#rename-input').remove();
    }
  });
}

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file) {
        var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
    }
};
