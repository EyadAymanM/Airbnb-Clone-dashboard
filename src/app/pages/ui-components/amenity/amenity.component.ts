import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material.module';
import { AmenityService } from 'src/app/services/amenity.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtml , DomSanitizer} from '@angular/platform-browser';
import { AmenityFormComponent } from '../AmenityForm/AmenityForm.component';
import { Amenity } from 'src/app/models/amenity';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LanguageService } from 'src/app/services/dir.service';
@Component({
  selector: 'app-amenity',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    NgxPaginationModule,
    SpinnerComponent,
    TranslateModule
  ],
templateUrl: './amenity.component.html',
  styleUrl: './amenity.component.scss'
})
export class AmenityComponent implements OnInit{

  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: any;
  page:any=1;
  loading:boolean=false;

  pageSize: number = 5;
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  isEditing = false;
  editedCategory: Amenity = {} as Amenity;

  currentLang:string="en"

  constructor(private amenityService: AmenityService , private DomSanitizer:DomSanitizer,
     private dialog :MatDialog, private LanguageService:LanguageService){ }


  ngOnInit(): void {
    this.LanguageService.currentLanguage.subscribe((lang)=>{
      this.currentLang = lang
    })
    this.loading=true;
    this.amenityService.getAllAmenitys().subscribe((data)=>{
      this.dataSource1 = data;
      console.log(this.dataSource1);

      this.loading=false;
    })
  }


  getSanitizedSvg(svg:string):SafeHtml{
    return this.DomSanitizer.bypassSecurityTrustHtml(svg)
  }


  AddAmenity(): void {
    const dialogRef = this.dialog.open(AmenityFormComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.amenityService.addAmenity(result).subscribe(
          () => {
            this.ngOnInit();
            Swal.fire({
              title: 'Add!',
              text: 'Amenity added successfully.',
              icon: 'success',
              iconColor: '#e45555',
              confirmButtonText: 'OK',
              confirmButtonColor: '#e45555',
            });
          },
          (error) => {
            console.error('Error adding Amenity', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error adding Amenity',
              icon: 'error',
              iconColor: '#000000',
              confirmButtonText: 'OK',
              confirmButtonColor: '#000000',
            });
          }
        );
      }
    });
  }

  EditAmenity(amenity: Amenity): void {
    console.log(amenity._id);

    const dialogRef = this.dialog.open(AmenityFormComponent, {
      width: '400px',
      data: { ...amenity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        console.log(result._id);

        this.amenityService.editAmenity(result._id, result).subscribe(
          () => {
            this.ngOnInit();
            Swal.fire({
              title: 'update!',
              text: 'Amenity update successfully.',
              icon: 'success',
              iconColor: '#e45555',
              confirmButtonText: 'OK',
              confirmButtonColor: '#e45555',
            });
          },
          (error) => {
            console.error('error update', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error update Amenity',
              icon: 'error',
              iconColor: '#000000',
              confirmButtonText: 'OK',
              confirmButtonColor: '#000000',
            });
          }
        );
      }
    });
  }



  removeAmenity(id:string){

    Swal.fire({
      title: 'Are you sure you want to delete this amenity?',
      customClass: {
        title: 'custom-title',
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e45555',
    }).then((result) => {
      if (result.isConfirmed) {
        this.amenityService.removeAmenity(id).subscribe(()=>{
          this.dataSource1 = this.dataSource1.filter((ele:any)=>ele._id != id)
          Swal.fire({
            title: 'Deleted!',
            text: 'Your amenity has been deleted.',
            icon: 'success',
            iconColor: '#e45555',
            confirmButtonText: 'OK',
            confirmButtonColor: '#e45555',
          });
      })
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'Error!',
          text: 'Error deleting ameity',
          icon: 'error',
          iconColor: '#000000',
          confirmButtonText: 'OK',
          confirmButtonColor: '#000000',
        });
      }
    }).catch((err)=>{
      Swal.fire({
        title: 'Error!',
        icon: 'error',
        iconColor: '#000000',
        confirmButtonText: 'OK',
        confirmButtonColor: '#000000',
      });    });
  }



  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedAmenity(): Amenity[] {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource1.slice(start, start + this.pageSize);
  }

}
