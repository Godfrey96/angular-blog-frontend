import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { LoginComponent } from './pages/login/login.component';
import { MyPostsComponent } from './pages/my-posts/my-posts.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { ViewPostDetailsComponent } from './pages/view-post-details/view-post-details.component';
import { ViewPostsByCategoryComponent } from './pages/view-posts-by-category/view-posts-by-category.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: ListPostsComponent },
  // { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'edit-post/:id', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'my-posts', component: MyPostsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'post-details/:id', component: ViewPostDetailsComponent },
  { path: 'posts-by-category/:id', component: ViewPostsByCategoryComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
