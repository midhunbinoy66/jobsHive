import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { hydrationMetaReducer } from './states/hydration.reducer';
import { reducer } from './states/app.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransformUrlInterceptor } from './interceptors/transform-url.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ApplyModalComponent } from './components/common/apply-modal/apply-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './states/user/user.effects';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ApplyModalComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, {metaReducers}),
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    EffectsModule.forRoot([UserEffects])

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TransformUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
