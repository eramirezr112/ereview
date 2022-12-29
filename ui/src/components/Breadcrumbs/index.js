import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";

const routes = [
  //{ path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
  { path: "/example", breadcrumb: "Brown Jordan Fabrics Project" },
  /*
  {
    path: "/custom-props",
    breadcrumb: CustomPropsBreadcrumb,
    props: { someProp: "Hi" },
  },
  */
];

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  /*
  return (
    <React.Fragment>
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </React.Fragment>
  );
  */
  return (
    <>
      {breadcrumbs.map(({ match, breadcrumb }, i) => (
        <div key={match.pathname}>
          / &nbsp;
          <NavLink to={match.pathname}>{breadcrumb}</NavLink>
          &nbsp;
        </div>
      ))}
    </>
  );
};

export default Breadcrumbs;
