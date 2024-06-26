import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { IWalletHistory } from 'src/app/models/common';
import { TableFilterComponent } from '../table-filter/table-filter.component';


@Component({
  selector: 'app-wallet-history',
  standalone:true,
  imports:[
    CommonModule,
    TableFilterComponent
  ],
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.css']
})
export class WalletHistoryComponent {

  @Input() walletHistory:IWalletHistory[] =[];
  @Input() transCount:number =10;

  @Output() pageChange = new EventEmitter<number>()
  @Output() itemsPerPageChange = new EventEmitter<number>()

  currPage =1
  itemsPerPage =10

  onPageChange(page: number):void{
    this.currPage = page
    this.pageChange.emit(page);
  }

  onItemsPerPageChange(itemsPerPage:number){
    this.itemsPerPage = itemsPerPage;
    this.currPage = 1;
    this.itemsPerPageChange.emit(itemsPerPage);
  }
}
