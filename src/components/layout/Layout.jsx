import React from "react";
import Header from "../layout/Header";

function Layout({ role, children }) {
  return (
    <div>
      {role && <Header role={role} />}
      <main className="container mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
