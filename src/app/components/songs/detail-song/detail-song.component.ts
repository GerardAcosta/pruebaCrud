import { Component, inject, signal, ɵunwrapWritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../../../services/songs.service';

@Component({
  selector: 'app-detail-song',
  standalone: true,
  imports: [],
  templateUrl: './detail-song.component.html',
  styleUrl: './detail-song.component.css'
})
export class DetailSongComponent {

  activatedRoute = inject(ActivatedRoute);
  songsService = inject(SongsService);

  songData = signal<any>([])

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      // console.log(params['songsId'])
      const songDetail = await this.songsService.getById(params['songsId']);
      this.songData.set(songDetail.song)
    });
  }
}
