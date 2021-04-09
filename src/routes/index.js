import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SearchPage from "pages/SearchPage/SearchPage";
import DetailPage from "pages/DetailPage/DetailPage";
import PaymentsPage from "pages/PaymentsPage/PaymentsPage";
import ConfirmationPage from "pages/ConfirmationPage/ConfirmationPage";
import SummaryPage from "pages/SummaryPage/SummaryPage";
import GuestPage from "pages/GuestPage/GuestPage";
import OrderLookup from "pages/OrderLookup/OrderLookup";
import ShowEventsDetailPage from "pages/ShowEventsDetailPage";

export const BASE_ROUTE = window.BASE_ROUTE || '';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path={BASE_ROUTE + "/hotels"} exact component={SearchPage} />
        <Route path={BASE_ROUTE + "/hotels/:id"} exact component={DetailPage} />
        <Route path={BASE_ROUTE + "/events/:id"} exact component={ShowEventsDetailPage} />
        <Route path={BASE_ROUTE + "/payments"} exact component={PaymentsPage} />
        <Route path={BASE_ROUTE + "/confirmation"} exact component={ConfirmationPage} />
        <Route path={BASE_ROUTE + "/orderSummary"} exact component={SummaryPage} />
        <Route path={BASE_ROUTE + "/guest"} exact component={GuestPage} />
        <Route path={BASE_ROUTE + "/orderLookup"} exact component={OrderLookup} />
        <Route path={BASE_ROUTE + "/search"} component={DetailPage} />
        <Redirect exact from={BASE_ROUTE + "/"} to={BASE_ROUTE + "/hotels"} />
      </Switch>
    </>
  );
}
