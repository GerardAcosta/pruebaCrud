import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { SongsService } from '../../../services/songs.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-songs-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.css'
})
export class SongsListComponent {

  arrSongs = signal<any[]>([])

  songsService = inject(SongsService);

  async ngOnInit() {
    const songs = await this.songsService.getAll();
    console.log(songs)
    this.arrSongs.set(songs);
  }

  async onClickBorrar(songId: string) {
    const response = await this.songsService.deleteById(songId);
    console.log(response);

    if(!response.error){
      const songs = await this.songsService.getAll();
      this.arrSongs.set(songs);
    };
 
  }

}
