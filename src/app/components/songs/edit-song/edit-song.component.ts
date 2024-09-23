import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../../../services/songs.service';

@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-song.component.html',
  styleUrl: './edit-song.component.css'
})
export class EditSongComponent {

  songId = signal('');

  activatedRoute = inject(ActivatedRoute);
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

  ngOnInit(){
    this.activatedRoute.params.subscribe(async params => {
      const songId = params['songId'];
      this.songId.set(songId);
      const song = await this.songsService.getById(songId);
      console.log(song.song)

      // Rellenar el formulario
      delete song.song._id;
      delete song.song.__v
      this.formulario.setValue(song.song);
    });
  }

  async onSubmit() {
    const response = await this.songsService.update(this.songId(), this.formulario.value);
    console.log(response);
  }
}
