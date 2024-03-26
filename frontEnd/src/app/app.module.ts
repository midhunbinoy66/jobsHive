import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { reducer } from './states/app.state';
import { hydrationMetaReducer } from './states/hydration.reducer';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, {metaReducers})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
