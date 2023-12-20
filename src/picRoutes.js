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
    layout: "/pic/dashboard",
    name: "PIC Dashboard",
    icon: "nc-icon nc-chart-pie-35",
  },

  {
    collapse: true,
    path: "/pic/dashboard",
    name: "Management",
    state: "openPages",
    icon: "nc-icon nc-puzzle-10",
    views: [
      {
        path: "/list-project-manager",
        layout: "/pic/dashboard",
        name: "Your Project Managers",
        mini: "A",
      },
      {
        path: "/add-project-manager",
        layout: "/pic/dashboard",
        name: "Add Project Manager",
        mini: "B",
      },
    ],
  },
];
export default routes;
