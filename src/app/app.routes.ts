import { Routes } from '@angular/router';

export const routes: Routes = [

{
    path: "dashboard",
    loadComponent: () => import('./gifs/pages/dashboard/dashboard.component'),
    children: [
        {
            path: "trending",
            loadComponent: () => import('./gifs/pages/trending/trending.component'),
        },
        {
            path: "search",
            loadComponent: () => import('./gifs/pages/search/search.component'),
        },
        {
          path: "history/:query", // Argumento dinámico ejm, history/:query/:name/:title/:tag
          loadComponent: () => import('./gifs/pages/history/history.component'),
        },
        {
            path: "**",
            redirectTo: "trending"
        }
    ]
},

{
    path: "**",
    redirectTo: "dashboard"
}

];
