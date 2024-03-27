import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { hydrationMetaReducer } from './states/hydration.reducer';
import { reducer } from './states/app.state';
import { ReactiveFormsModule } from '@angular/forms';
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
