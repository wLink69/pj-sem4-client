import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tour from './views/Tour.vue'
import Hotel from './views/Hotel.vue'
import Car from './views/Car.vue'
import Flight from './views/Flight.vue'
import Contact from './views/Contact.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tour',
      name: 'tour',
      component: Tour
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: Hotel
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    },
    {
      path: '/flight',
      name: 'flight',
      component: Flight
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});
