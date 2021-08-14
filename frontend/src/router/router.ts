import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import Home from '../view/Home.vue';

import NewDoc from '../view/NewDoc.vue';
import DocDetails from '../view/DocDetails.vue';
import Space from '../view/Space.vue';
import HallOfFame from '../view/HallOfFame.vue';
import Teams from '../view/Teams.vue';
import Unsubscribe from '../view/Unsubscribe.vue';
import CommentsUnsubscribe from '../view/CommentsUnsubscribe.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-doc',
    name: 'NewDoc',
    component: NewDoc
  },
  {
    path: '/doc/:docId/:slug',
    name: 'DocDetails',
    component: DocDetails
  },
  {
    path: '/s/:spaceName',
    name: 'Space',
    component: Space
  },
  {
    path: '/hall-of-fame',
    name: 'HallOfFame',
    component: HallOfFame
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/unsubscribe',
    name: 'Unsubscribe',
    component: Unsubscribe
  },
  {
    path: '/comments-unsubscribe',
    name: 'CommentsUnsubscribe',
    component: CommentsUnsubscribe
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;