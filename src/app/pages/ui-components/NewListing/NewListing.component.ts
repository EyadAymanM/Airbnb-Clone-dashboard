import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from 'src/app/models/listing';
import { ListingService } from 'src/app/services/listing.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule , MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-NewListing',
  standalone:true,
  imports:[
CommonModule,
MatButtonModule,
MatCardModule,
MatTableModule,
MatIconModule,
MatMenuModule,
MaterialModule,
TranslateModule,
MatPaginatorModule,
  ],
  templateUrl: './NewListing.component.html',
  styleUrls: ['./NewListing.component.css']
})
export class NewListingComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  listings : Listing[] = [];

  pageSize:number = 3;
  pageIndex:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ListingService: ListingService , private router:Router) { }

  ngOnInit() {
    this.getNewListing()
  }

  getNewListing(){
    this.ListingService.getAllListings().subscribe((data: Listing[]) => {
      this.listings = data.filter(listing => listing.verified === false);
      console.log(this.listings);

    });
  }


  goToDetails(id:string):void {
    this.router.navigate(['ui-components/details',id])
  }

  verifayListing(id:string){
    this.ListingService.verifayListing(id).subscribe(()=>{
      alert("verifay successfully")

      this.listings = this.listings.filter(listing => listing._id !== id);
    }, (error: any) => {
    console.error('error verifay', error);
    alert('error verifay');
  });
  }

  deleteroom(id:string):void{
    if(confirm('Are you sure you want to delete this listing?')){
      this.ListingService.deleteListing(id).subscribe(()=>{
        alert('listing deleted successfully')
        this.listings = this.listings.filter(listing =>listing._id !== id)
      }, (error: any)=>{
      console.error('error deleting listing',error);
      alert('There was an error deleting the listing')

    })
    }
  }

  onpagechange(event:PageEvent){
    this.pageSize = event.pageSize
    this.pageIndex= event.pageIndex
  }

  get pageniteListing():Listing[]{
    const start = this.pageIndex * this.pageSize
    return this.listings.slice(start, start + this.pageSize)
  }

}