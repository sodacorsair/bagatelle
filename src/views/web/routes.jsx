import React, { Component } from 'react';
import Layout from '@/components/web/layout';
import PageNotFound from '@/components/NotFound';

import Home from './home';

export default {
    path: '/',
    name: 'home',
    component: Layout,
    childRoutes: [
        { path: '', component: Home },
        { path: '*', component: PageNotFound },
    ]
}