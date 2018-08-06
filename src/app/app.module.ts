import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { Widget } from './widget/widget.component';
import { AddItemComponent } from './widget/add-item/add-item.component'
import { Header } from './header/header.component';
import { Footer } from './footer/footer.component';

import { WidgetService } from './widget/widget.service';
import { Api } from './api/api.http';
import { AppReducer } from './app.reducer';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    Header,
    Footer,
    Widget
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   Api, { dataEncapsulation: false }
    // ),
    StoreModule.forRoot({ tableData: AppReducer }),
    EffectsModule.forRoot([AppEffects]),

    HttpClientModule,
    
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule
  ],
  providers:[WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
