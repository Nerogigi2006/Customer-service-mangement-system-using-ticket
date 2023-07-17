import { CanActivateFn, Router } from '@angular/router';


export const ticketsGuard: CanActivateFn = (route, state) => {
  
  // Inject the Router and MatSnackBar services
  const router = new Router();
  // Implement your custom logic here
  if (localStorage.getItem('token')) {
    return true;
  } else {
    // Redirect to the login page
    router.navigate(['/login'])
    alert('please login first');
    return false;
  }
};

