import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyPostsComponent } from './pages/my-posts/my-posts.component';
import { ViewPostDetailsComponent } from './pages/view-post-details/view-post-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideStorage, getStorage } from '@angular/fire/storage';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
// import { MessagesModule } from 'primeng/messages';
// import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ViewPostsByCategoryComponent } from './pages/view-posts-by-category/view-posts-by-category.component';
import { ListPostsItemComponent } from './pages/list-posts/list-posts-item/list-posts-item.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const UX_MODULE = [
  InputTextModule,
  ButtonModule,
  InputTextareaModule,
  DropdownModule,
  TableModule,
  PaginatorModule,
  CardModule,
  EditorModule,
  // MessagesModule,
  // MessageModule,
  ToastModule
]


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CreatePostComponent,
    ListPostsComponent,
    UpdatePostComponent,
    LoginComponent,
    RegisterComponent,
    MyPostsComponent,
    ViewPostDetailsComponent,
    ViewPostsByCategoryComponent,
    ListPostsItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideStorage(() => getStorage()),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ...UX_MODULE
  ],
  providers: [
    ConfirmationService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
