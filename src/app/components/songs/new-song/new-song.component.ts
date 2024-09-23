import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SongsService } from '../../../services/songs.service';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css'
})
export class NewSongComponent {
  // formulario: FormGroup;

  songsService = inject(SongsService);

  formulario = new FormGroup({
    title: new FormControl(),
    artist: new FormControl(),
    genre: new FormControl(),
    album: new FormControl(),
    duration: new FormControl(),
    year: new FormControl(),
    trackNumber: new FormControl(),
    isExplicit: new FormControl()
  });

  async onSubmit() {
    const response = await this.songsService.create(this.formulario.value);
    console.log(response);
  }
}
