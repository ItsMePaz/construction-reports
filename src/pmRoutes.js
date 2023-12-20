/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

var routes = [
  {
    path: "/",
    layout: "/pm/dashboard",
    name: "PM Dashboard",
    icon: "nc-icon nc-chart-pie-35",
  },

  {
    collapse: true,
    path: "/pm/dashboard",
    name: "Actions",
    state: "openPages",
    icon: "nc-icon nc-puzzle-10",
    views: [
      {
        path: "/add-report",
        layout: "/pm/dashboard",
        name: "Create Report",
        mini: "A",
      },
    ],
  },
];
export default routes;
