import { Component, OnInit } from '@angular/core';
import { MixingService } from 'app/data/service/mixing.service';

@Component({
  selector: 'app-batch-history',
  templateUrl: './batch-history.component.html',
  styleUrls: ['./batch-history.component.css']
})
export class BatchHistoryComponent implements OnInit {

  batchHistory: any[];

  constructor(private service: MixingService) { }

  ngOnInit(): void {
    this.service.getBatchHistory().subscribe(res => {
      this.batchHistory = res;          
    })
  }

}
