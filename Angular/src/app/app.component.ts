import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'imageupload';
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  uploadProgress:  number = 0;
  loading = false;
  uploadError: string | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fireStorage: AngularFireStorage){}

  onFileChange(event: any) {
    this.imageUrl = '';
    this.uploadError = '';
    this.selectedFile = event.target.files[0];
    this.uploadProgress = 0

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result || null;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.uploadError = 'No file selected.';
    }
  }

  uploadFile() {  

    if (this.selectedFile) {

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        this.uploadError = 'Invalid file type. Please select a JPEG, PNG, or GIF image.';
        return;
      }


      this.loading = true;
      const filePath = `images/${Date.now()}_${this.selectedFile.name}`;
      const fileRef = this.fireStorage.ref(filePath); // Corrected reference
      const uploadTask = this.fireStorage.upload(filePath, this.selectedFile); // Corrected reference

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: string) => {
            this.imageUrl = url;
            this.loading = false;
            this.previewUrl = ''
          });
        })
      ).subscribe((snapshot: any) => {
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      });
    } else {
      console.log('No file selected.');
    }
  }
}
