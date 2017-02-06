import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController, ToastController, } from 'ionic-angular';
import { Camera, File, Transfer } from 'ionic-native';
import { LoadingClient } from '../../providers/loading-client';
/*
  Generated class for the RegisterPayment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
let FilePath: any;// = window["IonicNative"].FilePath;
//console.log(window);

@Component({
  selector: 'page-register-payment',
  templateUrl: 'register-payment.html'
})
export class RegisterPaymentPage {
	title_page = 'Registar Pago';
  lastImage: string = null;

  constructor(public navCtrl: NavController,
  public actionSheetCtrl: ActionSheetController,
  public toastCtrl: ToastController,
  public platform: Platform,
  public loading: LoadingClient) {
    platform.ready().then(()=>{
    //I made a plugin for testing...
      console.log("window['pluginTest']: "+ (window['pluginTest'] ? true: false));
      console.log("window['FilePath']: "+ (window['FilePath'] ? true: false));
      FilePath = window['FilePath'];
    })
  }

  public presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select image",
      buttons: [
      {
        text:"Loading from library", 
        handler: ()=>{
          this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text:"Use camera", 
        handler:()=>{
          this.takePicture(Camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: "Cancel", 
        role: "cancel"
      }
    ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType){
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    Camera.getPicture(options).then(imagePath =>{
    //special handling for android library
      if(this.platform.is('android') && sourceType===Camera.PictureSourceType.PHOTOLIBRARY){
      //console.log("FROM PHOTOLIBRARY");
        FilePath.resolveNativePath(imagePath, filePath=>{
        let correctPath = filePath.substr(0, filePath.lastIndexOf('/')+1);
        let currentName = imagePath.substring(imagePath.lastIndexOf('/')+1, imagePath.lastIndexOf('?'));
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
        }, error=>{
          this.presentToast("Error on resolveNativePath()");
          console.log(JSON.stringify(error));
        });
      } else {
        //console.log("FROM CAMERA");
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/')+1);
        let currentName = imagePath.substr(imagePath.lastIndexOf('/')+1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
      }
    }, (err)=> {
      this.presentToast("Error while selecting image");
      console.log(JSON.stringify(err));
    });
  }

  private createFileName(currentName){
    let d = new Date(),
    n = d.getTime();

    return n+currentName.substr(currentName.lastIndexOf('.'));
  }

  private copyFileToLocalDir(namePath, currentName, newFileName){
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
    .then(success =>{
      this.lastImage = newFileName;
    }, error =>{
      this.presentToast("Error while storing file");
    });
  }

  private presentToast(text){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public pathForImage(img){
    if(img == null){
      return '';
    }
    else{
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(){
    let url = "http://path/to/your/uploader/script/on/remote/server";

    let targetPath = this.pathForImage(this.lastImage);

    let fileName = this.lastImage;

    let options = {
      fileKey: "fileUpload",
      fileName: fileName,
      chunkMode: "false",
      mimeType: "multipart/form-data",
      params : {'fileName': fileName}
    };

    const fileTransfer = new Transfer();

    this.loading.showLoadingText('uploading...');

    fileTransfer.upload(targetPath, url, options)
    .then(data=>{
      this.loading.dismiss();
      this.presentToast("Image successfull uploaded");
      //console.log(JSON.stringify(data));
    }, error=>{
      this.loading.dismiss();
      this.presentToast("Error while uploading file");
      //console.log(JSON.stringify(error));
    });
  }
}