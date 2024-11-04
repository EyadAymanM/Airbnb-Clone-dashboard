import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import {listingComponent} from './listing/listing.component'
import { RoomDetailsComponent } from './RoomDetails/RoomDetails.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AmenityComponent } from './amenity/amenity.component';
import { CategoryComponent } from './category/category.component';
import { ReservationsComponent } from './reservations/reservations.component'
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { NewListingComponent } from './NewListing/NewListing.component'
export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
      },
      {
        path: 'amenity',
        component: AmenityComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'listing',
        component: listingComponent,
      },
      {
        path:'details/:id' ,
        component:RoomDetailsComponent,
      },
      {
        path:'category',
        component:CategoryComponent,
      },
      {
        path:'new_Listing',
        component:NewListingComponent,
      },
      {
        path:'reservation',
        component:ReservationsComponent,
      },
      {
        path:'user',
        component:UserComponent,
      },
      {
        path:'admin',
        component:AdminComponent,
      }




    ],
  },
];
